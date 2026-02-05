"use client"

import { useEffect, useState } from "react"

type Theme = "fantasy" | "dracula"

/**
 * Theme toggle button - switches between fantasy (light) and dracula (dark)
 * Stores preference in localStorage
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("fantasy")
  const [mounted, setMounted] = useState(false)

  // Apply theme and read from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    const preferred = saved || "fantasy"
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Need to sync with localStorage on mount
    setTheme(preferred)
    document.documentElement.setAttribute("data-theme", preferred)
    setMounted(true)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme: Theme = theme === "fantasy" ? "dracula" : "fantasy"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="btn btn-ghost btn-sm btn-square" aria-label="Toggle theme">
        <span className="loading loading-spinner loading-sm" />
      </button>
    )
  }

  const isDark = theme === "dracula"

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm btn-square"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        // Sun icon for dark mode
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for light mode
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  )
}
