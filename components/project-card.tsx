/**
 * Project Card Component
 * Displays an individual project with screenshot, title, description, tech stack, and links
 * Reuses existing DaisyUI card styles for consistency
 */

import Image from "next/image"
import type { Project } from "@/lib/projects-data"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Generate screenshot path
  const screenshotPath = `/screenshots/${project.number.toString().padStart(2, "0")}.png`

  return (
    <div className="card bg-base-200 border border-base-content/10 hover:border-primary/30 transition-all hover:scale-[1.02] hover:shadow-xl overflow-hidden group">
      {/* Screenshot */}
      <figure className="relative aspect-video bg-base-300 overflow-hidden">
        <Image
          src={screenshotPath}
          alt={`${project.name} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // Handle missing screenshots gracefully
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const placeholder = target.parentElement?.querySelector('.placeholder')
            if (placeholder) {
              (placeholder as HTMLElement).style.display = "flex"
            }
          }}
        />
        {/* Fallback placeholder */}
        <div className="placeholder absolute inset-0 items-center justify-center bg-base-300 hidden">
          <div className="text-center">
            <div className="text-6xl mb-2 opacity-20">
              {project.category === "portfolio" && "💼"}
              {project.category === "web" && "🌐"}
              {project.category === "game" && "🎮"}
              {project.category === "tool" && "🛠️"}
              {project.category === "starter" && "🚀"}
            </div>
            <div className="text-base-content/40 text-sm">Screenshot unavailable</div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
          <span className="badge badge-success badge-sm gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Live
          </span>

          {/* Audit Badges */}
          {project.audit && (
            <div className="flex gap-1 mt-1">
              {project.audit.buildStatus === "success" && (
                <span className="badge badge-xs badge-success gap-1" title="Build successful">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Built
                </span>
              )}
              {project.audit.buildStatus === "failure" && (
                <span className="badge badge-xs badge-error" title="Build failed">
                  ⚠ Build
                </span>
              )}
              {project.audit.buildStatus === "pending" && (
                <span className="badge badge-xs badge-warning" title="Build pending">
                  ⏳ Pending
                </span>
              )}
              {project.audit.screenshotVerified && (
                <span className="badge badge-xs badge-info gap-1" title="Screenshot verified">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
              )}
              {project.audit.deploymentCount > 0 && (
                <span className="badge badge-xs badge-ghost" title={`Deployed to ${project.audit.deploymentCount} platform${project.audit.deploymentCount > 1 ? 's' : ''}`}>
                  🚀 {project.audit.deploymentCount}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Project Number Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="badge badge-lg bg-primary/10 text-primary border-primary/20 font-mono">
            {String(project.number).padStart(2, "0")}
          </span>
        </div>
      </figure>

      {/* Card Content */}
      <div className="card-body p-4">
        {/* Title & Role */}
        <div className="mb-2">
          <h3 className="card-title text-base font-semibold mb-1 line-clamp-1">
            {project.name}
          </h3>
          {project.role && (
            <p className="text-xs text-primary font-medium">{project.role}</p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-base-content/70 line-clamp-2 mb-3 min-h-[2.5rem]">
          {project.description}
        </p>

        {/* Audit Info */}
        {project.audit && (
          <div className="flex items-center gap-3 mb-3 text-xs text-base-content/50">
            {project.audit.linesOfCode && (
              <span className="flex items-center gap-1" title="Lines of code">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                {(project.audit.linesOfCode / 1000).toFixed(1)}k LOC
              </span>
            )}
            {project.audit.deploymentCount > 0 && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.audit.deploymentCount} platform{project.audit.deploymentCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="badge badge-sm badge-ghost text-xs font-normal"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="badge badge-sm badge-ghost text-xs font-normal">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Primary Live Link */}
        <div className="card-actions gap-2 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm flex-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </a>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm flex-1"
            title="View Repository"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>

        {/* Alternative/Fallback Links */}
        {project.altUrls && Object.keys(project.altUrls).length > 1 && (
          <div className="mt-3 pt-3 border-t border-base-content/10">
            <p className="text-xs text-base-content/50 mb-2">Alternative links:</p>
            <div className="flex flex-wrap gap-1.5">
              {project.altUrls.cloudflare && (
                <a
                  href={project.altUrls.cloudflare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="Cloudflare Pages"
                >
                  ☁️ CF
                </a>
              )}
              {project.altUrls.vercel && project.altUrls.vercel !== project.liveUrl && (
                <a
                  href={project.altUrls.vercel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="Vercel"
                >
                  ▲ Vercel
                </a>
              )}
              {project.altUrls.render && (
                <a
                  href={project.altUrls.render}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="Render"
                >
                  🚀 Render
                </a>
              )}
              {project.altUrls.firebase && (
                <a
                  href={project.altUrls.firebase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="Firebase"
                >
                  🔥 Firebase
                </a>
              )}
              {project.altUrls.azure && (
                <a
                  href={project.altUrls.azure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="Azure Static"
                >
                  🔷 Azure
                </a>
              )}
              {project.altUrls.aws && (
                <a
                  href={project.altUrls.aws}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="badge badge-sm badge-ghost hover:badge-primary cursor-pointer"
                  title="AWS Amplify"
                >
                  ☁️ AWS
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
