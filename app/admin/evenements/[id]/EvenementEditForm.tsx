'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import Link from 'next/link'
import type { Evenement, EvenementImage } from '@prisma/client'

type EvenementWithImages = Evenement & { images: EvenementImage[] }

export default function EvenementEditForm({ evenement }: { evenement: EvenementWithImages }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: evenement.title,
    slug: evenement.slug,
    date: evenement.date ? new Date(evenement.date).toISOString().slice(0, 10) : '',
    lieu: evenement.lieu ?? '',
    description: evenement.description ?? '',
    order: evenement.order,
  })
  const [images, setImages] = useState(evenement.images.map((i) => ({ url: i.url, alt: i.alt ?? '' })))

  function addImage() {
    setImages((i) => [...i, { url: '', alt: '' }])
  }

  function removeImage(idx: number) {
    setImages((i) => i.filter((_, j) => j !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/evenements/${evenement.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: form.date || null,
          images: images.filter((img) => img.url.trim()),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Événement mis à jour')
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
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
          <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Lieu</label>
          <input type="text" value={form.lieu} onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2" />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-slate-700">Galerie</label>
          <button type="button" onClick={addImage} className="text-acture-blue hover:text-blue-800 text-sm font-medium">+ Image</button>
        </div>
        {images.map((img, i) => (
          <div key={i} className="flex gap-2 items-start mb-2">
            <input type="text" value={img.url} onChange={(e) => setImages((im) => im.map((x, j) => (j === i ? { ...x, url: e.target.value } : x)))} placeholder="URL" className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <input type="text" value={img.alt} onChange={(e) => setImages((im) => im.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} placeholder="Alt" className="w-24 border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            <button type="button" onClick={() => removeImage(i)} className="text-red-600 text-sm">Suppr.</button>
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button type="submit" disabled={loading} className="bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">Enregistrer</button>
        <Link href="/admin/evenements" className="px-5 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
      </div>
    </form>
  )
}
