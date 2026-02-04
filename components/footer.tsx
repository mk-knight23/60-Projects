import Link from "next/link"

/**
 * Multi-column footer for 60 Projects Ecosystem
 * Desktop: 4 columns | Mobile: Stacked
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = {
    product: {
      title: "Product",
      links: [
        { href: "/#features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/docs", label: "Documentation" },
      ],
    },
    company: {
      title: "Company",
      links: [
        { href: "/#about", label: "About" },
        { href: "/#blog", label: "Blog" },
        { href: "mailto:hello@60projects.com", label: "Contact" },
      ],
    },
    legal: {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  }

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://x.com/mk_knight_23",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/mk-knight23",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088.91-.08.45-.077-.296-1.088-.892-.91-1.466-.366-1.656-.545-1.656-.545-1.118-.003-1.766.055-1.766.055-.126.381-.126.862.052-1.125.656-1.125.656.656 1.138 1.766 1.125 1.125-.126.656-.545 1.125-.656 1.125-.126.381.126-.862-.052-1.125-.656C6.865 12.167 6.38 10.278 6.38 8.5c0-1.866.638-3.386 1.689-4.54.177-.172.366-.547.218-.82.282-.27-.375-.227-.875.069-1.003.162-.084.624-.61 1.343-1.343.772-.775 1.934-1.127 2.912-1.053.873-.065 1.682-.193 1.682-.193 1.08.003 2.062.08 2.062.08 1.08 1.766 1.958 3.369 1.753.504.656.547 1.07.875 1.07.893 0 .291-.004.52-.016.694-.064.289-.177.534-.524-.534-.97 0-.68.624-1.343-1.343-1.343C10.938 5.125 8.25 7.768 8.25 12.017c0 4.175 2.878 7.648 6.75 8.983.5.09.682-.217.682-.483.003-.237.008-.868.013-1.703 2.782.604 3.369 1.343 3.369 1.343.454 1.158 1.11 1.466 1.11 1.466.908.62.069.608.069.608-1.003-.07-1.531-1.032-1.531-1.032-.892-1.53-2.341-1.088-.91.08-.45.077-.296.108-.892.91-1.466.366-1.656.545-1.656.545-1.118.003-1.766-.055-1.766-.055-.126-.381-.126-.862.052-1.125.656-.656.545-1.125.656-1.125 1.138-.003 1.766-.055 1.766-.055.126.381.126.862-.052 1.125-.656.656-.545 1.125-.656 1.125-.126.381.126-.862.052-1.125.656C17.135 19.833 17.62 21.722 17.62 23.5c0 1.866-.638 3.386-1.689 4.54-.177.172-.366.547-.218.82.27.375.227.875-.069 1.003-.162.084-.624.61-1.343 1.343-.772.775-1.934 1.127-2.912 1.053-.873.065-1.682.193-1.682.193-1.08-.003-2.062-.08-2.062-.08-1.08-1.766-1.958-3.369-1.753-.504-.656-.547-1.07-.875-1.07-.893 0-.291.004-.52.016-.694.064-.289.177-.534.524-.534.97 0 .68-.624 1.343-1.343 1.343-.772.775-1.934 1.127-2.912 1.053-.873.065-1.682-.193-1.682-.193-1.08.003-2.062.08-2.062.08z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/kazi-musharraf-1373271b8",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

  return (
    <footer className="border-t border-base-content/10 bg-base-100">
      <div className="container mx-auto px-4 py-12">
        {/* Multi-column Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{footerSections.product.title}</h3>
            <ul className="space-y-2">
              {footerSections.product.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{footerSections.company.title}</h3>
            <ul className="space-y-2">
              {footerSections.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">{footerSections.legal.title}</h3>
            <ul className="space-y-2">
              {footerSections.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-base-content/60 hover:text-base-content transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-sm">Social</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm btn-square"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-content/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
            {/* Brand & Copyright */}
            <div className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              <span>60 Projects Ecosystem</span>
              <span>•</span>
              <span>© {currentYear}</span>
            </div>

            {/* Tagline */}
            <div className="text-base-content/40">
              I Don't Just Build Projects, I Build Products
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
