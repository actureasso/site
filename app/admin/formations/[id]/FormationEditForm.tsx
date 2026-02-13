'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import Link from 'next/link'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Formation } from '@prisma/client'

export default function FormationEditForm({ formation }: { formation: Formation }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: formation.title,
    slug: formation.slug,
    description: formation.description ?? '',
    duree: formation.duree ?? '',
    prerequis: formation.prerequis ?? '',
    link: formation.link ?? '',
    order: formation.order,
    imageUrl: formation.imageUrl ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/formations/${formation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Formation mise à jour')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl space-y-5">
      {error && <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Titre *</label>
        <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required className="w-full border border-slate-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
        <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Durée</label>
          <input type="text" value={form.duree} onChange={(e) => setForm((f) => ({ ...f, duree: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Prérequis</label>
          <input type="text" value={form.prerequis} onChange={(e) => setForm((f) => ({ ...f, prerequis: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Lien</label>
        <input type="url" value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
      </div>
      <ImageUpload label="Image" value={form.imageUrl} onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))} />
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button type="submit" disabled={loading} className="bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">Enregistrer</button>
        <Link href="/admin/formations" className="px-5 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
      </div>
    </form>
  )
}
