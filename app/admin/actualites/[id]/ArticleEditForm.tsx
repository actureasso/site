'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import Link from 'next/link'
import ImageUpload from '@/components/admin/ImageUpload'
import type { Article } from '@prisma/client'

type Props = { article: Article }

export default function ArticleEditForm({ article }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: article.title,
    slug: article.slug,
    date: new Date(article.date).toISOString().slice(0, 10),
    category: article.category,
    excerpt: article.excerpt,
    body: article.body ?? '',
    author: article.author,
    imageUrl: article.imageUrl ?? '',
    published: article.published,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || 'Erreur lors de la mise à jour')
      }
      toast.success('Article mis à jour')
      router.push('/admin/actualites')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Supprimer cet article ?')) return
    setLoading(true)
    try {
      const res = await fetch(`/api/articles/${article.id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Article supprimé')
      router.push('/admin/actualites')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl space-y-5">
      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">{error}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) *</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
        <select
          value={form.category}
          onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="Formation">Formation</option>
          <option value="Acture Asso">Acture Asso</option>
          <option value="Jeunesse">Jeunesse</option>
          <option value="Inclusion Numérique">Inclusion Numérique</option>
          <option value="Quartier Connect">Quartier Connect</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Extrait *</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Auteur *</label>
        <input
          type="text"
          value={form.author}
          onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>
      <ImageUpload
        label="Image à la une"
        value={form.imageUrl}
        onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
      />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="published" className="text-sm text-gray-700">
          Publié
        </label>
      </div>
      <div className="flex gap-3 pt-4 border-t border-slate-200 flex-wrap">
        <button
          type="submit"
          disabled={loading}
          className="bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50 transition shadow-sm"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <Link
          href="/admin/actualites"
          className="px-5 py-2.5 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Annuler
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="px-5 py-2.5 border border-red-300 rounded-lg font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50 transition"
        >
          Supprimer
        </button>
      </div>
    </form>
  )
}
