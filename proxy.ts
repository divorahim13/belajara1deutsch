import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  // Update session dan dapatkan user + instance supabase
  const { supabaseResponse, user, supabase } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Izinkan request untuk assets statis dan callback auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth/callback') ||
    pathname.includes('.')
  ) {
    return supabaseResponse
  }

  // Jika halaman public (login, signup, beranda), dan user sudah login, arahkan ke dashboard yang sesuai role
  if (pathname === '/login' || pathname === '/' || pathname === '/signup') {
    if (user && supabase) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = profile?.role
      if (role === 'super_admin') {
        return NextResponse.redirect(new URL('/superadmin', request.url))
      } else if (role === 'admin_teacher' || role === 'client_owner') {
        return NextResponse.redirect(new URL('/admin', request.url))
      } else {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
    return supabaseResponse
  }

  // Melindungi semua rute lainnya agar wajib login
  if (!user) {
    // Jika belum login, redirect ke halaman login
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ==========================================
  // Pengecekan ROLE (RBAC) untuk rute spesifik
  // ==========================================
  if (pathname.startsWith('/admin') || pathname.startsWith('/superadmin')) {
    if (supabase) {
      // Ambil role dari tabel profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const role = profile?.role

      // Proteksi rute /superadmin (Hanya super_admin)
      if (pathname.startsWith('/superadmin')) {
        if (role !== 'super_admin') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Proteksi rute /admin (Bisa diakses super_admin, client_owner, admin_teacher)
      if (pathname.startsWith('/admin')) {
        if (role !== 'super_admin' && role !== 'client_owner' && role !== 'admin_teacher') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }
    } else {
      // Fallback jika supabase client gagal memuat
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

