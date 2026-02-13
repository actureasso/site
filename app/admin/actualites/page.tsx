import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { FaPlus, FaEdit } from 'react-icons/fa'
import AdminActualitesClient from './AdminActualitesClient'

export default async function AdminActualitesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { date: 'desc' },
  })

  return (
    <AdminActualitesClient articles={articles} />
  )
}
