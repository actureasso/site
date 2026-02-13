'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/admin/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaArrowLeft, FaInfoCircle, FaFileAlt, FaImages, FaRocket } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'

const ICONS = ['FaUsers', 'FaLaptop', 'FaChild', 'FaPlane', 'FaBriefcase', 'FaNetworkWired']
const STEPS = [
  { id: 1, label: 'Infos', icon: FaInfoCircle },
  { id: 2, label: 'Contenu', icon: FaFileAlt },
  { id: 3, label: 'Galerie', icon: FaImages },
  { id: 4, label: 'Publication', icon: FaRocket },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NouveauProjetPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    icon: 'FaUsers',
    order: 0,
  })
  const [images, setImages] = useState<string[]>([])

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: f.slug || slugify(title),
    }))
  }

  function addImage() {
    setImages((i) => [...i, ''])
  }

  function removeImage(idx: number) {
    setImages((i) => i.filter((_, j) => j !== idx))
  }

  function updateImageUrl(idx: number, url: string) {
    setImages((i) => i.map((x, j) => (j === idx ? url : x)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const slug = form.slug || slugify(form.title)
      const imageUrls = images.filter((u) => u.trim())
      const blocks: { type: string; order: number; content: string }[] = []
      if (imageUrls.length > 0) {
        blocks.push({ type: 'images', order: 0, content: JSON.stringify({ urls: imageUrls }) })
      }
      const res = await fetch('/api/projets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug, blocks }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Projet créé')
      router.push('/admin/projets')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const canNext = () => {
    if (step === 1) return form.title?.trim() && (form.slug || slugify(form.title))
    return true
  }

  const totalSteps = STEPS.length

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/projets" className="mb-2 inline-flex text-sm font-medium text-slate-600 hover:text-acture-blue">
          ← Retour aux projets
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Nouveau projet</h1>
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
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
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
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  placeholder="Quartier Connect"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Slug (URL)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 font-mono text-sm focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  placeholder={form.title ? slugify(form.title) : 'quartier-connect'}
                />
                <p className="mt-1 text-xs text-slate-500"> visible → /asso/projets#{form.slug || (form.title ? slugify(form.title) : '') || '...'}</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Icône</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                >
                  {ICONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
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
              <h2 className="text-lg font-bold text-slate-800">Contenu</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Sous-titre</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                />
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

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Galerie d&apos;images</h2>
              <p className="text-slate-600">Ajoutez des images qui s&apos;afficheront en grille dans le projet.</p>
              <div className="space-y-4">
                {images.map((url, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <div className="flex-1">
                      <ImageUpload
                        label={`Image ${idx + 1}`}
                        value={url}
                        onChange={(u) => updateImageUrl(idx, u)}
                      />
                    </div>
                    <button type="button" onClick={() => removeImage(idx)} className="mt-8 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100">
                      Supprimer
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addImage} className="w-full rounded-xl border-2 border-dashed border-slate-200 py-6 text-sm font-medium text-slate-500 hover:border-acture-blue hover:text-acture-blue">
                  + Ajouter une image
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-bold text-slate-800">Créer le projet</h2>
              <p className="text-slate-600">Vous pourrez ajouter d&apos;autres blocs (texte, listes) après la création.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex gap-3 border-t border-slate-100 pt-6">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
              <FaArrowLeft className="h-4 w-4" /> Précédent
            </button>
          ) : (
            <Link href="/admin/projets" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
          )}
          {step < totalSteps ? (
            <button type="button" onClick={() => setStep(step + 1)} disabled={!canNext()} className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-5 py-2.5 font-semibold text-white shadow-lg hover:bg-blue-800 disabled:opacity-50">
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
