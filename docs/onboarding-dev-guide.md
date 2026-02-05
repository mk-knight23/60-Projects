# Onboarding Developer Guide

Quick reference for working with the onboarding system.

## Database Query Examples

### Check if user completed onboarding
```typescript
import { hasCompletedOnboarding } from "@/lib/supabase/db"

const completed = await hasCompletedOnboarding(userId)
if (!completed) {
  // Redirect to onboarding
}
```

### Mark onboarding as complete
```typescript
import { completeOnboarding } from "@/lib/supabase/db"

await completeOnboarding(userId)
```

### Save onboarding data
```typescript
import { saveOnboardingData } from "@/lib/supabase/db"

await saveOnboardingData(userId, {
  name: "John Doe",
  interests: ["web", "ai"],
  project_preferences: ["beginner"]
})
```

## Route Protection

### Redirect to onboarding if not completed
The middleware in `proxy.ts` handles this automatically for dashboard routes.

### Manually check in a component
```typescript
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function useOnboardingCheck() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)

  useEffect(() => {
    const checkOnboarding = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("users")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single()

      setNeedsOnboarding(!data?.onboarding_completed)
      setLoading(false)
    }

    checkOnboarding()
  }, [])

  return { loading, needsOnboarding }
}
```

## Email Templates

### Send onboarding complete email
```typescript
import { sendEmail, emailTemplates } from "@/lib/resend"

const template = emailTemplates.onboardingComplete("John", [
  "Set up your profile",
  "Selected your interests",
  "Customized your preferences"
])

await sendEmail({
  to: "user@example.com",
  ...template
})
```

## Manual Database Testing

### Set onboarding as incomplete (for testing)
```sql
UPDATE public.users
SET onboarding_completed = FALSE
WHERE email = 'test@example.com';
```

### Set onboarding as complete
```sql
UPDATE public.users
SET onboarding_completed = TRUE
WHERE email = 'test@example.com';
```

### Check all users needing onboarding
```sql
SELECT email, created_at
FROM public.users
WHERE onboarding_completed = FALSE
ORDER BY created_at DESC;
```

### Update user name during onboarding
```sql
UPDATE public.users
SET name = 'John Doe',
    updated_at = NOW()
WHERE id = 'user-uuid';
```

## Component Usage

### Add "Complete Onboarding" button to settings
```typescript
"use client"

import { completeOnboarding } from "@/lib/supabase/db"
import { useRouter } from "next/navigation"

export function ResetOnboardingButton() {
  const router = useRouter()

  const handleReset = async () => {
    await completeOnboarding(userId)
    router.push("/onboarding")
  }

  return (
    <button onClick={handleReset} className="btn btn-ghost">
      Retake Onboarding
    </button>
  )
}
```

## File Locations

| Purpose | File |
|---------|------|
| Onboarding UI | `app/onboarding/page.tsx` |
| DB functions | `lib/supabase/db.ts` |
| Middleware logic | `proxy.ts` |
| Email API | `app/api/email/send/route.ts` |
| Email template | `emails/OnboardingComplete.tsx` |
| Types | `types.ts` |

## Common Tasks

### Change number of steps
Edit `app/onboarding/page.tsx`:
1. Update `type Step = 1 | 2 | 3 | 4` to add more steps
2. Add new step component
3. Update `getProgress()` calculation

### Modify interests
Edit `INTERESTS` array in `app/onboarding/page.tsx`:
```typescript
const INTERESTS = [
  { id: "web", label: "Web Development", icon: "💻" },
  // Add more...
]
```

### Add email preference storage
1. Create new table or add JSON column to users
2. Update `saveOnboardingData()` in `lib/supabase/db.ts`
3. Update onboarding completion handler in `app/onboarding/page.tsx`

### Customize redirect behavior
Edit `proxy.ts` middleware:
```typescript
// Change which routes trigger onboarding redirect
if (pathname.startsWith("/dashboard")) { // modify this condition
```

## Debugging

### Enable debug logging
```typescript
// In app/onboarding/page.tsx
useEffect(() => {
  console.log("Current step:", currentStep)
  console.log("Form data:", formData)
}, [currentStep, formData])
```

### Check RLS policies
```sql
-- Check if user can update their own record
SELECT *
FROM pg_policies
WHERE tablename = 'users';
```

### View current user state
```typescript
// In browser console
localStorage.getItem('supabase.auth.token')
```

## Performance Notes

- Onboarding page is client-side rendered
- No server components needed (small payload)
- Form state is in-memory (not persisted)
- DB queries: 2-3 per onboarding session
- Email send: async (non-blocking)

## Security Considerations

✅ **Protected**:
- Onboarding route requires authentication
- Email sending requires auth
- DB updates use RLS policies

⚠️ **Review**:
- Ensure RLS allows users to update own `onboarding_completed`
- Verify email template doesn't expose sensitive data
- Check rate limiting on email endpoint (if public)

---

**Last Updated**: 2025-02-05
