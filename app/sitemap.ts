import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/asso`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/asso/projets`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/academie`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/academie/formations`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/actualites`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/partenaires`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/soutien`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/confidentialite`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  let articles: { slug: string; updatedAt: Date }[] = []
  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
  } catch {
    // DB peut être indisponible au build
  }

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/actualites/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...articleRoutes]
}
