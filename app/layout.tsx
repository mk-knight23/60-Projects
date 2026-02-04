import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import PlausibleProvider from "next-plausible"
import { ToastProvider } from "@/components/toast"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

/**
 * SEO metadata - edit app name and description here
 */
const appName = "60 Projects Ecosystem"
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: "I Don't Just Build Projects, I Build Products. A curated ecosystem of 60 real-world projects covering AI, SaaS, web apps, games, tools, and developer utilities—demonstrate end-to-end product building with modern tech stack.",
  keywords: ["60 projects", "AI projects", "SaaS projects", "web development", "Next.js projects", "Python projects", "production-ready apps", "full-stack projects", "developer portfolio", "coding tutorials", "real-world applications", "end-to-end development"],
  metadataBase: new URL(appUrl),
  openGraph: {
    title: appName,
    description: "I Don't Just Build Projects, I Build Products. 60 production-ready projects covering AI, SaaS, web apps, games, tools, and utilities. Build real skills with complete codebases from concept to deployment.",
    url: appUrl,
    siteName: appName,
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "60 Projects Ecosystem - I Don't Just Build Projects, I Build Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: "I Don't Just Build Projects, I Build Products. 60 production-ready projects with complete source code, deployment guides, and documentation.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'fantasy';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `,
        }}
      />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || ""}
          enabled={!!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
        >
          <ToastProvider>{children}</ToastProvider>
        </PlausibleProvider>
      </body>
    </html>
  )
}
