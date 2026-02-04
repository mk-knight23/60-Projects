import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Terms of Service",
}

/**
 * Terms of Service placeholder
 * Add your terms content here
 */
export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-sm">
          <p className="text-base-content/60">
            Add your terms of service content here. This page should outline the rules 
            and guidelines for using your product.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
