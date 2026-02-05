"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const COOKIE_CONSENT_KEY = "cookie-consent"

type ConsentStatus = "pending" | "accepted" | "rejected"

/**
 * Cookie consent banner component
 * Stores user consent in localStorage and links to privacy policy
 */
export function CookieBanner() {
  const [status, setStatus] = useState<ConsentStatus>("pending")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus | null
    if (savedConsent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Need to sync with localStorage on mount
      setStatus(savedConsent)
    }
    setMounted(true)
  }, [])

  // Don't render if user has already consented or rejected
  if (!mounted || status !== "pending") {
    return null
  }

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setStatus("accepted")
  }

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected")
    setStatus("rejected")
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="alert shadow-lg max-w-4xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div className="flex-1">
          <h3 className="font-bold">We use cookies</h3>
          <div className="text-sm">
            We use essential cookies to make our site work. We also use analytics to understand how you use our site.
            By continuing to browse, you agree to our use of cookies and analytics. Learn more in our{" "}
            <Link href="/privacy" className="link link-primary font-semibold">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="btn btn-sm btn-ghost" onClick={handleReject}>
            Reject
          </button>
          <button className="btn btn-sm btn-primary" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
