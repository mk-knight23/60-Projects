import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export const metadata = {
  title: "Dashboard",
}

/**
 * Dashboard page
 * Protected - requires authentication
 */
export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login?redirect=/dashboard")
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Dashboard Header */}
      <header className="navbar bg-base-200 border-b border-base-300">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl font-bold">
            <span className="text-primary">◆</span> 60 Projects
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span>{user.email?.[0].toUpperCase()}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-base-200 rounded-box w-52"
            >
              <li className="menu-title">
                <span className="truncate">{user.email}</span>
              </li>
              <li>
                <Link href="/dashboard/settings">Settings</Link>
              </li>
              <li>
                <form action="/api/auth/signout" method="POST">
                  <button type="submit" className="w-full text-left">
                    Sign Out
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-base-content/70">
            Welcome back! Here&apos;s an overview of your account.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">API Calls</div>
            <div className="stat-value text-primary">0</div>
            <div className="stat-desc">This month</div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Plan</div>
            <div className="stat-value text-lg">Free</div>
            <div className="stat-desc">
              <Link href="/pricing" className="link link-primary">
                Upgrade
              </Link>
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box">
            <div className="stat-title">Status</div>
            <div className="stat-value text-success text-lg">Active</div>
            <div className="stat-desc">Account in good standing</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/dashboard/settings" className="btn btn-outline btn-sm">
                Account Settings
              </Link>
              <a
                href="https://github.com/your-repo/ghoststack"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                View Docs
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
