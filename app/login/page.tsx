"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg w-fit">
          <span className="text-primary">👻</span>
          <span>YourApp</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Suspense fallback={<LoginSkeleton />}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  )
}

function LoginSkeleton() {
  return (
    <div className="w-full max-w-sm">
      <div className="h-8 bg-base-200 rounded w-1/2 mx-auto mb-2" />
      <div className="h-4 bg-base-200 rounded w-3/4 mx-auto mb-8" />
      <div className="space-y-4">
        <div className="h-12 bg-base-200 rounded" />
        <div className="h-12 bg-base-200 rounded" />
      </div>
    </div>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/dashboard"
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { createClient } = await import("@/lib/supabase/client")
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/callback?redirect=${redirect}`,
        },
      })

      if (error) throw error
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send magic link")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Check your email</h1>
        <p className="text-base-content/60 mb-8">
          We sent a magic link to <span className="font-medium text-base-content">{email}</span>
        </p>
        <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>
          ← Use a different email
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-base-content/60">Sign in to your account to continue</p>
      </div>

      {error && (
        <div className="alert alert-error mb-6 text-sm">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleMagicLink}>
        <input
          type="email"
          placeholder="you@example.com"
          className="input input-bordered w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>

      <p className="text-center text-xs text-base-content/50 mt-8">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="link">Terms</Link> and{" "}
        <Link href="/privacy" className="link">Privacy Policy</Link>
      </p>
    </div>
  )
}
