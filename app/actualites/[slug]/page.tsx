import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { isValidImageSrc } from '@/lib/image'
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa'
import { buildMetadata, getBaseUrl } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })
  if (!article) return { title: 'Article | Acture' }
  const description = article.excerpt?.slice(0, 160) || `${article.title} - Acture`
  return buildMetadata({
    title: article.title,
    description,
    path: `/actualites/${slug}`,
    image: article.imageUrl || undefined,
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  })
  if (!article) notFound()

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt?.slice(0, 160) ?? article.title,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.date,
    dateModified: article.updatedAt,
    url: `${getBaseUrl()}/actualites/${slug}`,
    ...(article.imageUrl && {
      image: article.imageUrl.startsWith('http') ? article.imageUrl : `${getBaseUrl()}${article.imageUrl}`,
    }),
  }

  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 py-16">
        <Link
          href="/actualites"
          className="inline-flex items-center text-acture-blue hover:text-acture-green mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Retour aux actualités
        </Link>
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaCalendarAlt className="mr-2" />
            <span>{formatDate(article.date)}</span>
            <span className="mx-2">•</span>
            <span className="px-2 py-1 bg-blue-100 text-acture-blue rounded text-xs">
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-gray-600">
            <FaUser className="mr-2" />
            <span>{article.author}</span>
          </div>
        </header>
        {isValidImageSrc(article.imageUrl) && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={article.imageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-xl text-gray-600 mb-8">{article.excerpt}</p>
          {article.body ? (
            <div className="whitespace-pre-wrap">{article.body}</div>
          ) : (
            <p>{article.excerpt}</p>
          )}
        </div>
      </article>
    </div>
  )
}
