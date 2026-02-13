import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { ToastProvider } from '@/components/admin/ToastContext'
import AdminPageAnim from '@/components/admin/AdminPageAnim'
import { prisma } from '@/lib/prisma'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: string } | undefined)?.role ?? 'redacteur'
  let unreadContacts = 0
  if (role === 'admin') {
    try {
      unreadContacts = await prisma.contactSubmission.count({ where: { read: false } })
    } catch {
      unreadContacts = 0
    }
  }

  const fullNav = [
    { href: '/admin', label: 'Dashboard', iconKey: 'dashboard' },
    { href: '/admin/contacts', label: 'Messages', iconKey: 'envelope', badge: unreadContacts },
    { href: '/admin/actualites', label: 'Actualités', iconKey: 'newspaper' },
    { href: '/admin/media', label: 'Média', iconKey: 'images' },
    { href: '/admin/modal', label: 'Message visiteurs', iconKey: 'modal' },
    { href: '/admin/partenaires', label: 'Partenaires', iconKey: 'handshake' },
    { href: '/admin/projets', label: 'Projets', iconKey: 'folder' },
    { href: '/admin/evenements', label: 'Événements', iconKey: 'calendar' },
    { href: '/admin/formations', label: 'Formations', iconKey: 'graduation' },
    { href: '/admin/parametres', label: 'Paramètres', iconKey: 'cog' },
  ]
  const nav =
    role === 'admin'
      ? fullNav
      : fullNav.filter(
          (item) =>
            item.href === '/admin' ||
            item.href === '/admin/actualites' ||
            item.href === '/admin/media'
        )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {session ? (
        <div className="flex min-h-screen">
          <AdminSidebar nav={nav} />
          <ToastProvider>
            <main className="ml-64 flex-1 overflow-auto p-8">
              <div className="mx-auto max-w-5xl">
                <AdminPageAnim>{children}</AdminPageAnim>
              </div>
            </main>
          </ToastProvider>
        </div>
      ) : (
        <main>{children}</main>
      )}
    </div>
  )
}
