import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const formations = await prisma.formation.findMany({
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(formations)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  const { title, slug, description, duree, prerequis, link, pdfLinks, order, imageUrl } = body
  if (!title?.trim()) return NextResponse.json({ error: 'Titre requis' }, { status: 400 })

  const slugTrimmed = (slug ?? title).toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const existing = await prisma.formation.findUnique({ where: { slug: slugTrimmed } })
  if (existing) return NextResponse.json({ error: 'Une formation avec ce slug existe déjà.' }, { status: 400 })

  const pdfLinksJson = Array.isArray(pdfLinks) && pdfLinks.length > 0
    ? JSON.stringify(pdfLinks.filter((u: unknown) => typeof u === 'string' && u.trim()))
    : null

  const formation = await prisma.formation.create({
    data: {
      title: String(title).trim(),
      slug: slugTrimmed,
      description: description?.trim() || null,
      duree: duree?.trim() || null,
      prerequis: prerequis?.trim() || null,
      link: link?.trim() || null,
      pdfLinks: pdfLinksJson,
      order: typeof order === 'number' ? order : 0,
      imageUrl: imageUrl?.trim() || null,
    },
  })
  return NextResponse.json(formation)
}
