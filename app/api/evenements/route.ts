import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const evenements = await prisma.evenement.findMany({
    orderBy: [{ order: 'asc' }, { date: 'desc' }],
    include: { images: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(evenements)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  const { title, slug, date, lieu, description, order, images } = body
  if (!title?.trim()) return NextResponse.json({ error: 'Titre requis' }, { status: 400 })

  const slugTrimmed = (slug ?? title).toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const existing = await prisma.evenement.findUnique({ where: { slug: slugTrimmed } })
  if (existing) return NextResponse.json({ error: 'Un événement avec ce slug existe déjà.' }, { status: 400 })

  const evenement = await prisma.evenement.create({
    data: {
      title: String(title).trim(),
      slug: slugTrimmed,
      date: date ? new Date(date) : null,
      lieu: lieu?.trim() || null,
      description: description?.trim() || null,
      order: typeof order === 'number' ? order : 0,
      images: Array.isArray(images)
        ? { create: images.map((img: { url: string; alt?: string }, i: number) => ({ url: img.url, alt: img.alt ?? null, order: i })) }
        : undefined,
    },
    include: { images: true },
  })
  return NextResponse.json(evenement)
}
