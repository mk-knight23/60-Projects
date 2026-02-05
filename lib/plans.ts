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
 * All available plans for 60 Projects Ecosystem
 * Update priceId values with your actual Stripe Price IDs
 */
export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Project Screenshot",
    price: 0,
    priceId: "price_1SxGjP5ZGtnsiZyYQ6hVjN08",
    features: [
      "Get Demo",
      "5 Projects on mail",
    ],
    cta: "Get Started",
    ctaLink: "/login",
  },
  {
    id: "paid",
    name: "Paid",
    description: "All 60 Projects",
    price: 10,
    priceId: "price_1SxGjT5ZGtnsiZyYmq1U8DSy",
    features: [
      "All 60 Projects Code",
      "Docs on Use",
      "Real Life use case",
    ],
    popular: true,
    cta: "Subscribe Now",
    ctaLink: "/dashboard",
  },
]

/**
 * Get a plan by its Stripe Price ID
 */
export function getPlanByPriceId(priceId: string | null): Plan | undefined {
  if (!priceId) return plans.find(p => p.price === 0)
  return plans.find(p => p.priceId === priceId)
}

/**
 * Get plan name from Stripe Price ID (for display in settings)
 */
export function getPlanName(priceId: string | null): string {
  const plan = getPlanByPriceId(priceId)
  return plan?.name ?? "Free" // Default to Free if unknown price ID
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
