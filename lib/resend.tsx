import { Resend } from "resend"

import { OnboardingCompleteEmail } from "@/emails/OnboardingComplete"
import { PasswordResetEmail } from "@/emails/PasswordReset"
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
  welcome: (name: string = "there") => ({
    subject: "Welcome to 60 Projects Ecosystem 🚀",
    react: (
      <WelcomeEmail name={name} dashboardUrl={`${appUrl}/dashboard`} appUrl={appUrl} />
    ),
  }),

  subscriptionConfirmed: (planName: string, userName?: string) => ({
    subject: `Your ${planName} subscription is active 🎉`,
    react: (
      <SubscriptionConfirmedEmail
        planName={planName}
        userName={userName}
        settingsUrl={`${appUrl}/dashboard/settings`}
        appUrl={appUrl}
      />
    ),
  }),

  passwordReset: (resetLink: string, userName?: string) => ({
    subject: "Reset your password",
    react: (
      <PasswordResetEmail
        resetLink={resetLink}
        userName={userName}
        appUrl={appUrl}
      />
    ),
  }),

  onboardingComplete: (userName?: string, completedSteps?: string[]) => ({
    subject: "You're all set up! 🎉",
    react: (
      <OnboardingCompleteEmail
        userName={userName}
        completedSteps={completedSteps}
        nextStepsUrl={`${appUrl}/dashboard`}
        appUrl={appUrl}
      />
    ),
  }),
}

// Re-export templates for direct use
export {
  OnboardingCompleteEmail,
  PasswordResetEmail,
  SubscriptionConfirmedEmail,
  WelcomeEmail,
}
