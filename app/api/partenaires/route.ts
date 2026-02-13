import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')

  const partenaires = await prisma.partenaire.findMany({
    where: categoryId ? { categoryId } : undefined,
    orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }, { name: 'asc' }],
    include: { category: true },
  })
  return NextResponse.json(partenaires)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  const { name, logoUrl, url, categoryId, order } = body
  if (!name || !categoryId) {
    return NextResponse.json({ error: 'Nom et catégorie requis' }, { status: 400 })
  }

  const partenaire = await prisma.partenaire.create({
    data: {
      name: String(name).trim(),
      logoUrl: logoUrl?.trim() || null,
      url: url?.trim() || null,
      categoryId,
      order: typeof order === 'number' ? order : 0,
    },
    include: { category: true },
  })
  return NextResponse.json(partenaire)
}
