"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg w-fit">
          <span className="text-primary">◆</span>
          <span>60 Projects</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-gradient-to-b from-primary/5 to-base-100">
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
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Check your inbox</h1>
        <p className="text-base-content/60 mb-8">
          Magic link sent to <span className="font-medium text-base-content">{email}</span>
        </p>
        <p className="text-sm text-base-content/50 mb-6">
          Click the link in the email to sign in instantly
        </p>
        <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>
          ← Use different email
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <div className="text-4xl mb-4">🚀</div>
        <h1 className="text-2xl font-bold mb-2">Start Building Real Projects</h1>
        <p className="text-base-content/60">Access 60 production-ready projects to level up your skills</p>
      </div>

      {error && (
        <div className="alert alert-error mb-6 text-sm">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleMagicLink}>
        <input
          type="email"
          placeholder="Enter your email"
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
          {loading ? "Sending magic link..." : "Get Magic Link →"}
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
