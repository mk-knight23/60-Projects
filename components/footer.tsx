import Link from "next/link"

/**
 * Site footer
 * Edit links directly here - no config file to trace
 */
export function Footer() {
  return (
    <footer className="border-t border-base-200 bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <span className="text-primary">◆</span>
            <span>YourProduct</span>
            <span>•</span>
            <span>Your tagline goes here</span>
          </div>

          {/* Links - edit directly here */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-base-content/60 hover:text-base-content transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-base-content/60 hover:text-base-content transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
