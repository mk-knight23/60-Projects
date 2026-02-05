/**
 * Audit data types for 60 Projects
 * Extracted from Final Projects Audit folder
 */

export interface ProjectAudit {
  buildStatus: "success" | "failure" | "skipped"
  buildTime?: string
  runtimeStatus: "success" | "failure" | "skipped"
  techStack: {
    packageManager: string
    framework?: string
    languages: string[]
    totalLines: number
  }
  screenshotVerified: boolean
  hasDeployment: boolean
}

export interface ProjectAuditData {
  [projectId: string]: ProjectAudit
}
