'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { isValidImageSrc } from '@/lib/image'
import { FaUpload, FaTimes } from 'react-icons/fa'

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
  accept?: string
}

export default function ImageUpload({ value, onChange, label = 'Image', accept = 'image/jpeg,image/png,image/webp,image/gif' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [drag, setDrag] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function doUpload(file: File) {
    if (!file.type.startsWith('image/')) return
    setUploadError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur upload')
      onChange(data.url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setUploading(false)
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) doUpload(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files?.[0]
    if (file) doUpload(file)
  }

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <div
        className={`rounded-2xl border-2 border-dashed p-6 transition-all duration-200 ${
          drag ? 'border-acture-blue bg-blue-50/50' : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl bg-white sm:h-32 sm:w-48">
            {isValidImageSrc(value) ? (
              <>
                <Image src={value} alt="" fill className="object-cover" sizes="192px" />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute top-2 right-2 rounded-lg bg-black/60 p-2 text-white transition hover:bg-black/80"
                  title="Supprimer l'image"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="flex h-full w-full flex-col items-center justify-center gap-3 text-slate-400 transition hover:text-acture-blue disabled:opacity-50"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200/80">
                  <FaUpload className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">
                  {uploading ? 'Upload en cours...' : 'Glisser une image ou cliquer'}
                </span>
              </button>
            )}
          </div>
          <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/uploads/xxx ou https://..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20 transition"
            />
            <p className="mt-1 text-xs text-slate-500">Max 5 Mo. JPEG, PNG, WebP, GIF.</p>
            {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
