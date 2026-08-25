import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// 1. Centralize your protected route paths
const PROTECTED_ROUTES = ['/checkout', '/dashboard', '/account', '/profile']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 2. Check if the incoming request path starts with a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // 3. Fast Exit: Bypass Supabase calls on public pages (like /, /shop, /about)
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // 4. Initialize Supabase Response & Client only for protected routes
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 5. Secure user validation check
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 6. Redirect unauthenticated users
  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

// 7. Global Matcher: Exclude static assets, images, and next internal files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}