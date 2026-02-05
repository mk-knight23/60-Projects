import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createCheckoutSession, validatePromotionCode } from "@/lib/stripe"

/**
 * POST /api/stripe/checkout
 * Create a Stripe Checkout session for subscription with optional coupon
 */
export async function POST(request: NextRequest) {
  try {
    const { priceId, coupon } = await request.json()

    if (!priceId) {
      console.error("Checkout error: Missing priceId")
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      )
    }

    console.log("Creating checkout for priceId:", priceId, "coupon:", coupon || "none")

    // Validate coupon if provided
    let promotionCode: string | undefined
    if (coupon) {
      const validation = await validatePromotionCode(coupon)
      if (!validation.valid) {
        console.error("Checkout error: Invalid coupon", validation.error)
        return NextResponse.json(
          { error: validation.error || "Invalid coupon code" },
          { status: 400 }
        )
      }
      console.log("✅ Coupon validated:", coupon, "→ Stripe ID:", validation.couponId)
      promotionCode = validation.couponId
    }

    // Get current user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.error("Checkout error: No authenticated user")
      return NextResponse.json(
        { error: "Authentication required. Please sign in." },
        { status: 401 }
      )
    }

    console.log("User authenticated:", user.id, user.email)

    // Create checkout session with promotion code
    const session = await createCheckoutSession({
      priceId,
      userId: user.id,
      userEmail: user.email!,
      promotionCode,
    })

    console.log("Checkout session created:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Checkout error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to create checkout session"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
