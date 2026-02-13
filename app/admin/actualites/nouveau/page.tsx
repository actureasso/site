'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/admin/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaArrowLeft, FaCheck, FaImage, FaFileAlt, FaInfoCircle, FaRocket } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'

const STEPS = [
  { id: 1, label: 'Informations', icon: FaInfoCircle },
  { id: 2, label: 'Contenu', icon: FaFileAlt },
  { id: 3, label: 'Image à la une', icon: FaImage },
  { id: 4, label: 'Publication', icon: FaRocket },
]

export default function NouvelArticlePage() {
  const router = useRouter()
  const { success: toastSuccess, error: toastError } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: new Date().toISOString().slice(0, 10),
    category: 'Acture Asso',
    excerpt: '',
    body: '',
    author: 'Acture',
    imageUrl: '',
    published: false,
  })

  function slugify(text: string) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || slugify(title),
    }))
  }

  const canNext = () => {
    if (step === 1) return form.title && form.slug && form.date && form.category
    if (step === 2) return form.excerpt && form.author
    if (step === 3) return true
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error || 'Erreur lors de la création')
      }
      toastSuccess('Article créé')
      router.push('/admin/actualites')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toastError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/actualites"
            className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-acture-blue"
          >
            ← Retour aux actualités
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Nouvel article</h1>
          <p className="mt-1 text-slate-600">Remplissez les étapes ci-dessous pour créer votre article.</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="rounded-2xl bg-white p-4 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all ${
                  step === s.id ? 'bg-acture-blue text-white shadow-lg' : step > s.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                  {step > s.id ? <FaCheck className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </span>
                <span className="hidden text-sm font-medium sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-1 flex-1 rounded-full ${step > s.id ? 'bg-emerald-300' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Informations générales</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  placeholder="Titre de l'article"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (URL) *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  placeholder="mon-article"
                />
                <p className="mt-1 text-xs text-slate-500">URL : /actualites/[slug]</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Catégorie *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  >
                    <option value="Formation">Formation</option>
                    <option value="Acture Asso">Acture Asso</option>
                    <option value="Jeunesse">Jeunesse</option>
                    <option value="Inclusion Numérique">Inclusion Numérique</option>
                    <option value="Quartier Connect">Quartier Connect</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Contenu de l&apos;article</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Extrait *</label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
                  required
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  placeholder="Court résumé affiché dans la liste des articles"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Contenu (optionnel)</label>
                <textarea
                  value={form.body}
                  onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  placeholder="Contenu détaillé de l'article"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Auteur *</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
                  placeholder="Acture"
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Ajouter votre image</h2>
              <p className="text-slate-600">Une image attire l&apos;attention et rend votre article plus engageant.</p>
              <ImageUpload
                label="Image à la une"
                value={form.imageUrl}
                onChange={(url) => setForm((p) => ({ ...p, imageUrl: url }))}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Publication</h2>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <input
                  type="checkbox"
                  id="published"
                  checked={form.published}
                  onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                  className="h-5 w-5 rounded border-slate-300 text-acture-blue focus:ring-acture-blue"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-700">
                  Publier immédiatement
                </label>
              </div>
              <p className="text-sm text-slate-500">
                Décochez pour enregistrer en brouillon et publier plus tard.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="h-4 w-4" />
              Précédent
            </button>
          ) : (
            <Link
              href="/admin/actualites"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              <FaArrowLeft className="h-4 w-4" />
              Annuler
            </Link>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
              <FaArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Création...' : 'Créer l\'article'}
              <FaRocket className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
