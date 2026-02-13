import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const projets = await prisma.projet.findMany({
    orderBy: { order: 'asc' },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(projets)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  const { slug, title, subtitle, description, icon, order, blocks } = body
  if (!slug?.trim() || !title?.trim()) {
    return NextResponse.json({ error: 'Slug et titre requis' }, { status: 400 })
  }

  const slugTrimmed = String(slug).trim().toLowerCase()
  const existing = await prisma.projet.findUnique({ where: { slug: slugTrimmed } })
  if (existing) {
    return NextResponse.json({ error: 'Un projet avec ce slug existe déjà.' }, { status: 400 })
  }

  const projet = await prisma.projet.create({
    data: {
      slug: slugTrimmed,
      title: String(title).trim(),
      subtitle: subtitle?.trim() || null,
      description: description?.trim() || null,
      icon: icon?.trim() || null,
      order: typeof order === 'number' ? order : 0,
      blocks: Array.isArray(blocks)
        ? { create: blocks.map((b: { type: string; order?: number; content: string }, i: number) => ({
            type: b.type || 'paragraph',
            order: b.order ?? i,
            content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content ?? {}),
          })) }
        : undefined,
    },
    include: { blocks: true },
  })
  return NextResponse.json(projet)
}
