import { createClient } from "@/lib/supabase/server"
import type { User, Subscription, UserProfile } from "@/types"

/**
 * Common database queries for Ghoststack
 * These patterns make it easy for AI assistants to reference and extend
 */

// ============================================
// User Queries
// ============================================

export async function getUser(id: string): Promise<User | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }
  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single()

  if (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
  return data
}

export async function updateProfile(
  id: string,
  profile: Partial<UserProfile>
): Promise<User | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("users")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating profile:", error)
    return null
  }
  return data
}

// ============================================
// Subscription Queries
// ============================================

export async function getSubscription(userId: string): Promise<Subscription | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error) {
    // No subscription is not an error
    if (error.code === "PGRST116") return null
    console.error("Error fetching subscription:", error)
    return null
  }
  return data
}

export async function upsertSubscription(
  subscription: Omit<Subscription, "id" | "created_at" | "updated_at">
): Promise<Subscription | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .upsert(
      {
        ...subscription,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single()

  if (error) {
    console.error("Error upserting subscription:", error)
    return null
  }
  return data
}

// ============================================
// Auth Helpers
// ============================================

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  if (!authUser) return null

  return getUser(authUser.id)
}

export async function getCurrentUserWithSubscription(): Promise<{
  user: User
  subscription: Subscription | null
} | null> {
  const user = await getCurrentUser()
  if (!user) return null

  const subscription = await getSubscription(user.id)
  return { user, subscription }
}
