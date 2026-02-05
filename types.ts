/**
 * Shared types for Ghoststack
 * Add your own types as needed - this is just the foundation
 */

// ============================================
// User Types
// ============================================

export type User = {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export type UserProfile = Pick<User, "id" | "name" | "avatar_url">

// ============================================
// Subscription Types
// ============================================

export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing" | "incomplete"

export type Subscription = {
  id: string
  user_id: string
  status: SubscriptionStatus
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  stripe_price_id: string | null
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  created_at: string
  updated_at: string
}

// ============================================
// API Response Types
// ============================================

export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

export type ApiError = {
  message: string
  code?: string
}

// ============================================
// Database Types (Supabase)
// ============================================

// For full type safety, generate types from your Supabase schema:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
// Then import and use: createClient<Database>()
