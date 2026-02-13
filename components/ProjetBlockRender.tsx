import Image from 'next/image'
import Link from 'next/link'
import { isValidImageSrc } from '@/lib/image'

type Block = { type: string; content: string }

function parseContent(content: string): Record<string, unknown> {
  try {
    return JSON.parse(content) as Record<string, unknown>
  } catch {
    return {}
  }
}

export default function ProjetBlockRender({ block }: { block: Block }) {
  const c = parseContent(block.content)

  switch (block.type) {
    case 'title':
      return (
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          {(c.title as string) ?? (c.text as string) ?? ''}
        </h3>
      )
    case 'paragraph':
      return (
        <p className="text-gray-700 mb-6">
          {(c.text as string) ?? ''}
        </p>
      )
    case 'list': {
      const items = (c.items as string[]) ?? []
      const title = c.title as string
      return (
        <div className="mb-6">
          {title && <h4 className="font-semibold mb-3 text-acture-blue">{title}</h4>}
          <ul className="space-y-2 text-gray-700">
            {items.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-acture-blue mr-2">•</span>
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        </div>
      )
    }
    case 'testimony':
      return (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-acture-blue">Témoignage</h4>
          <p className="text-gray-700 italic">{(c.text as string) ?? ''}</p>
          {c.author != null && c.author !== '' && <p className="text-gray-600 text-sm mt-2">— {String(c.author)}</p>}
        </div>
      )
    case 'images': {
      const urls = ((c.urls as string[]) ?? []).filter((u): u is string => typeof u === 'string' && isValidImageSrc(u))
      if (urls.length === 0) return null
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {urls.map((url, i) => (
            <div key={i} className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 shadow-sm">
              <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
            </div>
          ))}
        </div>
      )
    }
    case 'link':
      return (
        <div className="mt-4">
          <Link
            href={(c.href as string) ?? '#'}
            className="inline-block bg-acture-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {(c.label as string) ?? 'En savoir plus'}
          </Link>
        </div>
      )
    case 'stats':
      return (
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700"><strong>{(c.text as string) ?? ''}</strong></p>
        </div>
      )
    default:
      return <p className="text-gray-700 mb-4">{(c.text as string) ?? block.content}</p>
  }
}
