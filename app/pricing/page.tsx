import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SubscribeButton } from "@/components/subscribe-button"
import { plans } from "@/lib/plans"

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for your AI micro SaaS",
}

/**
 * Pricing page - clean, focused design
 * Plan data is centralized in lib/plans.ts
 */
export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-12 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-base-content/60">
              Start free, scale as you grow. No hidden fees.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
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
                      className={`btn w-full ${plan.popular ? "btn-primary" : "btn-outline"}`}
                    >
                      {plan.cta}
                    </SubscribeButton>
                  ) : (
                    <Link
                      href={plan.ctaLink}
                      className={`btn w-full ${plan.popular ? "btn-primary" : "btn-outline"}`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-base-200/50">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-center mb-10">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <div className="collapse collapse-arrow bg-base-100 rounded-xl">
                <input type="radio" name="faq" defaultChecked />
                <div className="collapse-title font-medium">Can I cancel anytime?</div>
                <div className="collapse-content text-base-content/70">
                  <p>Yes, you can cancel your subscription at any time. No questions asked, no cancellation fees.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-100 rounded-xl">
                <input type="radio" name="faq" />
                <div className="collapse-title font-medium">What payment methods do you accept?</div>
                <div className="collapse-content text-base-content/70">
                  <p>We accept all major credit cards through Stripe, including Visa, Mastercard, and American Express.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-100 rounded-xl">
                <input type="radio" name="faq" />
                <div className="collapse-title font-medium">Is there a free trial?</div>
                <div className="collapse-content text-base-content/70">
                  <p>Yes! All paid plans include a 14-day free trial. No credit card required to start.</p>
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-100 rounded-xl">
                <input type="radio" name="faq" />
                <div className="collapse-title font-medium">What happens when I exceed my limits?</div>
                <div className="collapse-content text-base-content/70">
                  <p>We&apos;ll notify you when you&apos;re approaching your limits. You can upgrade anytime or we&apos;ll pause your usage until the next billing cycle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
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
