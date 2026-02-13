'use client'

import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa'
import { useToast } from '@/components/admin/ToastContext'

export default function DeleteProjetButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()
  const toast = useToast()

  async function handleDelete() {
    if (!confirm(`Supprimer le projet "${title}" ?`)) return
    try {
      const res = await fetch(`/api/projets/${id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        toast.success('Projet supprimé')
        router.refresh()
      } else {
        toast.error((data as { error?: string }).error || 'Erreur')
      }
    } catch {
      toast.error('Erreur lors de la suppression')
    }
  }

  return (
    <button type="button" onClick={handleDelete} className="text-slate-500 hover:text-red-600 p-1" title="Supprimer">
      <FaTrash className="w-4 h-4" />
    </button>
  )
}
