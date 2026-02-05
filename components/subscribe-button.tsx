"use client"

import { useState } from "react"

interface SubscribeButtonProps {
  priceId: string
  coupon?: string
  children: React.ReactNode
  className?: string
}

export function SubscribeButton({ priceId, coupon, children, className = "" }: SubscribeButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async () => {
    setIsLoading(true)

    try {
      console.log("Initiating checkout for priceId:", priceId, "coupon:", coupon || "none")

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, coupon }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Checkout API error:", data)
        throw new Error(data.error || "Failed to create checkout session")
      }

      console.log("Checkout session created, redirecting to:", data.url)

      // Redirect to Stripe checkout
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout error:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to create checkout session"
      alert(`Error: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className={className}
    >
      {isLoading && <span className="loading loading-spinner loading-sm" />}
      {children}
    </button>
  )
}
