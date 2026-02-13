import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session || !isAdmin(session)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  const { id } = await params
  await prisma.contactSubmission.update({
    where: { id },
    data: { read: true },
  })
  return NextResponse.json({ ok: true })
}
