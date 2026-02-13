import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Params = { params: Promise<{ id: string }> }

export async function PATCH(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  const body = await request.json()
  const category = await prisma.partenaireCategory.update({
    where: { id },
    data: {
      ...(body.name != null && { name: String(body.name).trim() }),
      ...(body.order != null && { order: Number(body.order) }),
    },
  })
  return NextResponse.json(category)
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const { id } = await params
  await prisma.partenaireCategory.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
