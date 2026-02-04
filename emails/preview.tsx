/**
 * Email Preview Variants
 *
 * This file contains preview versions of email templates with sample data.
 * Run `npm run email:dev` to start the preview server and see these in action.
 *
 * Each exported function appears as a separate preview in the sidebar.
 */

import * as React from "react"

import { SubscriptionConfirmedEmail } from "./SubscriptionConfirmed"
import { WelcomeEmail } from "./Welcome"

// ============================================
// Welcome Email Previews
// ============================================

export function WelcomeWithName() {
  return <WelcomeEmail name="Jane" dashboardUrl="https://yourapp.com/dashboard" />
}

export function WelcomeShortName() {
  return <WelcomeEmail name="Jo" dashboardUrl="https://yourapp.com/dashboard" />
}

export function WelcomeLongName() {
  return (
    <WelcomeEmail
      name="Alexandra Elizabeth Montgomery"
      dashboardUrl="https://yourapp.com/dashboard"
    />
  )
}

// ============================================
// Subscription Confirmed Email Previews
// ============================================

export function SubscriptionPro() {
  return (
    <SubscriptionConfirmedEmail
      planName="Pro"
      settingsUrl="https://yourapp.com/dashboard/settings"
    />
  )
}

export function SubscriptionEnterprise() {
  return (
    <SubscriptionConfirmedEmail
      planName="Enterprise"
      settingsUrl="https://yourapp.com/dashboard/settings"
    />
  )
}

// Default export (shown first in preview UI)
export default WelcomeWithName
