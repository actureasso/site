import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !isAdmin(session)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const list = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const unreadCount = await prisma.contactSubmission.count({ where: { read: false } })
  return NextResponse.json({ list, unreadCount })
}
