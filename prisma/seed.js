require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
const bcrypt = require('bcryptjs')

const url = process.env.DATABASE_URL || 'file:./dev.db'
const adapter = new PrismaBetterSqlite3({ url })
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@acture.org'
  const plainPassword = process.env.ADMIN_PASSWORD || 'changeme'

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    console.log('Admin user already exists:', email)
    return
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10)
  await prisma.user.create({
    data: {
      email,
      passwordHash,
      name: 'Admin Acture',
      role: 'admin',
    },
  })
  console.log('Admin user created:', email, '- Change the password after first login.')

  const catCount = await prisma.partenaireCategory.count()
  if (catCount === 0) {
    await prisma.partenaireCategory.createMany({
      data: [
        { name: 'Institutions', order: 0 },
        { name: 'Éducation & Centres sociaux', order: 1 },
        { name: 'Réseau QPV 17-18', order: 2 },
        { name: 'Insertion professionnelle', order: 3 },
        { name: 'Entreprises & Mécènes', order: 4 },
      ],
    })
    console.log('Default partenaire categories created.')
  }

  const formationCount = await prisma.formation.count()
  if (formationCount === 0) {
    await prisma.formation.createMany({
      data: [
        {
          title: 'REMN - Responsable d\'Espace de Médiation Numérique',
          slug: 'remn',
          description: 'Médiation numérique, employabilité, gestion d\'EPN, accompagnement du public, pédagogie fablab.\n\nDébouchés : Animateur numérique, médiateur, coordinateur de fablab, responsable EPN.',
          duree: '6 mois de cours + 2 mois de stage',
          prerequis: 'Niveau Bac +2',
          link: null,
          order: 0,
        },
        {
          title: 'Re Connect - Formation de Reconditionnement d\'outils numériques',
          slug: 'reconnect',
          description: 'Paris Fabrik – Transition écologique & éco-numérique.\n\nObjectifs : Diagnostic et réparation basique, réinstallation systèmes, tri/recyclage/réemploi, éco-conception numérique.\n\nDébouchés : Entrée en titre RNCP "Agent de reconditionnement", missions en fablab, emploi direct si niveau adéquat.',
          duree: '2 mois de cours + 1 mois de stage',
          prerequis: 'Préqualification',
          link: '/documents/paris-fabrik-formation.pdf',
          order: 1,
        },
        {
          title: 'VIA - Vers l\'Insertion par l\'Animation',
          slug: 'via',
          description: 'Paris Hospitalités – Préparation aux métiers de l\'animation.\n\nCompétences : Animation sportive et culturelle, gestion de groupe, montage de projet, inclusion et pédagogie.\n\nSuite de parcours : BPJEPS, animation périscolaire, centres de loisirs, service civique.',
          duree: '2 mois de cours + 1 mois de stage',
          prerequis: 'Préqualification',
          link: '/documents/paris-hospitalites-formation.pdf',
          order: 2,
        },
      ],
    })
    console.log('Default formations created (REMN, Re Connect/Paris Fabrik, VIA/Paris Hospitalités).')
    console.log('Place les PDF dans public/documents/ : paris-fabrik-formation.pdf et paris-hospitalites-formation.pdf')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
