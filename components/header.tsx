"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ThemeSelector } from "./theme-selector"

/**
 * Navigation header for 60 Projects Ecosystem
 * Shows different links based on auth state
 * Mobile: hamburger menu | Desktop: full nav
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

  const navLinks = {
    public: [
      { href: "/", label: "Home" },
      { href: "/#features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/docs", label: "Docs" },
    ],
    authenticated: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/dashboard/settings", label: "Settings" },
    ],
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/80 border-b border-base-content/5">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Image src="/logo.svg" alt="60 Projects Ecosystem Logo" width={140} height={28} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {navLinks.authenticated.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            ) : (
              navLinks.public.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-base-content/70 hover:text-base-content transition-colors"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ThemeSelector />

            {loading ? (
              <div className="btn btn-ghost btn-sm loading" />
            ) : user ? (
              /* User Dropdown Menu */
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      {user.email?.[0].toUpperCase()}
                    </div>
                  </div>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-200 rounded-box w-48 p-2 shadow-lg mt-2 z-50">
                  <li className="menu-title text-xs text-base-content/60">
                    {user.email}
                  </li>
                  {navLinks.authenticated.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                  <div className="divider my-1" />
                  <li>
                    <button onClick={handleSignOut}>Sign Out</button>
                  </li>
                </ul>
              </div>
            ) : (
              /* Auth Buttons (Logged Out) */
              <>
                <Link href="/login" className="btn btn-ghost btn-sm hidden sm:flex">
                  Sign In
                </Link>
                <Link href="/pricing" className="btn btn-primary btn-sm">
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
              <ul tabIndex={0} className="dropdown-content menu menu-sm bg-base-200 rounded-box w-52 p-2 shadow-lg mt-2 z-50">
                {user ? (
                  <>
                    <li className="menu-title text-xs text-base-content/60">Menu</li>
                    {navLinks.authenticated.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                    <div className="divider my-1" />
                    <li>
                      <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="menu-title text-xs text-base-content/60">Menu</li>
                    {navLinks.public.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                    <div className="divider my-1" />
                    <li>
                      <Link href="/login">Sign In</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
