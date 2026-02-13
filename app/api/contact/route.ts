import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const SUBJECTS = ['asso', 'academie', 'partenariat', 'soutien', 'autre']

// Rate limit : 5 envois max par IP par fenêtre de 60 secondes
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipTimestamps = new Map<string, number[]>()

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipTimestamps.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) return true
  recent.push(now)
  ipTimestamps.set(ip, recent)
  // Nettoyage des anciennes entrées
  if (ipTimestamps.size > 10_000) {
    for (const [key, ts] of ipTimestamps.entries()) {
      const kept = ts.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
      if (kept.length === 0) ipTimestamps.delete(key)
      else ipTimestamps.set(key, kept)
    }
  }
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Trop de demandes. Veuillez réessayer dans une minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const subject = typeof body.subject === 'string' ? body.subject.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nom, email et message requis' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }
    const validSubject = SUBJECTS.includes(subject) ? subject : 'autre'

    const submission = await prisma.contactSubmission.create({
      data: { name, email, subject: validSubject, message },
    })
    return NextResponse.json({ ok: true, id: submission.id })
  } catch (e) {
    console.error('Contact API error:', e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
