'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/admin/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaArrowLeft, FaInfoCircle, FaImages, FaRocket } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'

const STEPS = [
  { id: 1, label: 'Infos', icon: FaInfoCircle },
  { id: 2, label: 'Galerie', icon: FaImages },
  { id: 3, label: 'Créer', icon: FaRocket },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NouvelEvenementPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: '',
    lieu: '',
    description: '',
    order: 0,
  })
  const [images, setImages] = useState<{ url: string; alt: string }[]>([])

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }))
  }

  function addImage() {
    setImages((i) => [...i, { url: '', alt: '' }])
  }

  function removeImage(idx: number) {
    setImages((i) => i.filter((_, j) => j !== idx))
  }

  function updateImageUrl(idx: number, url: string) {
    setImages((i) => i.map((x, j) => (j === idx ? { ...x, url } : x)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const slug = form.slug || slugify(form.title)
      const res = await fetch('/api/evenements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug,
          date: form.date || null,
          images: images.filter((img) => img.url.trim()),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Événement créé')
      router.push('/admin/evenements')
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
    <div className="space-y-8">
      <div>
        <Link href="/admin/evenements" className="mb-2 inline-flex text-sm font-medium text-slate-600 hover:text-acture-blue">
          ← Retour aux événements
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Nouvel événement</h1>
        <p className="mt-1 text-slate-600">Remplissez les étapes ci-dessous.</p>
      </div>

      {/* Stepper */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-lg shadow-slate-200/50">
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
                <s.icon className="h-4 w-4" />
                <span className="hidden text-sm font-medium sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-1 flex-1 rounded-full ${step > s.id ? 'bg-emerald-300' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50">
        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Informations</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Titre *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (URL)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-mono text-sm focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  placeholder={form.title ? slugify(form.title) : 'auto'}
                />
                <p className="mt-1 text-xs text-slate-500">visible → {form.slug || (form.title ? slugify(form.title) : '') || '...'}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Lieu</label>
                  <input
                    type="text"
                    value={form.lieu}
                    onChange={(e) => setForm((f) => ({ ...f, lieu: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Galerie photos</h2>
              <p className="text-slate-600">Ajoutez des images à l&apos;événement (upload ou URL).</p>
              {images.map((img, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Image {i + 1}</span>
                    <button type="button" onClick={() => removeImage(i)} className="text-sm text-red-600 hover:underline">
                      Supprimer
                    </button>
                  </div>
                  <ImageUpload
                    label=""
                    value={img.url}
                    onChange={(url) => updateImageUrl(i, url)}
                  />
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => setImages((im) => im.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))}
                    placeholder="Texte alternatif"
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 transition hover:border-acture-blue hover:text-acture-blue"
              >
                + Ajouter une image
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Créer l&apos;événement</h2>
              <p className="text-slate-600">Tout est prêt. Cliquez sur Créer pour enregistrer.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex gap-3 border-t border-slate-100 pt-6">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
              <FaArrowLeft className="h-4 w-4" /> Précédent
            </button>
          ) : (
            <Link href="/admin/evenements" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              {...(step === 1 && { disabled: !form.title?.trim() })}
              className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-5 py-2.5 font-semibold text-white shadow-lg hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant <FaArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white shadow-lg hover:bg-emerald-700 disabled:opacity-50">
              {loading ? 'Création...' : 'Créer'} <FaRocket className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
