"use client"

import { useEffect, useState } from "react"

const themes = ["light", "dark", "fantasy", "garden", "wireframe", "aqua", "winter", "nord", "silk", "cupcake", "dracula"] as const
type Theme = (typeof themes)[number]

// Theme icons mapping
const themeIcons: Record<Theme, string> = {
  light: "☀️",
  dark: "🌙",
  fantasy: "🦄",
  garden: "🌸",
  wireframe: "📐",
  aqua: "🌊",
  winter: "❄️",
  nord: "🏔️",
  silk: "🎀",
  cupcake: "🧁",
  dracula: "🧛",
}

/**
 * Theme settings card for settings page
 * Allows choosing from multiple DaisyUI themes
 */
export function ThemeSettings() {
  const [theme, setTheme] = useState<Theme>("fantasy")
  const [mounted, setMounted] = useState(false)

  // Apply theme and read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    const preferred = saved || "fantasy"
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Need to sync with localStorage on mount
    setTheme(preferred)
    setMounted(true)
  }, [])

  // Change theme
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="card bg-base-200 mb-6">
        <div className="card-body">
          <h2 className="card-title">Theme</h2>
          <div className="skeleton h-12 w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-200 mb-6">
      <div className="card-body">
        <h2 className="card-title">Theme</h2>
        <p className="text-sm text-base-content/70 mb-4">
          Choose your preferred theme. Changes are saved automatically.
        </p>

        {/* Theme Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => changeTheme(t)}
              className={`btn btn-sm flex-col gap-1 h-auto py-3 ${
                theme === t ? "btn-primary" : "btn-ghost"
              }`}
            >
              <span className="text-2xl">{themeIcons[t]}</span>
              <span className="text-xs capitalize">{t}</span>
            </button>
          ))}
        </div>

        {/* Current Theme Display */}
        <div className="mt-4 p-3 bg-base-300 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{themeIcons[theme]}</span>
            <div>
              <div className="text-sm font-semibold capitalize">{theme}</div>
              <div className="text-xs text-base-content/60">Current theme</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
