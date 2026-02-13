import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { isValidImageSrc } from '@/lib/image'
import { FaImages } from 'react-icons/fa'

export default async function AdminMediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Média</h1>
          <p className="text-slate-600 mt-1">
            Bibliothèque des fichiers uploadés (images utilisables dans les articles, projets, etc.).
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {media.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <FaImages className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>Aucun fichier uploadé.</p>
            <p className="text-sm mt-2">
              Les images ajoutées via les formulaires (ex. Actualités) apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 p-6">
            {media.map((m) => (
              <div
                key={m.id}
                className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50 group"
              >
                <div className="aspect-square relative bg-slate-200">
                  {isValidImageSrc(m.url) ? (
                    <Image
                      src={m.url}
                      alt={m.alt || m.filename}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
                      Fichier
                    </div>
                  )}
                </div>
                <div className="p-2 truncate text-xs text-slate-600" title={m.filename}>
                  {m.filename}
                </div>
                <div className="p-2 border-t border-slate-100">
                  <input
                    type="text"
                    readOnly
                    value={m.url}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
