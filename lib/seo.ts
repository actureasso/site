/**
 * Config SEO centralisée - Acture
 * Utiliser NEXT_PUBLIC_SITE_URL en prod (ex. https://acture.org)
 */
export const SITE_NAME = 'Acture'
export const SITE_DEFAULT_DESCRIPTION =
  'Acture Asso et Acture Académie - Inclusion numérique, jeunesse, insertion professionnelle, formation. Paris 17e et 18e.'

export function getBaseUrl(): string {
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  return 'https://acture.org'
}

export function getCanonicalUrl(path: string): string {
  const base = getBaseUrl()
  const p = path.startsWith('/') ? path : `/${path}`
  return `${base}${p}`
}

/** Image par défaut pour Open Graph / Twitter (ratio 1.91:1 recommandé, min 1200x630) */
export function getDefaultOgImage(): string {
  return `${getBaseUrl()}/logo.png`
}

export type PageMeta = {
  title: string
  description: string
  path?: string
  image?: string | null
  noIndex?: boolean
}

/** Génère l'objet metadata Next.js avec Open Graph et Twitter */
export function buildMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: PageMeta): import('next').Metadata {
  const url = getCanonicalUrl(path)
  const ogImage = image && image.startsWith('http') ? image : image ? `${getBaseUrl()}${image}` : getDefaultOgImage()

  return {
    title: title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`,
    description: description.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      siteName: SITE_NAME,
      title,
      description: description.slice(0, 160),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.slice(0, 160),
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
