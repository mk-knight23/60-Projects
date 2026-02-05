import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PricingContent } from "@/components/pricing-content"

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for your AI micro SaaS",
}

/**
 * Pricing page - clean, focused design with coupon support
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

        {/* Pricing Content (Client Component) */}
        <PricingContent />

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
