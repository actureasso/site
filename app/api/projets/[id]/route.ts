import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const projet = await prisma.projet.findUnique({
    where: { id },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })
  if (!projet) return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 })
  return NextResponse.json(projet)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const { slug, title, subtitle, description, icon, order, blocks } = body

  if (blocks !== undefined && Array.isArray(blocks)) {
    await prisma.projetBlock.deleteMany({ where: { projetId: id } })
    await prisma.projetBlock.createMany({
      data: blocks.map((b: { type: string; order?: number; content: string }, i: number) => ({
        projetId: id,
        type: b.type || 'paragraph',
        order: b.order ?? i,
        content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content ?? {}),
      })),
    })
  }

  const projet = await prisma.projet.update({
    where: { id },
    data: {
      ...(slug != null && { slug: String(slug).trim().toLowerCase() }),
      ...(title != null && { title: String(title).trim() }),
      ...(subtitle != null && { subtitle: subtitle?.trim() || null }),
      ...(description != null && { description: description?.trim() || null }),
      ...(icon != null && { icon: icon?.trim() || null }),
      ...(order != null && { order: Number(order) }),
    },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(projet)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  await prisma.projet.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
