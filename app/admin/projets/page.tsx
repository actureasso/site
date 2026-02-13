import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FaPlus, FaEdit } from 'react-icons/fa'
import DeleteProjetButton from './DeleteProjetButton'

export default async function AdminProjetsPage() {
  const projets = await prisma.projet.findMany({
    orderBy: { order: 'asc' },
    include: { _count: { select: { blocks: true } } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projets</h1>
          <p className="text-slate-600 mt-1">Sections de la page /asso/projets (Quartier Connect, AIN, CLIC, etc.).</p>
        </div>
        <Link
          href="/admin/projets/nouveau"
          className="inline-flex items-center gap-2 bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition shadow-sm"
        >
          <FaPlus className="w-4 h-4" /> Nouveau projet
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {projets.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Aucun projet. Cliquez sur &quot;Nouveau projet&quot; pour ajouter une section.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {projets.map((p) => (
              <li key={p.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                <div>
                  <span className="font-semibold text-slate-900">{p.title}</span>
                  <span className="text-slate-500 text-sm ml-2">/{p.slug}</span>
                  <span className="text-slate-400 text-sm ml-2">({p._count.blocks} blocs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/projets/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-acture-blue hover:text-blue-800 font-medium text-sm"
                  >
                    <FaEdit className="w-4 h-4" /> Modifier
                  </Link>
                  <DeleteProjetButton id={p.id} title={p.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
