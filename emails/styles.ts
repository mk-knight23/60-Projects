/**
 * Shared email styles
 *
 * Email clients require inline styles - they don't support external CSS.
 * These styles are used across all email templates for consistency.
 *
 * To match your app's theme, update these colors:
 * 1. Go to https://daisyui.com/theme-generator/
 * 2. Select your theme and copy the color values
 * 3. Update the colors below
 */

export const styles = {
  main: {
    backgroundColor: "#f6f9fc",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "600px",
  },
  heading: {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600" as const,
    margin: "0 0 20px",
  },
  text: {
    color: "#4a4a4a",
    fontSize: "16px",
    lineHeight: "1.6",
    margin: "0 0 16px",
  },
  button: {
    backgroundColor: "#1a1a1a",
    borderRadius: "6px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "500" as const,
    padding: "12px 24px",
    textDecoration: "none",
  },
  footer: {
    color: "#999999",
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "32px 0 0",
  },
}
