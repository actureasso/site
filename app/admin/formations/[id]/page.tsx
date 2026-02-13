import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import FormationEditForm from './FormationEditForm'

type Props = { params: Promise<{ id: string }> }

export default async function AdminFormationEditPage({ params }: Props) {
  const { id } = await params
  const formation = await prisma.formation.findUnique({ where: { id } })
  if (!formation) notFound()

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/formations" className="text-slate-600 hover:text-acture-blue transition">← Formations</Link>
        <h1 className="text-3xl font-bold text-slate-900">Modifier : {formation.title}</h1>
      </div>
      <FormationEditForm formation={formation} />
    </div>
  )
}
