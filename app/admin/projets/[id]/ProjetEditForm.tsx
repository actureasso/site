'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/admin/ToastContext'
import Link from 'next/link'
import type { Projet, ProjetBlock } from '@prisma/client'
import { FaAlignLeft, FaHeading, FaList, FaQuoteRight, FaImages, FaExternalLinkAlt, FaChartBar, FaPlus, FaTrash, FaChevronDown } from 'react-icons/fa'
import ImageUpload from '@/components/admin/ImageUpload'

const ICONS = ['FaUsers', 'FaLaptop', 'FaChild', 'FaPlane', 'FaBriefcase', 'FaNetworkWired'] as const
const ICON_LABELS: Record<string, string> = {
  FaUsers: 'Utilisateurs',
  FaLaptop: 'Ordinateur',
  FaChild: 'Enfant',
  FaPlane: 'Avion',
  FaBriefcase: 'Mallette',
  FaNetworkWired: 'Réseau',
}

const BLOCK_OPTIONS = [
  { type: 'paragraph' as const, label: 'Texte', icon: FaAlignLeft },
  { type: 'title' as const, label: 'Titre de section', icon: FaHeading },
  { type: 'list' as const, label: 'Liste à puces', icon: FaList },
  { type: 'testimony' as const, label: 'Témoignage', icon: FaQuoteRight },
  { type: 'images' as const, label: 'Galerie photos', icon: FaImages },
  { type: 'link' as const, label: 'Bouton / Lien', icon: FaExternalLinkAlt },
  { type: 'stats' as const, label: 'Chiffre clé', icon: FaChartBar },
]

type BlockType = (typeof BLOCK_OPTIONS)[number]['type']

function parseBlockContent(type: BlockType, content: string): Record<string, unknown> {
  try {
    return JSON.parse(content) as Record<string, unknown>
  } catch {
    return {}
  }
}

function getBlockLabel(type: BlockType): string {
  return BLOCK_OPTIONS.find((o) => o.type === type)?.label ?? type
}

function BlockEditorParagraph({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('paragraph', content)
  const text = (c.text as string) ?? ''
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">Texte</label>
      <textarea
        value={text}
        onChange={(e) => onChange(JSON.stringify({ text: e.target.value }))}
        rows={4}
        placeholder="Votre paragraphe..."
        className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
      />
    </div>
  )
}

function BlockEditorTitle({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('title', content)
  const title = (c.title ?? c.text) as string ?? ''
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">Titre de la section</label>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(JSON.stringify({ title: e.target.value }))}
        placeholder="Ex. Nos objectifs"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
      />
    </div>
  )
}

