/**
 * Email Preview Variants
 *
 * This file contains preview versions of email templates with sample data.
 * Run `npm run email:dev` to start the preview server and see these in action.
 *
 * Each exported function appears as a separate preview in the sidebar.
 */

import * as React from "react"

import { OnboardingCompleteEmail } from "./OnboardingComplete"
import { PasswordResetEmail } from "./PasswordReset"
import { SubscriptionConfirmedEmail } from "./SubscriptionConfirmed"
import { WelcomeEmail } from "./Welcome"

const appUrl = "http://localhost:3000"

// ============================================
// Welcome Email Previews
// ============================================

export function WelcomeWithName() {
  return <WelcomeEmail name="Jane" dashboardUrl={`${appUrl}/dashboard`} appUrl={appUrl} />
}

export function WelcomeShortName() {
  return <WelcomeEmail name="Jo" dashboardUrl={`${appUrl}/dashboard`} appUrl={appUrl} />
}

export function WelcomeLongName() {
  return (
    <WelcomeEmail
      name="Alexandra Elizabeth Montgomery"
      dashboardUrl={`${appUrl}/dashboard`}
      appUrl={appUrl}
    />
  )
}

export function WelcomeGeneric() {
  return <WelcomeEmail dashboardUrl={`${appUrl}/dashboard`} appUrl={appUrl} />
}

// ============================================
// Subscription Confirmed Email Previews
// ============================================

export function SubscriptionPro() {
  return (
    <SubscriptionConfirmedEmail
      planName="Pro"
      settingsUrl={`${appUrl}/dashboard/settings`}
      appUrl={appUrl}
    />
  )
}

export function SubscriptionProWithName() {
  return (
    <SubscriptionConfirmedEmail
      planName="Pro"
      userName="Sarah"
      settingsUrl={`${appUrl}/dashboard/settings`}
      appUrl={appUrl}
    />
  )
}

export function SubscriptionEnterprise() {
  return (
    <SubscriptionConfirmedEmail
      planName="Enterprise"
      settingsUrl={`${appUrl}/dashboard/settings`}
      appUrl={appUrl}
    />
  )
}

export function SubscriptionStarter() {
  return (
    <SubscriptionConfirmedEmail
      planName="Starter"
      userName="Mike"
      settingsUrl={`${appUrl}/dashboard/settings`}
      appUrl={appUrl}
    />
  )
}

// ============================================
// Password Reset Email Previews
// ============================================

export function PasswordResetBasic() {
  return (
    <PasswordResetEmail
      resetLink={`${appUrl}/reset-password/token=abc123`}
      appUrl={appUrl}
    />
  )
}

export function PasswordResetWithName() {
  return (
    <PasswordResetEmail
      resetLink={`${appUrl}/reset-password/token=abc123`}
      userName="Alex"
      appUrl={appUrl}
    />
  )
}

export function PasswordResetCustomExpiry() {
  return (
    <PasswordResetEmail
      resetLink={`${appUrl}/reset-password/token=abc123`}
      userName="Sarah"
      expiryMinutes={30}
      appUrl={appUrl}
    />
  )
}

// ============================================
// Onboarding Complete Email Previews
// ============================================

export function OnboardingCompleteBasic() {
  return (
    <OnboardingCompleteEmail
      userName="Jordan"
      nextStepsUrl={`${appUrl}/dashboard`}
      appUrl={appUrl}
    />
  )
}

export function OnboardingCompleteDetailed() {
  return (
    <OnboardingCompleteEmail
      userName="Taylor"
      completedSteps={[
        "Set up your profile",
        "Connected your account",
        "Reviewed the documentation",
        "Joined the community",
        "Started your first project",
      ]}
      nextStepsUrl={`${appUrl}/dashboard`}
      appUrl={appUrl}
    />
  )
}

export function OnboardingCompleteMinimal() {
  return (
    <OnboardingCompleteEmail
      completedSteps={["Created your account"]}
      nextStepsUrl={`${appUrl}/dashboard`}
      appUrl={appUrl}
    />
  )
}

// Default export (shown first in preview UI)
export default WelcomeWithName
