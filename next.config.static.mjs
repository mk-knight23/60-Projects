import { createMDX } from "fumadocs-mdx/next"

const withMDX = createMDX()

/** Static export config — used by Firebase & GitHub Pages */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: "/60-Projects",
}

export default withMDX(nextConfig)
