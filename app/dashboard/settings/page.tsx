import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPlanName } from "@/lib/plans"
import type { Subscription } from "@/types"
import { ManageSubscriptionButton } from "./manage-subscription-button"
import { ThemeSettings } from "@/components/theme-settings"

export const metadata = {
  title: "Settings",
}

/**
 * User settings page
 */
export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/dashboard/settings")
  }

  // Fetch subscription (maybeSingle returns null if no row exists)
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  return (
    <div className="min-h-screen bg-base-100">
      <header className="navbar bg-base-200 border-b border-base-300">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">◆</span> 60 Projects
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link href="/dashboard" className="btn btn-ghost btn-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-base-content/70">Manage your account settings.</p>
        </div>

        {/* Profile */}
        <div className="card bg-base-200 mb-6">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={user.email || ""}
                className="input input-bordered"
                disabled
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User ID</span>
              </label>
              <input
                type="text"
                value={user.id}
                className="input input-bordered font-mono text-sm"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <ThemeSettings />

        {/* Subscription */}
        <div className="card bg-base-200 mb-6">
          <div className="card-body">
            <h2 className="card-title">Subscription</h2>
            <SubscriptionDetails subscription={subscription} />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card bg-base-200 border border-error/20">
          <div className="card-body">
            <h2 className="card-title text-error">Danger Zone</h2>
            <div className="flex flex-wrap gap-3 mt-2">
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="btn btn-outline btn-sm">
                  Sign Out
                </button>
              </form>
              <button className="btn btn-error btn-outline btn-sm">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function SubscriptionDetails({ subscription }: { subscription: Subscription | null }) {
  // No subscription = Free plan
  if (!subscription || !subscription.stripe_subscription_id) {
    return (
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="font-medium">Free Plan</p>
          <p className="text-sm text-base-content/70">Upgrade for more features</p>
        </div>
        <Link href="/pricing" className="btn btn-primary btn-sm">
          Upgrade
        </Link>
      </div>
    )
  }

  const planName = getPlanName(subscription.stripe_price_id)
  const statusInfo = getStatusInfo(subscription)

  return (
    <div className="space-y-4">
      {/* Plan & Status */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">{planName}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`badge badge-sm ${statusInfo.badgeClass}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>
        <ManageSubscriptionButton />
      </div>

      {/* Period info */}
      {subscription.current_period_end && (
        <div className="text-sm text-base-content/70">
          {subscription.cancel_at_period_end ? (
            <p>
              Access until{" "}
              <span className="font-medium text-base-content">
                {formatDate(subscription.current_period_end)}
              </span>
            </p>
          ) : (
            <p>
              Renews{" "}
              <span className="font-medium text-base-content">
                {formatDate(subscription.current_period_end)}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Warning for issues */}
      {(subscription.status === "past_due" || subscription.status === "incomplete") && (
        <div className="alert alert-warning text-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Payment issue. Please update your payment method.</span>
        </div>
      )}
    </div>
  )
}

// getPlanName is imported from @/lib/plans

function getStatusInfo(subscription: Subscription): { label: string; badgeClass: string } {
  if (subscription.cancel_at_period_end) {
    return { label: "Canceling", badgeClass: "badge-warning" }
  }

  switch (subscription.status) {
    case "active":
      return { label: "Active", badgeClass: "badge-success" }
    case "trialing":
      return { label: "Trial", badgeClass: "badge-info" }
    case "past_due":
      return { label: "Past Due", badgeClass: "badge-error" }
    case "canceled":
      return { label: "Canceled", badgeClass: "badge-neutral" }
    case "incomplete":
      return { label: "Incomplete", badgeClass: "badge-warning" }
    default:
      return { label: subscription.status, badgeClass: "badge-neutral" }
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
