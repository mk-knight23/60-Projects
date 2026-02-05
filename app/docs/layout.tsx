import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { RootProvider } from "fumadocs-ui/provider/next"
import type { ReactNode } from "react"
import { source } from "@/lib/source"
import "./docs.css"

export const metadata = {
  title: {
    template: "%s | Docs",
    default: "Documentation",
  },
  description: "60 Projects Documentation - Complete guide to the 60 Projects Ecosystem",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      theme={{
        attribute: "class",
        defaultTheme: "dark",
        forcedTheme: "dark",
        disableTransitionOnChange: true,
      }}
      search={{
        enabled: false,
      }}
    >
      <DocsLayout
        tree={source.pageTree}
        nav={{
          title: (
            <span className="flex items-center gap-2 font-bold">
              <span className="text-primary">◆</span> 60 Projects
            </span>
          ),
          url: "/",
        }}
        sidebar={{
          defaultOpenLevel: 1,
        }}
      >
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
