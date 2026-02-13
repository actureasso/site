import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ArticleEditForm from './ArticleEditForm'

type Props = { params: Promise<{ id: string }> }

export default async function AdminArticleEditPage({ params }: Props) {
  const { id } = await params
  const article = await prisma.article.findUnique({
    where: { id },
  })
  if (!article) notFound()

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/actualites" className="text-slate-600 hover:text-acture-blue transition">
          ← Actualités
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Modifier l&apos;article</h1>
      </div>
      <ArticleEditForm article={article} />
    </div>
  )
}
