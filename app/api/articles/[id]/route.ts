import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

// GET : un article (public si published, sinon admin)
export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const article = await prisma.article.findUnique({
    where: { id },
  })
  if (!article) {
    return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 })
  }
  if (!article.published && !session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  return NextResponse.json(article)
}

// PATCH : modifier un article (admin uniquement)
export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { id } = await params
  const data = await request.json()

  const article = await prisma.article.update({
    where: { id },
    data: {
      ...(data.title != null && { title: data.title }),
      ...(data.slug != null && { slug: data.slug }),
      ...(data.date != null && { date: new Date(data.date) }),
      ...(data.category != null && { category: data.category }),
      ...(data.excerpt != null && { excerpt: data.excerpt }),
      ...(data.body != null && { body: data.body }),
      ...(data.author != null && { author: data.author }),
      ...(data.imageUrl != null && { imageUrl: data.imageUrl }),
      ...(data.published != null && { published: Boolean(data.published) }),
    },
  })
  return NextResponse.json(article)
}

// DELETE : supprimer un article (admin uniquement)
export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  if (!isAdmin(session)) {
    return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })
  }

  const { id } = await params
  await prisma.article.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
