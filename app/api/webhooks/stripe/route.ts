import { NextRequest, NextResponse } from "next/server"
import { constructWebhookEvent, stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/server"
import type { Stripe } from "stripe"

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 * 
 * Configure webhook in Stripe Dashboard:
 * https://dashboard.stripe.com/webhooks
 * 
 * Events to enable:
 * - checkout.session.completed
 * - customer.subscription.updated
 * - customer.subscription.deleted
 */
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("❌ Webhook: Missing stripe-signature header")
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = constructWebhookEvent(body, signature)
    console.log(`✅ Webhook: Received ${event.type} event`)
  } catch (error) {
    console.error("❌ Webhook signature verification failed:", error)
    console.error("💡 Tip: Make sure STRIPE_WEBHOOK_SECRET is set in .env.local")
    console.error("💡 Get it from: https://dashboard.stripe.com/webhooks")
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  const supabase = createAdminClient()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(supabase, session)
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(supabase, subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(supabase, subscription)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}

// ============================================
// Event Handlers
// ============================================

async function handleCheckoutCompleted(
  supabase: ReturnType<typeof createAdminClient>,
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId || session.client_reference_id
  if (!userId) {
    console.error("❌ Webhook: No user ID in checkout session", { session })
    return
  }

  console.log(`🔄 Webhook: Processing checkout for user ${userId}`)

  // Get subscription details
  const stripeSubscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  ) as unknown as Stripe.Subscription & { current_period_start: number; current_period_end: number }

  // Upsert subscription in database
  const { error } = await supabase.from("subscriptions").upsert({
    user_id: userId,
    status: stripeSubscription.status,
    stripe_customer_id: session.customer as string,
    stripe_subscription_id: stripeSubscription.id,
    stripe_price_id: stripeSubscription.items.data[0].price.id,
    current_period_start: new Date(
      stripeSubscription.current_period_start * 1000
    ).toISOString(),
    current_period_end: new Date(
      stripeSubscription.current_period_end * 1000
    ).toISOString(),
    cancel_at_period_end: stripeSubscription.cancel_at_period_end,
    updated_at: new Date().toISOString(),
  })

  if (error) {
    console.error("❌ Webhook: Failed to upsert subscription:", error)
  } else {
    console.log(`✅ Webhook: Subscription created for user ${userId}`)
  }
}

async function handleSubscriptionUpdated(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription
) {
  // Type assertion for period fields (present in API response but may not be in types)
  const sub = subscription as Stripe.Subscription & {
    current_period_start: number
    current_period_end: number
  }

  console.log(`🔄 Webhook: Updating subscription ${sub.id} (status: ${sub.status})`)

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: sub.status,
      stripe_price_id: sub.items.data[0].price.id,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", sub.id)

  if (error) {
    console.error("❌ Webhook: Failed to update subscription:", error)
  } else {
    console.log(`✅ Webhook: Subscription ${sub.id} updated`)
  }
}

async function handleSubscriptionDeleted(
  supabase: ReturnType<typeof createAdminClient>,
  subscription: Stripe.Subscription
) {
  console.log(`🔄 Webhook: Canceling subscription ${subscription.id}`)

  const { error } = await supabase
    .from("subscriptions")
    .update({
      status: "canceled",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id)

  if (error) {
    console.error("❌ Webhook: Failed to cancel subscription:", error)
  } else {
    console.log(`✅ Webhook: Subscription ${subscription.id} canceled`)
  }
}
