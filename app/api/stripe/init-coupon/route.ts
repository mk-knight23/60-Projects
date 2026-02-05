import { NextResponse } from "next/server"
import { createCouponIfNotExists } from "@/lib/stripe"

/**
 * POST /api/stripe/init-coupon
 * Initialize the OPEN60 coupon in Stripe (admin endpoint)
 * This ensures the coupon exists before users try to use it
 */
export async function POST() {
  try {
    console.log("🔄 Initializing OPEN60 coupon in Stripe...")

    const coupon = await createCouponIfNotExists()

    console.log("✅ Coupon initialized successfully")

    return NextResponse.json({
      success: true,
      message: "OPEN60 coupon initialized successfully"
    })
  } catch (error) {
    console.error("❌ Failed to initialize coupon:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to initialize coupon"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
