import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET : liste des articles (public : published uniquement, admin : tous)
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const publishedOnly = searchParams.get('published') !== 'false' || !session

  const articles = await prisma.article.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(articles)
}

// POST : créer un article (admin uniquement)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const data = await request.json()
    const {
      title,
      slug,
      date,
      category,
      excerpt,
      body: bodyContent,
      author,
      imageUrl,
      published,
    } = data

    if (!title || !slug || !date || !category || !excerpt || !author) {
      return NextResponse.json(
        { error: 'Champs requis : title, slug, date, category, excerpt, author' },
        { status: 400 }
      )
    }

    const slugTrimmed = String(slug).trim().toLowerCase()
    const existing = await prisma.article.findUnique({
      where: { slug: slugTrimmed },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà. Choisissez un autre slug (ex. mon-article-2).' },
        { status: 400 }
      )
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug: slugTrimmed,
        date: new Date(date),
        category,
        excerpt,
        body: bodyContent ?? null,
        author,
        imageUrl: imageUrl ?? null,
        published: Boolean(published),
      },
    })
    return NextResponse.json(article)
  } catch (e: unknown) {
    const prismaError = e as { code?: string }
    if (prismaError?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà. Choisissez un autre slug.' },
        { status: 400 }
      )
    }
    console.error(e)
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}
