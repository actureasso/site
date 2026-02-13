import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return NextResponse.json(map)
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  if (!isAdmin(session)) return NextResponse.json({ error: 'Réservé aux administrateurs' }, { status: 403 })

  const body = await request.json()
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Body attendu : objet { key: value }' }, { status: 400 })
  }

  for (const [key, value] of Object.entries(body)) {
    if (typeof key !== 'string' || key.trim() === '') continue
    const str = typeof value === 'string' ? value : String(value ?? '')
    await prisma.siteSetting.upsert({
      where: { key: key.trim() },
      create: { key: key.trim(), value: str },
      update: { value: str },
    })
  }
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return NextResponse.json(map)
}
