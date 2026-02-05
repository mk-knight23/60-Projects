import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Auth configuration - edit here
 */
export const auth = {
  redirectAfterLogin: "/dashboard",
  redirectAfterLogout: "/",
  protectedRoutes: ["/dashboard", "/onboarding"],
}

/**
 * Auth middleware
 * Protects routes and manages sessions
 *
 * If Supabase env vars are not set, auth checks are skipped
 * to allow the app to run without configuration.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip auth but still protect routes
  if (!supabaseUrl || !supabaseKey) {
    const isProtectedRoute = auth.protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isProtectedRoute) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  // Supabase is configured - proceed with auth checks
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        )
        supabaseResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtectedRoute = auth.protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (user && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL(auth.redirectAfterLogin, request.url))
  }

  // Check if user needs onboarding
  if (user && !pathname.startsWith("/onboarding")) {
    const { data: userProfile } = await supabase
      .from("users")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single()

    if (userProfile && !userProfile.onboarding_completed) {
      // Only redirect dashboard pages to onboarding
      if (pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/onboarding", request.url))
      }
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
