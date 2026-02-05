"use client"

import { useEffect, useState } from "react"

const themes = ["light", "dark", "fantasy", "garden", "aqua", "winter", "nord", "silk", "dracula"] as const
type Theme = (typeof themes)[number]

// Theme icons mapping
const themeIcons: Record<Theme, string> = {
  light: "☀️",
  dark: "🌙",
  fantasy: "🦄",
  garden: "🌸",
  aqua: "🌊",
  winter: "❄️",
  nord: "🏔️",
  silk: "🎀",
  dracula: "🧛",
}

/**
 * Theme selector dropdown - allows choosing from multiple DaisyUI themes
 * Stores preference in localStorage
 */
export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>("fantasy")
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Apply theme and read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    const preferred = saved || "fantasy"
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Need to sync with localStorage on mount
    setTheme(preferred)
    document.documentElement.setAttribute("data-theme", preferred)
    setMounted(true)
  }, [])

  // Change theme
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
    setIsOpen(false)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} className="btn btn-ghost btn-sm btn-square">
          <span className="loading loading-spinner loading-sm" />
        </div>
      </div>
    )
  }

  return (
    <div className={`dropdown dropdown-end ${isOpen ? "dropdown-open" : ""}`}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{themeIcons[theme]}</span>
        <span className="hidden sm:inline capitalize">{theme}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu menu-sm bg-base-200 rounded-box z-50 w-52 p-2 shadow-lg border border-base-content/10 max-h-96 overflow-y-auto"
      >
        <li className="menu-title">
          <span className="text-xs font-semibold uppercase text-base-content/60">Choose Theme</span>
        </li>
        {themes.map((t) => (
          <li key={t}>
            <button
              onClick={() => changeTheme(t)}
              className={`${theme === t ? "active" : ""} capitalize`}
            >
              <span className="text-lg">{themeIcons[t]}</span>
              <span>{t}</span>
              {theme === t && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
