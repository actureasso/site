'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import { motion } from 'framer-motion'

type PageItem = { key: string; label: string }

const PAGES: PageItem[] = [
  { key: 'page_accueil_enabled', label: 'Accueil' },
  { key: 'page_asso_enabled', label: 'Acture Asso' },
  { key: 'page_academie_enabled', label: 'Acture Académie' },
  { key: 'page_actualites_enabled', label: 'Actualités' },
  { key: 'page_partenaires_enabled', label: 'Partenaires' },
  { key: 'page_soutien_enabled', label: 'Nous soutenir' },
  { key: 'page_contact_enabled', label: 'Contact' },
]

export default function ParametresPagesForm({ initial }: { initial: Record<string, string> }) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {}
    PAGES.forEach((p) => { o[p.key] = initial[p.key] ?? '1' })
    return o
  })

  useEffect(() => {
    const o: Record<string, string> = {}
    PAGES.forEach((p) => { o[p.key] = initial[p.key] ?? '1' })
    setForm(o)
  }, [initial])

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-2 font-semibold text-slate-900">Visibilité des pages</h2>
      <p className="mb-6 text-sm text-slate-500">Désactivez une page pour la masquer du menu et du site.</p>
      <div className="space-y-3" role="group" aria-label="Pages du site">
        {PAGES.map((p) => {
          const enabled = form[p.key] !== '0'
          return (
            <div key={p.key} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3">
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
    </motion.div>
  )
}
