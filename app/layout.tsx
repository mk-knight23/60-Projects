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
const appName = "YourApp"
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: "Your product description goes here",
  metadataBase: new URL(appUrl),
  openGraph: {
    title: appName,
    description: "Your product description goes here",
    url: appUrl,
    siteName: appName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: "Your product description goes here",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
