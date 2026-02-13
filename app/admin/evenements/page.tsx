import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import DeleteEvenementButton from './DeleteEvenementButton'

export default async function AdminEvenementsPage() {
  const evenements = await prisma.evenement.findMany({
    orderBy: [{ order: 'asc' }, { date: 'desc' }],
    include: { _count: { select: { images: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Événements</h1>
          <p className="text-slate-600 mt-1">Événements et galeries photos.</p>
        </div>
        <Link href="/admin/evenements/nouveau" className="inline-flex items-center gap-2 bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition shadow-sm">
          <FaPlus className="w-4 h-4" /> Nouvel événement
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {evenements.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Aucun événement.</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {evenements.map((e) => (
              <li key={e.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                <div>
                  <span className="font-semibold text-slate-900">{e.title}</span>
                  <span className="text-slate-500 text-sm ml-2">
                    {e.date ? new Date(e.date).toLocaleDateString('fr-FR') : ''} {e._count.images} photo(s)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/evenements/${e.id}`} className="inline-flex items-center gap-1.5 text-acture-blue hover:text-blue-800 font-medium text-sm">
                    <FaEdit className="w-4 h-4" /> Modifier
                  </Link>
                  <DeleteEvenementButton id={e.id} title={e.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
