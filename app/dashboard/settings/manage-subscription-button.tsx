"use client"

import { useState } from "react"

/**
 * Button to open Stripe Customer Portal
 * Allows users to manage their subscription (update payment, cancel, etc.)
 */
export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("No portal URL returned")
      }
    } catch (error) {
      console.error("Failed to open portal:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="btn btn-outline btn-sm"
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs" />
      ) : (
        "Manage"
      )}
    </button>
  )
}
