import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminDashboardClient from './AdminDashboardClient'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)
  const [articlesCount, publishedCount, mediaCount, formationsCount, evenementsCount, projetsCount, partenairesCount] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.media.count(),
      prisma.formation.count(),
      prisma.evenement.count(),
      prisma.projet.count(),
      prisma.partenaire.count(),
    ])

  return (
    <AdminDashboardClient
      stats={{
        articles: articlesCount,
        published: publishedCount,
        media: mediaCount,
        formations: formationsCount,
        evenements: evenementsCount,
        projets: projetsCount,
        partenaires: partenairesCount,
      }}
      userName={session?.user?.name ?? undefined}
      isAdmin={isAdmin(session)}
    />
  )
}
