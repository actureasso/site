'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { isValidImageSrc } from '@/lib/image'

const STORAGE_KEY = 'acture_modal_version'

type ModalConfig = {
  template: string
  title: string
  body: string
  buttonText: string
  buttonUrl: string
  imageUrl: string
  version: string
}

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false)
  const [config, setConfig] = useState<ModalConfig | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/settings')
      .then((r) => r.json().catch(() => ({})))
      .then((data: Record<string, string>) => {
        if (cancelled) return
        if (data.modal_enabled !== '1') return
        const currentVersion = data.modal_version || '0'
        try {
          if (typeof sessionStorage !== 'undefined') {
            const seenVersion = sessionStorage.getItem(STORAGE_KEY)
            if (seenVersion === currentVersion) return
          }
        } catch {
          // ignore
        }
        setConfig({
          template: data.modal_template || 'default',
          title: data.modal_title?.trim() || 'Message',
          body: data.modal_body?.trim() || '',
          buttonText: data.modal_button_text?.trim() || 'Fermer',
          buttonUrl: (data.modal_button_url || '').trim(),
          imageUrl: (data.modal_image_url || '').trim(),
          version: currentVersion,
        })
        setVisible(true)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  function close() {
    if (config?.version) {
      try {
        sessionStorage.setItem(STORAGE_KEY, config.version)
      } catch {
        // ignore
      }
    }
    setVisible(false)
  }

  if (!visible || !config) return null

  const CtaButton = () =>
    config.buttonUrl ? (
      <Link
        href={config.buttonUrl}
        onClick={close}
        className="inline-flex items-center justify-center rounded-xl bg-acture-blue px-6 py-3 font-medium text-white hover:bg-blue-700 transition"
      >
        {config.buttonText}
      </Link>
    ) : (
      <button
        type="button"
        onClick={close}
        className="inline-flex items-center justify-center rounded-xl bg-acture-blue px-6 py-3 font-medium text-white hover:bg-blue-700 transition"
      >
        {config.buttonText}
      </button>
    )

  const CloseButton = () => (
    <button
      type="button"
      onClick={close}
      className="shrink-0 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
      aria-label="Fermer"
    >
      <FaTimes className="h-5 w-5" />
    </button>
  )

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-modal-title"
          onClick={(e) => e.stopPropagation()}
          className="pointer-events-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Template: hero — bandeau + contenu */}
          {config.template === 'hero' && (
            <>
              <div className="h-28 bg-gradient-to-r from-acture-blue to-acture-green" />
              <div className="p-6 md:p-8 relative">
                <div className="absolute top-4 right-4">
                  <CloseButton />
                </div>
                <h2 id="welcome-modal-title" className="text-2xl font-bold text-slate-900 pr-10">
                  {config.title}
                </h2>
                {config.body ? (
                  <p className="text-slate-600 whitespace-pre-wrap mt-3 mb-6">{config.body}</p>
                ) : null}
                <CtaButton />
              </div>
            </>
          )}

          {/* Template: split — image à gauche, contenu à droite */}
          {config.template === 'split' && (
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-2/5 min-h-[200px] sm:min-h-[280px] relative bg-slate-100">
                {isValidImageSrc(config.imageUrl) ? (
                  <Image
                    src={config.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                    Image
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 md:p-8 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <h2 id="welcome-modal-title" className="text-xl font-bold text-slate-900">
                    {config.title}
                  </h2>
                  <CloseButton />
                </div>
                {config.body ? (
                  <p className="text-slate-600 whitespace-pre-wrap flex-1 mb-6">{config.body}</p>
                ) : null}
                <CtaButton />
              </div>
            </div>
          )}

          {/* Template: minimal — centré, épuré */}
          {config.template === 'minimal' && (
            <div className="p-8 md:p-10 text-center bg-white/95 backdrop-blur rounded-2xl border border-white/50 shadow-xl">
              <div className="flex justify-end -mt-2 -mr-2 mb-2">
                <CloseButton />
              </div>
              <h2 id="welcome-modal-title" className="text-2xl font-bold text-slate-900 mb-4">
                {config.title}
              </h2>
              {config.body ? (
                <p className="text-slate-600 whitespace-pre-wrap mb-8 max-w-sm mx-auto">{config.body}</p>
              ) : null}
              <CtaButton />
            </div>
          )}

          {/* Template: default — carte classique */}
          {(config.template === 'default' || !['hero', 'split', 'minimal'].includes(config.template)) && (
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 id="welcome-modal-title" className="text-2xl font-bold text-slate-900">
                  {config.title}
                </h2>
                <CloseButton />
              </div>
              {config.body ? (
                <p className="text-slate-600 whitespace-pre-wrap mb-6">{config.body}</p>
              ) : null}
              <CtaButton />
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
