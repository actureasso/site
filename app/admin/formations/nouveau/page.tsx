'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/components/admin/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaArrowLeft, FaInfoCircle, FaImage, FaFilePdf, FaRocket } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'
import FileUpload from '@/components/admin/FileUpload'

const STEPS = [
  { id: 1, label: 'Infos', icon: FaInfoCircle },
  { id: 2, label: 'Image', icon: FaImage },
  { id: 3, label: 'PDFs', icon: FaFilePdf },
  { id: 4, label: 'Créer', icon: FaRocket },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NouvelleFormationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    duree: '',
    prerequis: '',
    order: 0,
    imageUrl: '',
  })
  const [pdfLinks, setPdfLinks] = useState<string[]>([])

  function handleTitleChange(title: string) {
    setForm((f) => ({ ...f, title, slug: f.slug || slugify(title) }))
  }

  function addPdf() {
    setPdfLinks((p) => [...p, ''])
  }

  function removePdf(idx: number) {
    setPdfLinks((p) => p.filter((_, i) => i !== idx))
  }

  function updatePdfUrl(idx: number, url: string) {
    setPdfLinks((p) => p.map((u, i) => (i === idx ? url : u)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const slug = form.slug || slugify(form.title)
      const res = await fetch('/api/formations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug,
          pdfLinks: pdfLinks.filter((u) => u.trim()),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Formation créée')
      router.push('/admin/formations')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const canNext = () => (step === 1 ? form.title?.trim() : true)

  return (
    <div className="space-y-8">
      <div>
        <Link href="/admin/formations" className="mb-2 inline-flex text-sm font-medium text-slate-600 hover:text-acture-blue">
          ← Retour aux formations
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Nouvelle formation</h1>
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
                className={`flex items-center gap-2 rounded-xl px-3 py-2 transition-all ${
                  step === s.id ? 'bg-acture-blue text-white shadow-lg' : step > s.id ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                <s.icon className="h-4 w-4" />
                <span className="hidden text-sm font-medium sm:inline">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`mx-1 h-1 flex-1 rounded-full sm:mx-2 ${step > s.id ? 'bg-emerald-300' : 'bg-slate-200'}`} />
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
                  placeholder="ex. REMN"
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
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Durée</label>
                  <input
                    type="text"
                    value={form.duree}
                    onChange={(e) => setForm((f) => ({ ...f, duree: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                    placeholder="6 mois + 2 mois de stage"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Prérequis</label>
                  <input
                    type="text"
                    value={form.prerequis}
                    onChange={(e) => setForm((f) => ({ ...f, prerequis: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
                  />
                </div>
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
              <h2 className="text-lg font-bold text-slate-800">Image à la une</h2>
              <p className="text-slate-600">Ajoutez une image pour illustrer la formation.</p>
              <ImageUpload
                label="Image"
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              />
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
              <h2 className="text-lg font-bold text-slate-800">Documents PDF</h2>
              <p className="text-slate-600">Associez un ou plusieurs PDF à cette formation (documentation, plaquette...).</p>
              {pdfLinks.map((url, i) => (
                <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">PDF {i + 1}</span>
                    <button type="button" onClick={() => removePdf(i)} className="text-sm text-red-600 hover:underline">
                      Supprimer
                    </button>
                  </div>
                  <FileUpload value={url} onChange={(u) => updatePdfUrl(i, u)} label="" accept="application/pdf" />
                </div>
              ))}
              <button
                type="button"
                onClick={addPdf}
                className="rounded-xl border-2 border-dashed border-slate-200 px-4 py-3 text-sm font-medium text-slate-500 transition hover:border-acture-blue hover:text-acture-blue"
              >
                + Ajouter un PDF
              </button>
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
              <h2 className="text-lg font-bold text-slate-800">Créer la formation</h2>
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
            <Link href="/admin/formations" className="inline-flex items-center rounded-xl border border-slate-200 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">Annuler</Link>
          )}
          {step < 4 ? (
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
