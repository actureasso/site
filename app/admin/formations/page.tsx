import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import DeleteFormationButton from './DeleteFormationButton'

export default async function AdminFormationsPage() {
  const formations = await prisma.formation.findMany({
    orderBy: { order: 'asc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Formations</h1>
          <p className="text-slate-600 mt-1">Formations Acture Académie (REMN, Re Connect, VIA, etc.).</p>
        </div>
        <Link href="/admin/formations/nouveau" className="inline-flex items-center gap-2 bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition shadow-sm">
          <FaPlus className="w-4 h-4" /> Ajouter une formation
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {formations.length === 0 ? (
          <div className="p-12 text-center text-slate-500">Aucune formation. Cliquez sur &quot;Ajouter une formation&quot;.</div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {formations.map((f) => (
              <li key={f.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                <div>
                  <span className="font-semibold text-slate-900">{f.title}</span>
                  <span className="text-slate-500 text-sm ml-2">/{f.slug}</span>
                  {f.duree && <span className="text-slate-400 text-sm ml-2">• {f.duree}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/formations/${f.id}`} className="inline-flex items-center gap-1.5 text-acture-blue hover:text-blue-800 font-medium text-sm">
                    <FaEdit className="w-4 h-4" /> Modifier
                  </Link>
                  <DeleteFormationButton id={f.id} title={f.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
