import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import LayoutWrapper from '@/components/LayoutWrapper'
import { getBaseUrl, SITE_NAME, SITE_DEFAULT_DESCRIPTION, getDefaultOgImage } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${SITE_NAME} - Deviens acteur de ton aventure`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [
    'Acture',
    'association',
    'inclusion numérique',
    'médiation numérique',
    'formation',
    'Paris 17',
    'Paris 18',
    'jeunesse',
    'insertion professionnelle',
    'Acture Asso',
    'Acture Académie',
  ],
  authors: [{ name: SITE_NAME, url: getBaseUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: getBaseUrl(),
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Deviens acteur de ton aventure`,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [{ url: getDefaultOgImage(), width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Deviens acteur de ton aventure`,
    description: SITE_DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    // À remplir quand tu as les codes (Google Search Console, etc.)
    // google: 'xxx',
    // yandex: 'xxx',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: getBaseUrl(),
  logo: getDefaultOgImage(),
  description: SITE_DEFAULT_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Paris',
    addressRegion: 'Île-de-France',
  },
  sameAs: [
    'https://www.instagram.com/acture.asso/',
    'https://www.linkedin.com/company/acture-asso/',
    'https://www.tiktok.com/@acture.asso',
  ],
}

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: getBaseUrl(),
  description: SITE_DEFAULT_DESCRIPTION,
  publisher: { '@id': `${getBaseUrl()}/#organization` },
  inLanguage: 'fr-FR',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${getBaseUrl()}/actualites?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              { ...jsonLdOrganization, '@id': `${getBaseUrl()}/#organization` },
              jsonLdWebSite,
            ]),
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
}
