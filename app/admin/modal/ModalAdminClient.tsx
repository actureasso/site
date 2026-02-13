'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaSave,
  FaCheck,
  FaPalette,
  FaAlignLeft,
  FaEye,
  FaWindowMaximize,
} from 'react-icons/fa'
import { MODAL_TEMPLATES, type ModalTemplateId } from './MODAL_TEMPLATES'
import ImageUpload from '@/components/admin/ImageUpload'
import Image from 'next/image'
import { isValidImageSrc } from '@/lib/image'
import { FaTimes } from 'react-icons/fa'

type Initial = {
  modal_enabled: string
  modal_template: string
  modal_title: string
  modal_body: string
  modal_button_text: string
  modal_button_url: string
  modal_image_url: string
}

export default function ModalAdminClient({ initial }: { initial: Initial }) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(initial)
  const [previewOpen, setPreviewOpen] = useState(false)

  const selectedTemplate = MODAL_TEMPLATES.find((t) => t.id === form.modal_template) ?? MODAL_TEMPLATES[0]

  async function handleSave() {
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modal_enabled: form.modal_enabled,
          modal_template: form.modal_template,
          modal_title: form.modal_title,
          modal_body: form.modal_body,
          modal_button_text: form.modal_button_text,
          modal_button_url: form.modal_button_url,
          modal_image_url: form.modal_image_url,
          modal_version: Date.now().toString(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Message enregistré')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleEnabled() {
    const next = form.modal_enabled === '1' ? '0' : '1'
    setForm((f) => ({ ...f, modal_enabled: next }))
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modal_enabled: next }),
      })
      toast.success(next === '1' ? 'Message activé' : 'Message désactivé')
      router.refresh()
    } catch {
      setForm((f) => ({ ...f, modal_enabled: form.modal_enabled }))
      toast.error('Erreur')
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-2 inline-block text-sm font-medium text-slate-600 hover:text-acture-blue transition"
          >
            ← Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <FaWindowMaximize className="h-6 w-6" />
            </span>
            Message aux visiteurs
          </h1>
          <p className="mt-1 text-slate-600">
            Annonce, information ou message affiché à la visite. Si vous modifiez le contenu et enregistrez, les visiteurs qui l&apos;avaient déjà vu le reverront.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <FaEye className="h-4 w-4" />
            Aperçu
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition shadow-lg"
          >
            <FaSave className="h-4 w-4" />
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Activer / Désactiver */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div>
        <h2 className="text-lg font-bold text-slate-900">Afficher le message à la visite</h2>
        <p className="text-sm text-slate-500 mt-0.5">Chaque nouveau message (après enregistrement) sera revu par ceux qui l&apos;avaient déjà fermé.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={form.modal_enabled === '1'}
            onClick={handleToggleEnabled}
            className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${form.modal_enabled === '1' ? 'bg-acture-blue' : 'bg-slate-300'}`}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-1 h-6 w-6 rounded-full bg-white shadow"
              style={{ left: form.modal_enabled === '1' ? 'calc(100% - 26px)' : '4px' }}
            />
          </button>
        </div>
      </motion.section>

      {/* Choix du template */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <FaPalette className="h-5 w-5" />
          </span>
          Choisir un template
        </h2>
        <p className="text-sm text-slate-500 mb-6">Le style du message sur le site.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODAL_TEMPLATES.map((t) => {
            const selected = form.modal_template === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, modal_template: t.id }))}
                className={`text-left rounded-xl border-2 p-4 transition-all ${
                  selected
                    ? 'border-acture-blue bg-acture-blue/5 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{t.name}</span>
                  {selected && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-acture-blue text-white">
                      <FaCheck className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{t.description}</p>
              </button>
            )
          })}
        </div>
      </motion.section>

      {/* Contenu */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <FaAlignLeft className="h-5 w-5" />
          </span>
          Contenu du message
        </h2>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Titre</label>
            <input
              type="text"
              value={form.modal_title}
              onChange={(e) => setForm((f) => ({ ...f, modal_title: e.target.value }))}
              placeholder="Titre du message"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
            <textarea
              value={form.modal_body}
              onChange={(e) => setForm((f) => ({ ...f, modal_body: e.target.value }))}
              placeholder="Découvrez nos actions d'inclusion numérique et de formation dans le 17e et le 18e arrondissement."
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Texte du bouton</label>
              <input
                type="text"
                value={form.modal_button_text}
                onChange={(e) => setForm((f) => ({ ...f, modal_button_text: e.target.value }))}
                placeholder="Découvrir"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Lien du bouton (optionnel)</label>
              <input
                type="text"
                value={form.modal_button_url}
                onChange={(e) => setForm((f) => ({ ...f, modal_button_url: e.target.value }))}
                placeholder="/asso ou https://..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
              />
            </div>
          </div>
          {selectedTemplate.hasImage && (
            <ImageUpload
              label="Image (template Split)"
              value={form.modal_image_url}
              onChange={(url) => setForm((f) => ({ ...f, modal_image_url: url }))}
            />
          )}
        </div>
      </motion.section>

      {/* Aperçu en overlay */}
      <AnimatePresence>
        {previewOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setPreviewOpen(false)}
              aria-hidden
            />
            <div className="fixed inset-0 z-[401] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="bg-slate-800 rounded-2xl p-4 max-h-[90vh] overflow-auto w-full max-w-2xl pointer-events-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/80 text-sm">Aperçu</p>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(false)}
                    className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label="Fermer l'aperçu"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
                <PreviewBox form={form} template={form.modal_template as ModalTemplateId} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Mini rendu de la modal pour l'aperçu admin */
function PreviewBox({ form, template }: { form: Initial; template: ModalTemplateId }) {
  const title = form.modal_title || 'Titre du message'
  const body = form.modal_body || 'Votre message ici.'
  const btnText = form.modal_button_text || 'Fermer'
  const imageUrl = form.modal_image_url

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-lg mx-auto">
      {template === 'hero' && (
        <div className="h-24 bg-gradient-to-r from-acture-blue to-acture-green" />
      )}
      {template === 'split' && (
        <div className="flex">
          <div className="w-1/3 min-h-[140px] relative bg-slate-200 shrink-0">
            {isValidImageSrc(imageUrl) ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="200px"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                Image
              </div>
            )}
          </div>
          <div className="flex-1 p-5 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm whitespace-pre-wrap mb-4 line-clamp-4">{body}</p>
            <button type="button" className="rounded-lg bg-acture-blue px-4 py-2 text-sm text-white">
              {btnText}
            </button>
          </div>
        </div>
      )}
      {template !== 'split' && (
        <div className={template === 'minimal' ? 'p-8 text-center' : 'p-6'}>
          {template === 'hero' && <div className="mb-4" />}
          <h3 className={`font-bold text-slate-900 mb-2 ${template === 'minimal' ? 'text-xl' : 'text-lg'}`}>{title}</h3>
          <p className="text-slate-600 text-sm whitespace-pre-wrap mb-4">{body}</p>
          <button type="button" className="rounded-lg bg-acture-blue px-4 py-2 text-sm text-white">
            {btnText}
          </button>
        </div>
      )}
    </div>
  )
}
