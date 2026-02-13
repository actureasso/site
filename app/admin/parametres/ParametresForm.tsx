'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'

type Props = { initial: Record<string, string>; keys: { key: string; label: string; placeholder: string }[] }

export default function ParametresForm({ initial, keys }: Props) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<Record<string, string>>(() => {
    const o: Record<string, string> = {}
    keys.forEach((k) => { o[k.key] = initial[k.key] ?? '' })
    return o
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
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

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-2xl space-y-5">
      {error && <p className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">{error}</p>}
      {keys.map((k) => (
        <div key={k.key}>
          <label className="block text-sm font-medium text-slate-700 mb-1">{k.label}</label>
          {k.key.includes('vision') || k.key.includes('horaires') ? (
            <textarea
              value={form[k.key] ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, [k.key]: e.target.value }))}
              rows={3}
              placeholder={k.placeholder}
              className="w-full border border-slate-300 rounded-lg px-4 py-2"
            />
          ) : (
            <input
              type="text"
              value={form[k.key] ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, [k.key]: e.target.value }))}
              placeholder={k.placeholder}
              className="w-full border border-slate-300 rounded-lg px-4 py-2"
            />
          )}
        </div>
      ))}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <button type="submit" disabled={loading} className="bg-acture-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-800 disabled:opacity-50">
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  )
}
