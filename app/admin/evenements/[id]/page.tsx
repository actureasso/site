import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import EvenementEditForm from './EvenementEditForm'

type Props = { params: Promise<{ id: string }> }

export default async function AdminEvenementEditPage({ params }: Props) {
  const { id } = await params
  const evenement = await prisma.evenement.findUnique({
    where: { id },
    include: { images: { orderBy: { order: 'asc' } } },
  })
  if (!evenement) notFound()

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/evenements" className="text-slate-600 hover:text-acture-blue transition">← Événements</Link>
        <h1 className="text-3xl font-bold text-slate-900">Modifier : {evenement.title}</h1>
      </div>
      <EvenementEditForm evenement={evenement} />
    </div>
  )
}
