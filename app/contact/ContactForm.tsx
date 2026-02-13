'use client'

import { useState, useRef, useEffect } from 'react'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const successRef = useRef<HTMLDivElement>(null)
  const againButtonRef = useRef<HTMLButtonElement>(null)
  const errorRef = useRef<HTMLParagraphElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (formData.get('nom') as string)?.trim() || ''
    const email = (formData.get('email') as string)?.trim() || ''
    const subject = (formData.get('sujet') as string)?.trim() || 'autre'
    const message = (formData.get('message') as string)?.trim() || ''

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur lors de l\'envoi')
      setSuccess(true)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi')
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (success && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      againButtonRef.current?.focus()
    }
  }, [success])

  if (success) {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center"
      >
        <p className="text-emerald-800 font-medium">Message envoyé !</p>
        <p className="text-emerald-700 text-sm mt-1">Nous vous répondrons dès que possible.</p>
        <button
          ref={againButtonRef}
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-4 text-sm text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded px-2 py-1"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p ref={errorRef} role="alert" className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-sm">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
          Nom *
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="sujet" className="block text-gray-700 font-medium mb-2">
          Sujet *
        </label>
        <select
          id="sujet"
          name="sujet"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="asso">Acture Asso - Projets et actions</option>
          <option value="academie">Acture Académie - Formations</option>
          <option value="partenariat">Partenariat</option>
          <option value="soutien">Soutien / Don</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
        />
      </div>
      <div className="flex items-start">
        <input type="checkbox" id="rgpd" name="rgpd" required className="mt-1 mr-2" />
        <label htmlFor="rgpd" className="text-sm text-gray-700">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande (conformément à
          la politique de confidentialité) *
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full bg-acture-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-acture-blue focus:ring-offset-2"
      >
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
}