function BlockEditorList({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('list', content)
  const items = (Array.isArray(c.items) ? c.items.filter((x): x is string => typeof x === 'string') : []) as string[]
  const title = (c.title as string) ?? ''
  function setItems(newItems: string[]) {
    onChange(JSON.stringify({ title, items: newItems }))
  }
  function setTitle(t: string) {
    onChange(JSON.stringify({ title: t, items }))
  }
  function addItem() {
    setItems([...items, ''])
  }
  function removeItem(i: number) {
    setItems(items.filter((_, j) => j !== i))
  }
  function updateItem(i: number, v: string) {
    setItems(items.map((x, j) => (j === i ? v : x)))
  }
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Titre de la liste (optionnel)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex. Nos engagements"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
        />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-slate-700">Éléments</label>
          <button type="button" onClick={addItem} className="text-sm font-medium text-acture-blue hover:text-blue-800">
            + Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={`Élément ${i + 1}`}
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
              />
              <button type="button" onClick={() => removeItem(i)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600">
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <button type="button" onClick={addItem} className="w-full rounded-xl border-2 border-dashed border-slate-200 py-4 text-sm text-slate-500 hover:border-acture-blue hover:text-acture-blue">
              + Ajouter le premier élément
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function BlockEditorTestimony({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('testimony', content)
  const text = (c.text as string) ?? ''
  const author = (c.author as string) ?? ''
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Citation / Témoignage</label>
        <textarea
          value={text}
          onChange={(e) => onChange(JSON.stringify({ text: e.target.value, author }))}
          rows={3}
          placeholder="Le texte du témoignage..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Auteur (optionnel)</label>
        <input
          type="text"
          value={author}
          onChange={(e) => onChange(JSON.stringify({ text, author: e.target.value }))}
          placeholder="Ex. Marie D., Bénévole"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
        />
      </div>
    </div>
  )
}

function BlockEditorImages({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('images', content)
  const urls = (Array.isArray(c.urls) ? c.urls.filter((u): u is string => typeof u === 'string') : []) as string[]
  function setUrls(newUrls: string[]) {
    onChange(JSON.stringify({ urls: newUrls }))
  }
  function addImage() {
    setUrls([...urls, ''])
  }
  function removeImage(idx: number) {
    setUrls(urls.filter((_, j) => j !== idx))
  }
  function updateUrl(idx: number, url: string) {
    setUrls(urls.map((u, j) => (j === idx ? url : u)))
  }
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">Les images s&apos;afficheront en grille sur la page du projet.</p>
      {urls.map((url, idx) => (
        <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex-1 min-w-0">
            <ImageUpload label={`Image ${idx + 1}`} value={url} onChange={(u) => updateUrl(idx, u)} />
          </div>
          <button type="button" onClick={() => removeImage(idx)} className="mt-6 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-100">
            Supprimer
          </button>
        </div>
      ))}
      <button type="button" onClick={addImage} className="w-full rounded-xl border-2 border-dashed border-slate-200 py-5 text-sm font-medium text-slate-500 hover:border-acture-blue hover:text-acture-blue">
        + Ajouter une photo
      </button>
    </div>
  )
}

function BlockEditorLink({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('link', content)
  const label = (c.label as string) ?? 'En savoir plus'
  const href = (c.href as string) ?? ''
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Texte du bouton</label>
        <input
          type="text"
          value={label}
          onChange={(e) => onChange(JSON.stringify({ label: e.target.value, href }))}
          placeholder="En savoir plus"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">URL du lien</label>
        <input
          type="url"
          value={href}
          onChange={(e) => onChange(JSON.stringify({ label, href: e.target.value }))}
          placeholder="https://..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
        />
      </div>
    </div>
  )
}

function BlockEditorStats({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const c = parseBlockContent('stats', content)
  const text = (c.text as string) ?? ''
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">Chiffre ou statistique</label>
      <input
        type="text"
        value={text}
        onChange={(e) => onChange(JSON.stringify({ text: e.target.value }))}
        placeholder="Ex. 500 familles accompagnées"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20"
      />
    </div>
  )
}

function BlockCard({
  block,
  index,
  onUpdate,
  onRemove,
}: {
  block: { id: string; type: BlockType; order: number; content: string }
  index: number
  onUpdate: (content: string) => void
  onRemove: () => void
}) {
  const [collapsed, setCollapsed] = useState(false)
  const opt = BLOCK_OPTIONS.find((o) => o.type === block.type)
  const Icon = opt?.icon ?? FaAlignLeft

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between bg-slate-50 px-5 py-4 text-left hover:bg-slate-100"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-acture-blue/10 text-acture-blue">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{getBlockLabel(block.type)}</p>
            <p className="text-xs text-slate-500">Élément {index + 1}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onRemove() }} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Supprimer">
            <FaTrash className="h-4 w-4" />
          </button>
          <FaChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </div>
      </button>
      {!collapsed && (
        <div className="border-t border-slate-100 p-5">
          {block.type === 'paragraph' && <BlockEditorParagraph content={block.content} onChange={onUpdate} />}
          {block.type === 'title' && <BlockEditorTitle content={block.content} onChange={onUpdate} />}
          {block.type === 'list' && <BlockEditorList content={block.content} onChange={onUpdate} />}
          {block.type === 'testimony' && <BlockEditorTestimony content={block.content} onChange={onUpdate} />}
          {block.type === 'images' && <BlockEditorImages content={block.content} onChange={onUpdate} />}
          {block.type === 'link' && <BlockEditorLink content={block.content} onChange={onUpdate} />}
          {block.type === 'stats' && <BlockEditorStats content={block.content} onChange={onUpdate} />}
        </div>
      )}
    </div>
  )
}

