import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.partenaireCategory.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { partenaires: true } } },
  })
  return NextResponse.json(categories)
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  const { name, order } = body
  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Nom requis' }, { status: 400 })
  }

  const category = await prisma.partenaireCategory.create({
    data: { name: name.trim(), order: typeof order === 'number' ? order : 0 },
  })
  return NextResponse.json(category)
}
