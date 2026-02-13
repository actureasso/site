import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const evenement = await prisma.evenement.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  if (!evenement) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(evenement)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const { title, slug, date, lieu, description, order, images } = body

  if (images !== undefined && Array.isArray(images)) {
    await prisma.evenementImage.deleteMany({ where: { evenementId: id } })
    await prisma.evenementImage.createMany({
      data: images.map((img: { url: string; alt?: string }, i: number) => ({
        evenementId: id,
        url: img.url,
        alt: img.alt ?? null,
        order: i,
      })),
    })
  }

  const evenement = await prisma.evenement.update({
    where: { id },
    data: {
      ...(title != null && { title: String(title).trim() }),
      ...(slug != null && { slug: String(slug).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }),
      ...(date != null && { date: date ? new Date(date) : null }),
      ...(lieu != null && { lieu: lieu?.trim() || null }),
      ...(description != null && { description: description?.trim() || null }),
      ...(order != null && { order: Number(order) }),
    },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(evenement)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })
  const { id } = await params
  await prisma.evenement.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
