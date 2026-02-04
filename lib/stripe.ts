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
}

export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
  cancelUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=canceled`,
}: CreateCheckoutParams) {
  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    client_reference_id: userId,
    mode: "subscription",
    allow_promotion_codes: true,
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
  })

  return session
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
