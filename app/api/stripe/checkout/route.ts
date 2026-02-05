import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createCheckoutSession } from "@/lib/stripe"

/**
 * POST /api/stripe/checkout
 * Create a Stripe Checkout session for subscription
 */
export async function POST(request: NextRequest) {
  try {
    const { priceId } = await request.json()

    if (!priceId) {
      console.error("Checkout error: Missing priceId")
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      )
    }

    console.log("Creating checkout for priceId:", priceId)

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

    // Create checkout session
    const session = await createCheckoutSession({
      priceId,
      userId: user.id,
      userEmail: user.email!,
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
