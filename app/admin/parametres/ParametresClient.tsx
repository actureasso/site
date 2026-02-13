'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaHeart,
  FaEye,
  FaSave,
} from 'react-icons/fa'
import Link from 'next/link'

const PAGES = [
  { key: 'page_accueil_enabled', label: 'Accueil' },
  { key: 'page_asso_enabled', label: 'Acture Asso' },
  { key: 'page_academie_enabled', label: 'Acture Académie' },
  { key: 'page_actualites_enabled', label: 'Actualités' },
  { key: 'page_partenaires_enabled', label: 'Partenaires' },
  { key: 'page_soutien_enabled', label: 'Nous soutenir' },
  { key: 'page_contact_enabled', label: 'Contact' },
]

const CONTACT_KEYS = [
  { key: 'contact_adresse', label: 'Adresse', placeholder: '123 rue Example', icon: FaMapMarkerAlt },
  { key: 'contact_ville', label: 'Ville & code postal', placeholder: '75000 Paris, France', icon: FaMapMarkerAlt },
  { key: 'contact_telephone', label: 'Téléphone', placeholder: '01 23 45 67 89', icon: FaPhone },
  { key: 'contact_horaires', label: 'Horaires (simplifié)', placeholder: 'Lun-Ven 9h-18h', icon: FaClock },
]

const EMAIL_KEYS = [
  { key: 'contact_email', label: 'Email principal', placeholder: 'contact@acture.fr', sub: 'Général' },
  { key: 'contact_email_asso', label: 'Email Acture Asso', placeholder: 'asso@acture.fr', sub: 'Projets et actions' },
  { key: 'contact_email_academie', label: 'Email Acture Académie', placeholder: 'academie@acture.fr', sub: 'Formations' },
]

type Props = { initial: Record<string, string> }

export default function ParametresClient({ initial }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {}
    const allKeys = [
      ...CONTACT_KEYS.map((k) => k.key),
      ...EMAIL_KEYS.map((k) => k.key),
      'helloasso_url',
      ...PAGES.map((p) => p.key),
    ]
    allKeys.forEach((key) => {
      if (key.startsWith('page_')) o[key] = initial[key] ?? '1'
      else o[key] = initial[key] ?? ''
    })
    return o
  })

  async function handleSave() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Paramètres enregistrés')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(key: string) {
    const next = form[key] === '1' ? '0' : '1'
    setForm((f) => ({ ...f, [key]: next }))
    setLoading(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: next }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success(next === '1' ? 'Page activée' : 'Page désactivée')
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur')
      setForm((f) => ({ ...f, [key]: form[key] }))
    } finally {
      setLoading(false)
    }
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Paramètres du site</h1>
          <p className="text-slate-600 mt-1">Coordonnées, visibilité des pages et contenus globaux</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-acture-blue text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-acture-blue/25"
        >
          <FaSave className="h-4 w-4" />
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </motion.button>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-xl text-sm"
        >
          {error}
        </motion.p>
      )}

      {/* Coordonnées */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={0}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-acture-blue/10 text-acture-blue">
            <FaMapMarkerAlt className="h-5 w-5" />
          </span>
          Coordonnées
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {CONTACT_KEYS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              <input
                type="text"
                value={form[key] ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* Emails */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <FaEnvelope className="h-5 w-5" />
          </span>
          Emails
        </h2>
        <div className="space-y-4">
          {EMAIL_KEYS.map(({ key, label, placeholder, sub }) => (
            <div key={key} className="p-4 rounded-xl bg-slate-50/80">
              <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
              {sub && <p className="text-xs text-slate-500 mb-2">{sub}</p>}
              <input
                type="email"
                value={form[key] ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
              />
            </div>
          ))}
        </div>
      </motion.section>

      {/* HelloAsso */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <FaHeart className="h-5 w-5" />
          </span>
          HelloAsso (dons)
        </h2>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">URL page dons</label>
          <input
            type="url"
            value={form.helloasso_url ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, helloasso_url: e.target.value }))}
            placeholder="https://www.helloasso.com/associations/acture"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-acture-blue focus:border-acture-blue transition"
          />
        </div>
      </motion.section>

      {/* Lien vers la gestion de la modal */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-2">Message aux visiteurs</h2>
        <p className="text-sm text-slate-500 mb-4">
          Annonce ou message affiché à la visite. Si vous modifiez le contenu, les visiteurs qui l&apos;avaient déjà vu le reverront.
        </p>
        <Link
          href="/admin/modal"
          className="inline-flex items-center gap-2 rounded-xl bg-amber-100 text-amber-800 px-4 py-2.5 font-medium hover:bg-amber-200 transition"
        >
          Gérer le message aux visiteurs →
        </Link>
      </motion.section>

      {/* Visibilité des pages */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        custom={4}
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <FaEye className="h-5 w-5" />
          </span>
          Visibilité des pages
        </h2>
        <p className="text-sm text-slate-500 mb-6">Activez ou désactivez les pages du menu.</p>
        <div className="space-y-3">
          {PAGES.map((p) => {
            const enabled = form[p.key] !== '0'
            return (
              <div
                key={p.key}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3"
              >
                <span className="font-medium text-slate-800">{p.label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  disabled={loading}
                  onClick={() => handleToggle(p.key)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${enabled ? 'bg-acture-blue' : 'bg-slate-300'}`}
                >
                  <motion.span
                    layout
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute top-1 h-5 w-5 rounded-full bg-white shadow"
                    style={{ left: enabled ? 'calc(100% - 22px)' : '4px' }}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </motion.section>

    </div>
  )
}
