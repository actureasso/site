import { prisma } from '@/lib/prisma'
import AdminContactsClient from './AdminContactsClient'

export default async function AdminContactsPage() {
  const list = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const unreadCount = await prisma.contactSubmission.count({ where: { read: false } })
  return <AdminContactsClient initialList={list} initialUnread={unreadCount} />
}
