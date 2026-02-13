import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjetEditForm from './ProjetEditForm'

type Props = { params: Promise<{ id: string }> }

export default async function AdminProjetEditPage({ params }: Props) {
  const { id } = await params
  const projet = await prisma.projet.findUnique({
    where: { id },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })
  if (!projet) notFound()

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/projets" className="text-slate-600 hover:text-acture-blue transition">← Projets</Link>
        <h1 className="text-3xl font-bold text-slate-900">Modifier : {projet.title}</h1>
      </div>
      <ProjetEditForm projet={projet} />
    </div>
  )
}
