import { Resend } from "resend"

import { SubscriptionConfirmedEmail } from "@/emails/SubscriptionConfirmed"
import { WelcomeEmail } from "@/emails/Welcome"

/**
 * Resend client for transactional emails
 * Lazy-loaded to avoid build-time errors
 */
let resendClient: Resend | null = null

export function getResend(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

// ============================================
// Email Types
// ============================================

type SendEmailParams = {
  to: string | string[]
  subject: string
  react: React.ReactElement
  from?: string
  replyTo?: string
}

// ============================================
// Send Email
// ============================================

export async function sendEmail({
  to,
  subject,
  react,
  from = process.env.RESEND_FROM_EMAIL || "App <noreply@example.com>",
  replyTo,
}: SendEmailParams) {
  const { data, error } = await getResend().emails.send({
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    react,
    replyTo,
  })

  if (error) {
    console.error("Error sending email:", error)
    throw new Error(error.message)
  }

  return data
}

// ============================================
// Email Templates
// ============================================

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourapp.com"

export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome!",
    react: <WelcomeEmail name={name} dashboardUrl={`${appUrl}/dashboard`} />,
  }),

  subscriptionConfirmed: (planName: string) => ({
    subject: "Subscription Confirmed",
    react: (
      <SubscriptionConfirmedEmail
        planName={planName}
        settingsUrl={`${appUrl}/dashboard/settings`}
      />
    ),
  }),
}

// Re-export templates for direct use
export { SubscriptionConfirmedEmail, WelcomeEmail }
