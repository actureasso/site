'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaUser,
  FaHandshake,
  FaGraduationCap,
  FaHeart,
  FaQuestion,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa'

const SUBJECT_LABELS: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  asso: { label: 'Acture Asso', icon: FaHandshake, color: 'bg-emerald-100 text-emerald-800' },
  academie: { label: 'Acture Académie', icon: FaGraduationCap, color: 'bg-blue-100 text-blue-800' },
  partenariat: { label: 'Partenariat', icon: FaHandshake, color: 'bg-amber-100 text-amber-800' },
  soutien: { label: 'Soutien / Don', icon: FaHeart, color: 'bg-rose-100 text-rose-800' },
  autre: { label: 'Autre', icon: FaQuestion, color: 'bg-slate-100 text-slate-700' },
}

type Contact = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminContactsClient({
  initialList,
  initialUnread,
}: {
  initialList: Contact[]
  initialUnread: number
}) {
  const router = useRouter()
  const [list, setList] = useState(initialList)
  const [selected, setSelected] = useState<Contact | null>(null)
  const [unreadCount, setUnreadCount] = useState(initialUnread)

  async function markRead(id: string) {
    try {
      await fetch(`/api/admin/contacts/${id}`, { method: 'PATCH' })
      setList((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)))
      setUnreadCount((n) => Math.max(0, n - 1))
      if (selected?.id === id) setSelected((s) => (s ? { ...s, read: true } : null))
      router.refresh()
    } catch (_) {}
  }

  function openMessage(c: Contact) {
    setSelected(c)
    if (!c.read) markRead(c.id)
  }

  const subjectConfig = (s: string) => SUBJECT_LABELS[s] ?? SUBJECT_LABELS.autre
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Messages de contact</h1>
          <p className="text-slate-600 mt-0.5">
            {list.length} message{list.length !== 1 ? 's' : ''} reçu
            {list.length !== 1 ? 's' : ''}
            {unreadCount > 0 && (
              <span className="ml-2 text-acture-blue font-semibold">
                · {unreadCount} non lu{unreadCount !== 1 ? 's' : ''}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 space-y-2 max-h-[calc(100vh-12rem)] overflow-y-auto"
        >
          {list.map((c, i) => {
            const config = subjectConfig(c.subject)
            const Icon = config.icon
            const isSel = selected?.id === c.id
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
                type="button"
                onClick={() => openMessage(c)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSel
                    ? 'border-acture-blue bg-acture-blue/5 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold truncate ${!c.read ? 'text-slate-900' : 'text-slate-600'}`}>
                        {c.name}
                      </span>
                      {!c.read && (
                        <span className="shrink-0 h-2.5 w-2.5 rounded-full bg-acture-blue" />
                      )}
                    </div>
                    <span className={`text-sm block truncate ${!c.read ? 'text-slate-600' : 'text-slate-500'}`}>
                      {config.label}
                    </span>
                  </div>
                  <FaChevronRight
                    className={`shrink-0 mt-1 text-slate-400 transition-transform ${isSel ? 'rotate-90' : ''}`}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">{formatDate(c.createdAt)}</p>
              </motion.button>
            )
          })}
          {list.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              Aucun message pour le moment
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2"
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selected.name}</h2>
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-acture-blue hover:underline font-medium"
                    >
                      {selected.email}
                    </a>
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                          subjectConfig(selected.subject).color
                        }`}
                      >
                        {(() => {
                          const Icon = subjectConfig(selected.subject).icon
                          return <><Icon className="h-3.5 w-3.5" />{subjectConfig(selected.subject).label}</>
                        })()}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-slate-500 mb-3">{formatDate(selected.createdAt)}</p>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 bg-acture-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    <FaEnvelope className="h-4 w-4" />
                    Répondre
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 min-h-[280px] text-slate-500"
              >
                <FaEnvelopeOpen className="h-16 w-16 mb-4 text-slate-300" />
                <p className="font-medium">Sélectionnez un message</p>
                <p className="text-sm mt-1">Les détails s'afficheront ici</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
