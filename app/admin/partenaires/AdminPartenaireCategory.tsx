'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import Image from 'next/image'
import { FaPlus, FaEdit, FaTrash, FaBuilding } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'
import { isValidImageSrc } from '@/lib/image'

type Category = {
  id: string
  name: string
  order: number
  partenaires: { id: string; name: string; logoUrl: string | null; url: string | null; order: number }[]
}

export default function AdminPartenaireCategory({ categories: initialCategories }: { categories: Category[] }) {
  const router = useRouter()
  const toast = useToast()
  const [categories, setCategories] = useState(initialCategories)
  const [newCatName, setNewCatName] = useState('')
  const [addingCat, setAddingCat] = useState(false)
  const [addingPart, setAddingPart] = useState<string | null>(null)
  const [editPart, setEditPart] = useState<{ id: string; name: string; logoUrl: string; url: string; categoryId: string } | null>(null)
  const [form, setForm] = useState({ name: '', logoUrl: '', url: '', categoryId: '' })
  const [error, setError] = useState('')

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault()
    if (!newCatName.trim()) return
    setError('')
    try {
      const res = await fetch('/api/partenaires/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim(), order: categories.length }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Catégorie ajoutée')
      setNewCatName('')
      router.refresh()
      setCategories((c) => [...c, { ...(data as { id: string; name: string; order: number }), partenaires: [] }])
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    }
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Supprimer cette catégorie et tous ses partenaires ?')) return
    try {
      await fetch(`/api/partenaires/categories/${id}`, { method: 'DELETE' })
      router.refresh()
      setCategories((c) => c.filter((x) => x.id !== id))
    } catch {}
  }

  async function handleAddPartenaire(e: React.FormEvent) {
    e.preventDefault()
    const categoryId = addingPart || form.categoryId
    if (!form.name.trim() || !categoryId) return
    setError('')
    try {
      const res = await fetch('/api/partenaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          logoUrl: form.logoUrl || null,
          url: form.url || null,
          categoryId,
          order: 0,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      setForm({ name: '', logoUrl: '', url: '', categoryId: '' })
      setAddingPart(null)
      router.refresh()
      const d = data as { id: string; name: string; logoUrl: string | null; url: string | null; order: number; categoryId: string }
      setCategories((c) =>
        c.map((cat) =>
          cat.id === d.categoryId
            ? { ...cat, partenaires: [...cat.partenaires, { id: d.id, name: d.name, logoUrl: d.logoUrl, url: d.url, order: d.order }] }
            : cat
        )
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    }
  }

  async function handleUpdatePartenaire(e: React.FormEvent) {
    e.preventDefault()
    if (!editPart) return
    setError('')
    try {
      const res = await fetch(`/api/partenaires/${editPart.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editPart.name.trim(),
          logoUrl: editPart.logoUrl || null,
          url: editPart.url || null,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Partenaire mis à jour')
      setEditPart(null)
      router.refresh()
      const d = data as { id: string; name: string; logoUrl: string | null; url: string | null; order: number; categoryId: string }
      setCategories((c) =>
        c.map((cat) =>
          cat.id === d.categoryId
            ? { ...cat, partenaires: cat.partenaires.map((p) => (p.id === d.id ? { id: d.id, name: d.name, logoUrl: d.logoUrl, url: d.url, order: d.order } : p)) }
            : cat
        )
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    }
  }

  async function handleDeletePartenaire(id: string, categoryId: string) {
    if (!confirm('Supprimer ce partenaire ?')) return
    try {
      await fetch(`/api/partenaires/${id}`, { method: 'DELETE' })
      router.refresh()
      setCategories((c) =>
        c.map((cat) => (cat.id === categoryId ? { ...cat, partenaires: cat.partenaires.filter((p) => p.id !== id) } : cat))
      )
    } catch {}
  }

  return (
    <div className="space-y-8">
      {error && <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{error}</p>}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Nouvelle catégorie</h2>
        <form onSubmit={handleAddCategory} className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Ex. Institutions"
            className="border border-slate-300 rounded-lg px-4 py-2 flex-1 min-w-[200px]"
          />
          <button type="submit" className="bg-acture-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition">
            Ajouter
          </button>
        </form>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">{cat.name}</h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => { setForm({ name: '', logoUrl: '', url: '', categoryId: cat.id }); setAddingPart(cat.id) }}
                className="inline-flex items-center gap-1.5 text-acture-blue hover:text-blue-800 font-medium text-sm"
              >
                <FaPlus className="w-4 h-4" /> Ajouter partenaire
              </button>
              <button
                type="button"
                onClick={() => handleDeleteCategory(cat.id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Supprimer la catégorie"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>

          {addingPart === cat.id && (
            <form onSubmit={handleAddPartenaire} className="p-6 border-b border-slate-100 bg-slate-50 space-y-4">
              <input type="hidden" name="categoryId" value={cat.id} />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">URL du site</label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <ImageUpload
                label="Logo"
                value={form.logoUrl}
                onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-acture-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800">
                  Enregistrer
                </button>
                <button type="button" onClick={() => setAddingPart(null)} className="px-4 py-2 border border-slate-300 rounded-lg">
                  Annuler
                </button>
              </div>
            </form>
          )}

          <div className="p-6">
            {cat.partenaires.length === 0 ? (
              <p className="text-slate-500 text-sm">Aucun partenaire. Cliquez sur &quot;Ajouter partenaire&quot;.</p>
            ) : (
              <ul className="space-y-3">
                {cat.partenaires.map((p) => (
                  <li key={p.id} className="flex items-center gap-4 py-2 border-b border-slate-100 last:border-0">
                    {editPart?.id === p.id ? (
                      <form onSubmit={handleUpdatePartenaire} className="flex-1 flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-xs font-medium text-slate-600 mb-1">Nom</label>
                          <input
                            type="text"
                            value={editPart.name}
                            onChange={(e) => setEditPart((x) => (x ? { ...x, name: e.target.value } : null))}
                            className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-xs font-medium text-slate-600 mb-1">URL</label>
                          <input
                            type="url"
                            value={editPart.url}
                            onChange={(e) => setEditPart((x) => (x ? { ...x, url: e.target.value } : null))}
                            className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                          />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                          <label className="block text-xs font-medium text-slate-600 mb-1">Logo (URL)</label>
                          <input
                            type="text"
                            value={editPart.logoUrl}
                            onChange={(e) => setEditPart((x) => (x ? { ...x, logoUrl: e.target.value } : null))}
                            className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-acture-blue text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                            OK
                          </button>
                          <button type="button" onClick={() => setEditPart(null)} className="px-3 py-1.5 border rounded-lg text-sm">
                            Annuler
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {isValidImageSrc(p.logoUrl) ? (
                            <Image src={p.logoUrl} alt="" width={48} height={48} className="object-contain" />
                          ) : (
                            <FaBuilding className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-slate-900">{p.name}</span>
                          {p.url && (
                            <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-sm text-acture-blue block truncate">
                              {p.url}
                            </a>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditPart({ id: p.id, name: p.name, logoUrl: p.logoUrl || '', url: p.url || '', categoryId: cat.id })}
                          className="text-slate-500 hover:text-acture-blue p-1"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => handleDeletePartenaire(p.id, cat.id)} className="text-slate-500 hover:text-red-600 p-1">
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
          Aucune catégorie. Ajoutez une catégorie ci-dessus pour commencer.
        </div>
      )}
    </div>
  )
}
