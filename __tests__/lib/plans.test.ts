/**
 * Tests for lib/plans.ts
 * Pure utility functions — no I/O, no network
 */
import { plans, getPlanByPriceId, getPlanName, getPlanById, getPaidPlans } from "@/lib/plans"

describe("plans configuration", () => {
  it("should export at least one plan", () => {
    expect(plans.length).toBeGreaterThan(0)
  })

  it("should have a free plan with price 0", () => {
    const free = plans.find((p) => p.price === 0)
    expect(free).toBeDefined()
    expect(free?.id).toBe("free")
  })

  it("should have a paid plan with price > 0", () => {
    const paid = plans.find((p) => p.price > 0)
    expect(paid).toBeDefined()
  })

  it("should have required fields on every plan", () => {
    for (const plan of plans) {
      expect(plan.id).toBeTruthy()
      expect(plan.name).toBeTruthy()
      expect(plan.cta).toBeTruthy()
      expect(plan.ctaLink).toBeTruthy()
      expect(Array.isArray(plan.features)).toBe(true)
    }
  })
})

describe("getPlanByPriceId", () => {
  it("should return free plan for null priceId", () => {
    const plan = getPlanByPriceId(null)
    expect(plan?.price).toBe(0)
  })

  it("should return correct plan for a valid priceId", () => {
    const paidPlan = plans.find((p) => p.price > 0 && p.priceId)
    if (!paidPlan?.priceId) return
    const result = getPlanByPriceId(paidPlan.priceId)
    expect(result?.id).toBe(paidPlan.id)
  })

  it("should return undefined for unknown priceId", () => {
    const result = getPlanByPriceId("price_unknown_xyz")
    expect(result).toBeUndefined()
  })
})

describe("getPlanName", () => {
  it("should return 'Free' for null priceId", () => {
    expect(getPlanName(null)).toBe("Free")
  })

  it("should return plan name for valid priceId", () => {
    const paidPlan = plans.find((p) => p.price > 0 && p.priceId)
    if (!paidPlan?.priceId) return
    expect(getPlanName(paidPlan.priceId)).toBe(paidPlan.name)
  })
})

describe("getPlanById", () => {
  it("should return plan by id", () => {
    const plan = getPlanById("free")
    expect(plan?.price).toBe(0)
  })

  it("should return undefined for unknown id", () => {
    expect(getPlanById("unknown_plan")).toBeUndefined()
  })
})

describe("getPaidPlans", () => {
  it("should return only plans with price > 0", () => {
    const paid = getPaidPlans()
    expect(paid.every((p) => p.price > 0)).toBe(true)
  })

  it("should not include free plan", () => {
    const paid = getPaidPlans()
    expect(paid.find((p) => p.id === "free")).toBeUndefined()
  })
})
