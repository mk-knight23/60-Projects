/**
 * Shared email styles
 *
 * Email clients require inline styles - they don't support external CSS.
 * These styles are used across all email templates for consistency.
 *
 * 60 Projects Ecosystem - Fantasy Theme Colors:
 * Primary: #d946ef (fuchsia/pink)
 * Primary Focus: #c026d3
 * Base Background: #faf5ff (light purple tint)
 * Base Content: #1a1a1a
 */

export const styles = {
  main: {
    backgroundColor: "#faf5ff",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "600px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600" as const,
    margin: "0 0 20px",
  },
  subheading: {
    color: "#1a1a1a",
    fontSize: "18px",
    fontWeight: "600" as const,
    margin: "0 0 12px",
  },
  text: {
    color: "#4a4a4a",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 0 16px",
  },
  button: {
    backgroundColor: "#d946ef",
    borderRadius: "8px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "600" as const,
    padding: "14px 28px",
    textDecoration: "none",
  },
  footer: {
    color: "#999999",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "32px 0 0",
  },
  hr: {
    border: "none",
    borderTop: "1px solid #e5e5e5",
    margin: "24px 0",
  },
}
