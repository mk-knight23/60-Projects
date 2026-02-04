/**
 * Centralized pricing plans configuration
 * 
 * Single source of truth for all plan data used across:
 * - app/pricing/page.tsx (pricing page)
 * - app/page.tsx (landing page pricing section)
 * - app/dashboard/settings/page.tsx (plan name display)
 * 
 * To configure:
 * 1. Create products and prices in Stripe (or use Stripe MCP)
 * 2. Update the priceId for each plan below
 * 3. Adjust names, prices, and features as needed
 */

export interface Plan {
  id: string
  name: string
  description: string
  price: number
  priceId: string | null // Stripe Price ID (e.g., "price_xxx") - null for free tier
  features: string[]
  popular?: boolean
  cta: string
  ctaLink: string
}

/**
 * All available plans
 * Update priceId values with your actual Stripe Price IDs
 */
export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "For side projects",
    price: 0,
    priceId: null, // No Stripe price for free tier
    features: [
      "100 API calls/month",
      "Basic analytics",
      "Community support",
      "1 project",
    ],
    cta: "Get Started",
    ctaLink: "/login",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing apps",
    price: 29,
    priceId: null, // TODO: Add your Stripe Price ID (e.g., "price_xxx")
    features: [
      "10,000 API calls/month",
      "Advanced analytics",
      "Priority support",
      "5 projects",
      "Custom domain",
    ],
    popular: true,
    cta: "Start Free Trial",
    ctaLink: "/login",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For scale",
    price: 99,
    priceId: null, // TODO: Add your Stripe Price ID (e.g., "price_xxx")
    features: [
      "Unlimited API calls",
      "White-label option",
      "Dedicated support",
      "Unlimited projects",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    ctaLink: "/login",
  },
]

/**
 * Get a plan by its Stripe Price ID
 */
export function getPlanByPriceId(priceId: string | null): Plan | undefined {
  if (!priceId) return plans.find(p => p.id === "free")
  return plans.find(p => p.priceId === priceId)
}

/**
 * Get plan name from Stripe Price ID (for display in settings)
 */
export function getPlanName(priceId: string | null): string {
  const plan = getPlanByPriceId(priceId)
  return plan?.name ?? "Pro" // Default to Pro if unknown price ID
}

/**
 * Get a plan by its ID
 */
export function getPlanById(id: string): Plan | undefined {
  return plans.find(p => p.id === id)
}

/**
 * Get all paid plans (excludes free tier)
 */
export function getPaidPlans(): Plan[] {
  return plans.filter(p => p.price > 0)
}
