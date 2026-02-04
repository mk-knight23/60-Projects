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
    id: "starter",
    name: "Starter",
    description: "Perfect for exploring",
    price: 0,
    priceId: null, // No Stripe price for free tier
    features: [
      "Access to 10 projects",
      "Basic documentation",
      "Community support",
      "Code downloads",
      "Individual use",
    ],
    cta: "Get Started",
    ctaLink: "/login",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For serious builders",
    price: 49,
    priceId: null, // TODO: Add your Stripe Price ID (e.g., "price_xxx")
    features: [
      "Access to all 60 projects",
      "Complete source code",
      "Step-by-step tutorials",
      "Deployment guides",
      "Priority support",
      "Lifetime updates",
      "Commercial license",
    ],
    popular: true,
    cta: "Get Full Access",
    ctaLink: "/pricing",
  },
  {
    id: "team",
    name: "Team",
    description: "For startups & teams",
    price: 199,
    priceId: null, // TODO: Add your Stripe Price ID (e.g., "price_xxx")
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team collaboration tools",
      "Custom integrations",
      "Dedicated support",
      "Office hours (monthly)",
      "Team license",
    ],
    cta: "Contact Sales",
    ctaLink: "/login",
  },
]

/**
 * Get a plan by its Stripe Price ID
 */
export function getPlanByPriceId(priceId: string | null): Plan | undefined {
  if (!priceId) return plans.find(p => p.id === "starter")
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
