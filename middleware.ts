import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_ONLY_PATHS = ['/admin/contacts', '/admin/partenaires', '/admin/projets', '/admin/evenements', '/admin/formations', '/admin/parametres', '/admin/modal']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    const role = (token as { role?: string }).role
    const isAdminOnly = ADMIN_ONLY_PATHS.some((p) => path === p || path.startsWith(p + '/'))
    if (isAdminOnly && role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
}
