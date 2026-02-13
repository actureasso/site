import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import FormationsList from './FormationsList'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Nos Formations | Acture Académie',
  description: 'Catalogue des formations certifiantes et préqualifiantes : REMN, Re Connect, VIA. Médiation numérique, animation, insertion. Paris.',
  path: '/academie/formations',
})

export default async function FormationsPage() {
  const formations = await prisma.formation.findMany({
    orderBy: { order: 'asc' },
  })
  return <FormationsList formations={formations} />
}
