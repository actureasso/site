import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_SIZE = 10 * 1024 * 1024 // 10 Mo (PDFs peuvent être plus lourds)
const ALLOWED_IMAGES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_PDF = ['application/pdf']
const ALLOWED_TYPES = [...ALLOWED_IMAGES, ...ALLOWED_PDF]

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const alt = (formData.get('alt') as string) || undefined

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Fichier trop volumineux (max 10 Mo)' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type non autorisé (images ou PDF)' },
        { status: 400 }
      )
    }

    await mkdir(UPLOAD_DIR, { recursive: true })

    const ext = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.jpg')
    const base = path.basename(file.name, ext).replace(/[^a-z0-9-_]/gi, '-').slice(0, 80)
    const unique = `${base}-${Date.now()}${ext}`
    const filePath = path.join(UPLOAD_DIR, unique)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    const url = `/uploads/${unique}`

    const media = await prisma.media.create({
      data: {
        filename: file.name,
        url,
        alt: alt ?? null,
        mimeType: file.type,
        size: file.size,
      },
    })

    return NextResponse.json({ url, id: media.id })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload' },
      { status: 500 }
    )
  }
}
