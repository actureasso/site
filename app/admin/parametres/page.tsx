import { prisma } from '@/lib/prisma'
import ParametresClient from './ParametresClient'

export default async function AdminParametresPage() {
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  return <ParametresClient initial={map} />
}
