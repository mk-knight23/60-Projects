/**
 * Project Showcase Section Component
 * Displays all 60 projects organized by category with filtering and grid layout
 * Reuses existing DaisyUI styles for consistency with the app
 */

"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { categoryInfo, categoryKeys, type CategoryKey, getProjectsByCategory } from "@/lib/projects-data"

export function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("portfolio")

  const projects = getProjectsByCategory(activeCategory)
  const info = categoryInfo[activeCategory]

  return (
    <section id="showcase" className="py-24 lg:py-32 bg-base-200/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="badge badge-primary badge-outline mb-4">Project Showcase</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Explore All 60 Projects
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            From portfolio sites to games, tools, and starter templates—browse the complete collection of production-ready projects
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categoryKeys.map((key) => {
            const catInfo = categoryInfo[key]
            const isActive = activeCategory === key

            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`btn gap-2 ${isActive ? "btn-primary" : "btn-ghost"}`}
              >
                <span className="text-lg">{catInfo.emoji}</span>
                <span className="hidden sm:inline">{catInfo.title}</span>
                <span className={`badge badge-sm ${isActive ? "badge-primary-content" : ""}`}>
                  {catInfo.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Category Info */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">
            {info.emoji} {info.title}
          </h3>
          <p className="text-base-content/60">{info.subtitle}</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Category Summary Stats */}
        <div className="mt-16 p-8 bg-base-100 rounded-2xl border border-base-content/5">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {categoryKeys.map((key) => {
              const catInfo = categoryInfo[key]
              const isActive = activeCategory === key

              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`p-4 rounded-xl transition-all ${
                    isActive
                      ? "bg-primary text-primary-content scale-105"
                      : "bg-base-200 hover:bg-base-300"
                  }`}
                >
                  <div className="text-3xl mb-2">{catInfo.emoji}</div>
                  <div className={`font-bold ${isActive ? "" : "text-base-content"}`}>
                    {catInfo.count}
                  </div>
                  <div className={`text-xs ${isActive ? "text-primary-content/70" : "text-base-content/60"}`}>
                    {catInfo.title}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Total Count */}
          <div className="text-center mt-8 pt-8 border-t border-base-content/10">
            <div className="inline-flex items-center gap-3">
              <span className="text-4xl font-black text-primary">60</span>
              <span className="text-base-content/60">Production-Ready Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
