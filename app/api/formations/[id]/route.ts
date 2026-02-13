import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params
  const formation = await prisma.formation.findUnique({ where: { id } })
  if (!formation) return NextResponse.json({ error: 'Non trouvé' }, { status: 404 })
  return NextResponse.json(formation)
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const pdfLinksVal = body.pdfLinks
  const pdfLinksJson =
    pdfLinksVal !== undefined
      ? Array.isArray(pdfLinksVal) && pdfLinksVal.length > 0
        ? JSON.stringify(pdfLinksVal.filter((u: unknown) => typeof u === 'string' && (u as string).trim()))
        : null
      : undefined

  const formation = await prisma.formation.update({
    where: { id },
    data: {
      ...(body.title != null && { title: String(body.title).trim() }),
      ...(body.slug != null && { slug: String(body.slug).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }),
      ...(body.description != null && { description: body.description?.trim() || null }),
      ...(body.duree != null && { duree: body.duree?.trim() || null }),
      ...(body.prerequis != null && { prerequis: body.prerequis?.trim() || null }),
      ...(body.link != null && { link: body.link?.trim() || null }),
      ...(pdfLinksJson !== undefined && { pdfLinks: pdfLinksJson }),
      ...(body.order != null && { order: Number(body.order) }),
      ...(body.imageUrl != null && { imageUrl: body.imageUrl?.trim() || null }),
    },
  })
  return NextResponse.json(formation)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })
  const { id } = await params
  await prisma.formation.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