type ProjetWithBlocks = Projet & { blocks: ProjetBlock[] }

export default function ProjetEditForm({ projet }: { projet: ProjetWithBlocks }) {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAddMenu, setShowAddMenu] = useState(false)
  const addMenuRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) setShowAddMenu(false)
    }
    if (showAddMenu) document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showAddMenu])
  const [form, setForm] = useState({
    slug: projet.slug,
    title: projet.title,
    subtitle: projet.subtitle ?? '',
    description: projet.description ?? '',
    icon: projet.icon ?? 'FaUsers',
    order: projet.order,
  })
  const [blocks, setBlocks] = useState(
    projet.blocks.map((b) => {
      const content = b.content || '{}'
      return { id: b.id, type: (b.type || 'paragraph') as BlockType, order: b.order, content }
    })
  )

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`/api/projets/${projet.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          blocks: blocks.map((b, i) => ({ type: b.type, order: i, content: b.content })),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error((data as { error?: string }).error || 'Erreur')
      toast.success('Projet enregistré')
      router.refresh()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  function addBlock(type: BlockType) {
    setShowAddMenu(false)
    const defaults: Record<BlockType, string> = {
      paragraph: '{"text":""}',
      title: '{"title":""}',
      list: '{"title":"","items":[]}',
      testimony: '{"text":"","author":""}',
      images: '{"urls":[]}',
      link: '{"label":"En savoir plus","href":""}',
      stats: '{"text":""}',
    }
    setBlocks((b) => [...b, { id: '', type, order: b.length, content: defaults[type] }])
  }

  function removeBlock(i: number) {
    setBlocks((b) => b.filter((_, idx) => idx !== i))
  }

  function updateBlockContent(i: number, content: string) {
    setBlocks((b) => b.map((x, j) => (j === i ? { ...x, content } : x)))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-semibold text-slate-900">Informations du projet</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Slug (URL)</label>
            <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} required className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Titre</label>
            <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20" />
          </div>
        </div>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Sous-titre</label>
          <input type="text" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20" />
        </div>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20" />
        </div>
        <div className="mt-5">
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Icône</label>
          <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-acture-blue focus:ring-2 focus:ring-acture-blue/20">
            {ICONS.map((i) => (
              <option key={i} value={i}>{ICON_LABELS[i] ?? i}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Contenu de la page</h2>
            <p className="mt-0.5 text-sm text-slate-500">Ajoutez des blocs pour structurer la page (texte, photos, témoignages...)</p>
          </div>
          <div ref={addMenuRef} className="relative">
            <button type="button" onClick={(e) => { e.stopPropagation(); setShowAddMenu(!showAddMenu) }} className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-blue-800">
              <FaPlus className="h-4 w-4" /> Ajouter un élément
            </button>
            {showAddMenu && (
              <div className="absolute right-0 top-full z-10 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                {BLOCK_OPTIONS.map((opt) => (
                  <button key={opt.type} type="button" onClick={() => addBlock(opt.type)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-slate-50">
                    <opt.icon className="h-4 w-4 text-acture-blue" />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {blocks.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-slate-200 py-16 text-center">
            <p className="text-slate-500">Aucun contenu ajouté.</p>
            <p className="mt-1 text-sm text-slate-400">Cliquez sur &quot;Ajouter un élément&quot; pour commencer.</p>
            <button type="button" onClick={() => addBlock('paragraph')} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-acture-blue px-5 py-2.5 font-semibold text-white hover:bg-blue-800">
              <FaPlus className="h-4 w-4" /> Ajouter du texte
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block, i) => (
              <BlockCard key={i} block={block} index={i} onUpdate={(c) => updateBlockContent(i, c)} onRemove={() => removeBlock(i)} />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="rounded-xl bg-acture-blue px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50">
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <Link href="/admin/projets" className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">
          Annuler
        </Link>
      </div>
    </form>
  )
}
