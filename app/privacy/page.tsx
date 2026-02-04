import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy",
}

/**
 * Privacy Policy placeholder
 * Add your privacy policy content here
 */
export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm">
          <p className="text-base-content/60">
            Add your privacy policy content here. This page should explain how you collect, 
            use, and protect user data.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
