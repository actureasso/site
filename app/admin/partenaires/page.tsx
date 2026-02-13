import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import AdminPartenaireCategory from './AdminPartenaireCategory'

export default async function AdminPartenairesPage() {
  const categories = await prisma.partenaireCategory.findMany({
    orderBy: { order: 'asc' },
    include: {
      partenaires: { orderBy: { order: 'asc' } },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Partenaires</h1>
          <p className="text-slate-600 mt-1">Catégories et partenaires affichés sur /partenaires.</p>
        </div>
      </div>

      <AdminPartenaireCategory categories={categories} />
    </div>
  )
}
