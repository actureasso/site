require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')

const url = process.env.DATABASE_URL || 'file:./dev.db'
const adapter = new PrismaBetterSqlite3({ url })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🔄 Reset de la base de données (conservation du compte admin)...')

  // Suppression dans l'ordre des dépendances (enfants avant parents)
  const r1 = await prisma.evenementImage.deleteMany()
  const r2 = await prisma.evenement.deleteMany()
  const r3 = await prisma.partenaire.deleteMany()
  const r4 = await prisma.projetBlock.deleteMany()
  const r5 = await prisma.projet.deleteMany()
  const r6 = await prisma.contactSubmission.deleteMany()
  const r7 = await prisma.siteSetting.deleteMany()
  const r8 = await prisma.formation.deleteMany()
  const r9 = await prisma.media.deleteMany()
  const r10 = await prisma.article.deleteMany()
  const r11 = await prisma.partenaireCategory.deleteMany()
  const r12 = await prisma.user.deleteMany({ where: { role: { not: 'admin' } } })

  const total = r1.count + r2.count + r3.count + r4.count + r5.count + r6.count + r7.count +
    r8.count + r9.count + r10.count + r11.count + r12.count

  const admins = await prisma.user.count({ where: { role: 'admin' } })
  console.log('✅ Reset terminé.')
  console.log(`   - ${total} enregistrement(s) supprimé(s)`)
  console.log(`   - ${admins} compte(s) admin conservé(s)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
