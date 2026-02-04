"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

/**
 * Navigation header
 * Shows different links based on auth state
 */
export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { createClient } = await import("@/lib/supabase/client")
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user ? { email: user.email || "" } : null)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleSignOut = async () => {
    const { createClient } = await import("@/lib/supabase/client")
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-content/5">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-primary">◆</span>
            <span>YourProduct</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {user && (
              <Link href="/dashboard" className="px-4 py-2 text-sm text-base-content/70 hover:text-base-content transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {loading ? (
              <div className="btn btn-ghost btn-sm loading" />
            ) : user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm">
                  {user.email}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-200 rounded-box w-52 p-2 shadow-lg mt-2">
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><Link href="/dashboard/settings">Settings</Link></li>
                  <div className="divider my-1" />
                  <li><button onClick={handleSignOut}>Sign Out</button></li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm hidden sm:flex">
                  Sign In
                </Link>
                <Link href="/login" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end md:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-200 rounded-box w-52 p-2 shadow-lg mt-2">
                {user ? (
                  <>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/dashboard/settings">Settings</Link></li>
                    <div className="divider my-1" />
                    <li><button onClick={handleSignOut}>Sign Out</button></li>
                  </>
                ) : (
                  <li><Link href="/login">Sign In</Link></li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
