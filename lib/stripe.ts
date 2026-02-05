import Stripe from "stripe"

/**
 * Stripe client for server-side operations
 * Lazy-loaded to avoid build-time errors
 */
let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    })
  }
  return stripeClient
}

// Legacy export for backward compatibility
export const stripe = {
  get checkout() { return getStripe().checkout },
  get subscriptions() { return getStripe().subscriptions },
  get billingPortal() { return getStripe().billingPortal },
  get subscriptionItems() { return getStripe().subscriptionItems },
  get webhooks() { return getStripe().webhooks },
  get coupons() { return getStripe().coupons },
  get promotionCodes() { return getStripe().promotionCodes },
}

// ============================================
// Coupon Helpers
// ============================================

export async function createCouponIfNotExists() {
  try {
    const stripe = getStripe()

    // Check if OPEN60 coupon already exists by searching in metadata
    const existingCoupons = await stripe.coupons.list({ limit: 100 })
    const open60Coupon = existingCoupons.data.find(c => c.metadata?.code === "OPEN60")

    if (open60Coupon) {
      console.log("✅ Coupon OPEN60 already exists:", open60Coupon.id)
      return { couponId: open60Coupon.id, code: "OPEN60" }
    }

    // Create 100% off coupon
    const coupon = await stripe.coupons.create({
      percent_off: 100,
      duration: "forever",
      name: "OPEN60 - 100% Off",
      metadata: {
        code: "OPEN60",
        description: "100% off for all paid plans"
      }
    })

    console.log("✅ Created coupon OPEN60:", coupon.id)
    return { couponId: coupon.id, code: "OPEN60" }
  } catch (error) {
    console.error("❌ Failed to create coupon:", error)
    throw error
  }
}

export async function validatePromotionCode(code: string) {
  try {
    const stripe = getStripe()

    // Search for coupon with matching code in metadata
    const coupons = await stripe.coupons.list({ limit: 100 })
    const coupon = coupons.data.find(c =>
      c.metadata?.code?.toLowerCase() === code.toLowerCase().trim() ||
      c.id.toLowerCase() === code.toLowerCase().trim()
    )

    if (!coupon) {
      return { valid: false, error: "Invalid coupon code" }
    }

    if (!coupon.valid) {
      return { valid: false, error: "This coupon is no longer valid" }
    }

    return { valid: true, couponId: coupon.id }
  } catch (error) {
    console.error("❌ Failed to validate coupon:", error)
    return { valid: false, error: "Failed to validate coupon" }
  }
}

// ============================================
// Checkout Session
// ============================================

type CreateCheckoutParams = {
  priceId: string
  userId: string
  userEmail: string
  successUrl?: string
  cancelUrl?: string
  promotionCode?: string
}

export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
  cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
  promotionCode,
}: CreateCheckoutParams) {
  console.log("🔄 Stripe: Creating checkout session", {
    priceId,
    userId,
    userEmail,
    successUrl,
    cancelUrl,
    promotionCode,
  })

  try {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer_email: userEmail,
      client_reference_id: userId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    }

    // Add promotion code if provided
    if (promotionCode) {
      sessionParams.discounts = [{ coupon: promotionCode }]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    console.log("✅ Stripe: Checkout session created", {
      sessionId: session.id,
      url: session.url,
    })

    return session
  } catch (error) {
    console.error("❌ Stripe: Failed to create checkout session", error)
    throw error
  }
}

// ============================================
// Customer Portal
// ============================================

export async function createPortalSession(customerId: string, returnUrl?: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return session
}

// ============================================
// Webhook Helpers
// ============================================

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}

// ============================================
// Subscription Helpers
// ============================================

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId)
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}
