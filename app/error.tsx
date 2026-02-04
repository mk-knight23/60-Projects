"use client"

import { useEffect } from "react"
import Link from "next/link"

/**
 * Error boundary for the app
 * Catches unhandled errors and displays a friendly message
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console (replace with your error tracking service)
    console.error("Unhandled error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          <div className="text-6xl mb-4">😵</div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-base-content/70 mb-6">
            An unexpected error occurred. We&apos;ve been notified and are
            looking into it.
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={reset} className="btn btn-primary">
              Try Again
            </button>
            <Link href="/" className="btn btn-outline">
              Go Home
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-base-content/50">
                Error Details (dev only)
              </summary>
              <pre className="mt-2 p-4 bg-base-200 rounded-lg text-xs overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}
