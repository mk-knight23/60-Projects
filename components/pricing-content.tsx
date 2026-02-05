"use client"

import { useState } from "react"
import { SubscribeButton } from "@/components/subscribe-button"
import { plans, type Plan } from "@/lib/plans"

export function PricingContent() {
  const [coupon, setCoupon] = useState("")
  const [showCouponInput, setShowCouponInput] = useState(false)

  return (
    <>
      {/* Coupon Section */}
      <section className="py-10 px-4 bg-gradient-to-b from-primary/10 to-primary/5">
        <div className="container mx-auto max-w-3xl text-center">
          {/* Special Offer Banner */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg">
              <span className="text-xl">🎁</span>
              <span className="text-white font-bold">Special Offer: 100% OFF All Plans!</span>
              <span className="badge badge-secondary text-white">OPEN60</span>
            </div>
          </div>

          {/* Coupon Card */}
          <div className="card bg-base-100 shadow-xl border-2 border-primary/30">
            <div className="card-body p-8">
              <h3 className="text-xl font-bold mb-3 flex items-center justify-center gap-2">
                <span className="text-3xl">🎉</span>
                Have a coupon code?
              </h3>
              <p className="text-base text-base-content/70 mb-6">
                Enter your coupon code below to apply your discount at checkout
              </p>

              {/* Quick Apply Button */}
              {!coupon && (
                <div className="mb-6 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/30">
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="text-left">
                      <p className="font-bold text-success text-lg">🔥 OPEN60</p>
                      <p className="text-sm text-base-content/60">100% off - Limited time offer</p>
                    </div>
                    <button
                      onClick={() => {
                        setCoupon("OPEN60")
                        setShowCouponInput(false)
                      }}
                      className="btn btn-success btn-lg"
                    >
                      Apply OPEN60
                    </button>
                  </div>
                </div>
              )}

              {/* Manual Input */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-sm text-base-content/60">or enter another code:</span>
                {!showCouponInput && !coupon && (
                  <button
                    onClick={() => setShowCouponInput(true)}
                    className="btn btn-outline btn-sm"
                  >
                    Enter Code
                  </button>
                )}
              </div>

              {showCouponInput && (
                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    className={`input input-bordered flex-1 ${coupon.length > 0 ? "input-primary" : ""}`}
                  />
                  <button
                    onClick={() => {
                      setShowCouponInput(false)
                      setCoupon("")
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    Clear
                  </button>
                </div>
              )}

              {coupon && (
                <div className="mt-4 p-4 bg-success/10 rounded-xl border-2 border-success/30 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div className="text-left">
                      <p className="text-success font-bold text-lg">
                        Coupon "{coupon}" Applied!
                      </p>
                      <p className="text-sm text-success/80">
                        100% discount will be applied at checkout
                      </p>
                    </div>
                    <button
                      onClick={() => setCoupon("")}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="Remove coupon"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} coupon={coupon} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function PricingCard({ plan, coupon }: { plan: Plan; coupon: string }) {
  return (
    <div
      className={`rounded-2xl p-8 ${plan.popular
          ? "border-2 border-primary bg-base-100 relative"
          : "border border-base-300 bg-base-100"
        }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge badge-primary">Most Popular</span>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
        <p className="text-sm text-base-content/60">{plan.description}</p>
      </div>
      <div className="mb-6">
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-base-content/60">/month</span>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <PricingFeature key={i}>{feature}</PricingFeature>
        ))}
      </ul>
      {plan.priceId ? (
        <SubscribeButton
          priceId={plan.priceId}
          coupon={coupon}
          className={`btn w-full ${plan.popular ? "btn-primary" : "btn-outline"}`}
        >
          {plan.cta}
        </SubscribeButton>
      ) : (
        <a
          href={plan.ctaLink}
          className={`btn w-full ${plan.popular ? "btn-primary" : "btn-outline"}`}
        >
          {plan.cta}
        </a>
      )}
    </div>
  )
}

function PricingFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <svg className="w-4 h-4 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="text-base-content/80">{children}</span>
    </li>
  )
}
