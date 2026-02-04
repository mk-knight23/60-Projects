# Ghoststack - AI Agent Context

Next.js 16 AI micro SaaS boilerplate.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run email:dev        # Email preview server (http://localhost:3001)
```

**Environment Setup:**

```bash
cp .env.example .env.local   # Create local environment file
# Add API keys for: Supabase, Stripe, Resend, OpenRouter
```

## Design Philosophy

**Self-contained components over configuration indirection.**

Optimize for "local understanding" and low context load:

- **Inline over imported**: Nav in `header.tsx`, auth config in `proxy.ts`
- **Flat over nested**: No route groups, no deep hierarchies
- **Explicit over magic**: Clear code paths, no reflection or hidden globals
- **Local by default**: Abstract only when stable, duplicate until patterns emerge
- **Don't trace**: If asked to change X, look at X first
- **Server-first**: Default to server components, use `"use client"` only when needed
- **Type safety**: Use proper types, never `any`. Run `npx supabase gen types typescript` for full type safety

## MCP Tools

**Use MCP servers when available** to interact with third-party services instead of manual API calls or dashboard navigation:


| Service  | MCP Server | Use for                                       |
| -------- | ---------- | --------------------------------------------- |
| Supabase | `supabase` | Database queries, auth management, migrations |
| Stripe   | `stripe`   | Create products, prices, check subscriptions  |
| Render   | `render`   | Deploy, check logs, manage services           |


MCPs provide direct tool access — faster and less error-prone than navigating dashboards or writing boilerplate API code. See `.cursor/mcp.example.json` and `.mcp.example.json` for pre-configured MCP server templates.

## Safe to Edit (Vibe-code freely)

These are "edit surfaces" — change them without worry:


| File                              | What it controls                          |
| --------------------------------- | ----------------------------------------- |
| `app/page.tsx`                    | Landing page content                      |
| `app/pricing/page.tsx`            | Pricing page layout                       |
| `app/privacy/page.tsx`            | Privacy policy                            |
| `app/terms/page.tsx`              | Terms of service                          |
| `components/header.tsx`           | Navigation links                          |
| `components/footer.tsx`           | Footer links                              |
| `app/layout.tsx`                  | SEO metadata, app name                    |
| `app/globals.css`                 | Theme configuration                       |
| `app/dashboard/page.tsx`          | Dashboard UI                              |
| `app/dashboard/settings/page.tsx` | Settings UI                               |
| `lib/plans.ts`                    | Pricing tiers, features, Stripe price IDs |
| `emails/*`                        | Email templates and styles                |


## Sharp Edges (Edit carefully)

These are "core surfaces" — changes can break things:


| File                               | Why it's sensitive                               |
| ---------------------------------- | ------------------------------------------------ |
| `proxy.ts`                         | Auth middleware, protects routes (Next.js 16)    |
| `lib/supabase/*`                   | Auth session handling                            |
| `lib/stripe.ts`                    | Payment logic                                    |
| `app/api/webhooks/stripe/route.ts` | Processes payments, must match Stripe events     |
| `app/api/stripe/checkout/route.ts` | Creates Stripe checkout sessions                 |
| `app/api/stripe/portal/route.ts`   | Customer billing portal                          |
| `app/api/auth/*`                   | Auth flows                                       |
| `app/api/email/send/route.ts`      | Transactional email sending                      |
| Database schema                    | Set up via Supabase MCP (see docs/core/database) |
| `types.ts`                         | Shared types (changes cascade)                   |


## Tech Stack

- **Framework**: Next.js 16 (App Router), TypeScript
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Auth**: Supabase (magic links)
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe subscriptions
- **Email**: Resend
- **AI**: OpenRouter (100+ LLM models)

## Supabase Client Architecture

Three separate clients for different contexts — using the wrong one causes auth failures or security issues:


| Client      | File                                             | Use For                                             |
| ----------- | ------------------------------------------------ | --------------------------------------------------- |
| **Browser** | `lib/supabase/client.ts`                         | Client-side auth (sign in/out). `"use client"` only |
| **Server**  | `lib/supabase/server.ts` → `createClient()`      | Server components, API routes. Respects RLS         |
| **Admin**   | `lib/supabase/server.ts` → `createAdminClient()` | Webhooks only. **Bypasses RLS**                     |


## Authentication Flow

**Magic Link (Passwordless):**

1. User enters email → `signInWithOtp()` sends magic link
2. User clicks link → redirects to `/callback`
3. Callback confirms session → redirects to dashboard
4. Middleware (`proxy.ts`) protects routes via `protectedRoutes` array

## Payment & Subscription Flow


| Step         | Endpoint               | What Happens                                        |
| ------------ | ---------------------- | --------------------------------------------------- |
| **Checkout** | `/api/stripe/checkout` | Creates Stripe session with user ID metadata        |
| **Webhook**  | `/api/webhooks/stripe` | Receives events, uses **admin client** to update DB |
| **Portal**   | `/api/stripe/portal`   | Creates billing portal for subscription management  |


**Webhook events handled:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Plans Configuration

All pricing data lives in `lib/plans.ts` — the single source of truth for:


| Consumer                          | What it uses                           |
| --------------------------------- | -------------------------------------- |
| `app/pricing/page.tsx`            | Plan names, prices, features, CTAs     |
| `app/page.tsx`                    | Landing page pricing section           |
| `app/dashboard/settings/page.tsx` | Plan name display from Stripe price ID |


**To configure plans:**

1. Create products/prices in Stripe (or use Stripe MCP)
2. Update `priceId` values in `lib/plans.ts` with your Stripe Price IDs
3. Adjust names, prices, features as needed

```typescript
// lib/plans.ts exports
plans              // Array of all plans
getPlanName(id)    // Get plan name from Stripe price ID
getPlanByPriceId() // Get full plan object from price ID
getPaidPlans()     // Get plans with price > 0
```

## Database Schema


| Table           | Columns                                                                      | Notes              |
| --------------- | ---------------------------------------------------------------------------- | ------------------ |
| `users`         | id, email, name, avatar_url                                                  | User profiles      |
| `subscriptions` | status, stripe_customer_id, stripe_subscription_id, current_period_start/end | Subscription state |


Both tables use RLS to restrict access to own data.

## Database Query Patterns

All queries go through `lib/supabase/db.ts`:


| Function                           | Purpose                                    |
| ---------------------------------- | ------------------------------------------ |
| `getCurrentUser()`                 | Get authenticated user                     |
| `getCurrentUserWithSubscription()` | User + subscription in one query           |
| `getSubscription(userId)`          | Get user's subscription                    |
| `upsertSubscription(subscription)` | Create/update subscription (webhooks only) |
| `updateProfile(id, profile)`       | Update user name/avatar                    |


**Error handling:** Functions return `null` on error (no exceptions). Always check for `null`.

## DaisyUI Reference

For accurate DaisyUI code generation, reference the official docs:

```
@web https://daisyui.com/llms.txt
```

Add this to prompts when working on UI components, styling, or theming. This provides the AI with up-to-date component syntax and available classes.

## Structure

```
app/
├── layout.tsx            # SEO metadata, app name
├── globals.css           # Theme
├── page.tsx              # Landing page (SAFE)
├── error.tsx             # Error boundary
├── login/page.tsx        # Auth UI
├── callback/page.tsx     # Auth callback
├── dashboard/
│   ├── page.tsx          # Dashboard (SAFE)
│   └── settings/page.tsx # Settings (SAFE)
├── pricing/page.tsx      # Pricing (SAFE)
├── privacy/page.tsx      # Privacy (SAFE)
├── terms/page.tsx        # Terms (SAFE)
└── api/
    ├── auth/signout/     # Sign out
    ├── stripe/
    │   ├── checkout/     # Create checkout
    │   ├── portal/       # Customer portal
    │   └── webhook/      # Stripe events
    └── email/send/       # Send emails

components/
├── header.tsx            # Nav (SAFE)
├── footer.tsx            # Footer (SAFE)
└── toast.tsx             # Notifications

emails/                   # Email templates (SAFE)
├── styles.ts             # Shared email styles
├── Welcome.tsx           # Welcome email template
├── SubscriptionConfirmed.tsx  # Subscription confirmation
└── preview.tsx           # Preview variants for local dev

lib/
├── supabase/             # Supabase (CAREFUL)
│   ├── client.ts         # Browser client
│   ├── server.ts         # Server client
│   └── db.ts             # Database queries
├── plans.ts              # Pricing config (SAFE)
├── stripe.ts             # Payments (CAREFUL)
├── resend.tsx            # Email sending (imports from emails/)
└── openrouter.ts         # AI/LLM

proxy.ts                  # Auth middleware (CAREFUL)
types.ts                  # Shared types
```

## Where to Edit


| Change                     | File                    |
| -------------------------- | ----------------------- |
| Landing page               | `app/page.tsx`          |
| Navigation                 | `components/header.tsx` |
| Footer                     | `components/footer.tsx` |
| Theme                      | `app/globals.css`       |
| SEO / App name             | `app/layout.tsx`        |
| Pricing tiers / Stripe IDs | `lib/plans.ts`          |
| Auth redirects             | `proxy.ts`              |
| Protected routes           | `proxy.ts`              |


## Next.js 16 Critical Patterns

### Async APIs — ALWAYS use await

```typescript
// ❌ WRONG
const headersList = headers()
const cookieStore = cookies()
const { id } = params
const supabase = createClient()

// ✅ CORRECT
const headersList = await headers()
const cookieStore = await cookies()
const { id } = await params
const supabase = await createClient()
```

### Dynamic route params are Promises

```typescript
// ❌ WRONG
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id
}

// ✅ CORRECT
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

### Server vs Client Components

**Use Server Components (default) when:**

- Fetching data from database/API
- Checking authentication
- Generating metadata
- Static content

**Use Client Components (`"use client"`) when:**

- Handling clicks, form inputs, state
- Using `useState`, `useEffect`
- Using browser APIs
- Real-time features

## Styling

Use DaisyUI classes only. No custom Tailwind colors.

```tsx
// ✅ Good
<button className="btn btn-primary">Click</button>
<div className="card bg-base-200">Content</div>

// ❌ Bad
<button className="bg-blue-500">Click</button>
```

**Components**: `btn`, `card`, `navbar`, `alert`, `badge`, `modal`, `dropdown`, `input`

**Colors**: `base-100`, `base-200`, `base-content`, `primary`, `secondary`, `accent`, `success`, `error`

## Do Not

- Don't use `any` type — use proper TypeScript types
- Don't forget `await` on `params`, `headers()`, `cookies()`, `createClient()`
- Don't use `"use client"` unless you need interactivity
- Don't use Tailwind colors like `bg-blue-500` — use DaisyUI
- Don't hardcode URLs — use `process.env.NEXT_PUBLIC_*`
- Don't skip error handling in async operations
- Don't expose `SUPABASE_SERVICE_ROLE_KEY` or `STRIPE_SECRET_KEY` to client
- Don't use wrong Supabase client (browser vs server vs admin)
- Don't create route groups or complex nesting — keep flat structure

## Patterns

### New page

```tsx
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Content */}
      </main>
      <Footer />
    </div>
  )
}
```

### Protected page

```tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")
  return <div>Protected</div>
}
```

### API route

```typescript
import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const body = await request.json()
    
    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }
    
    // Process...
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
```

### Client component with state

```tsx
"use client"
import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
```

### Call your API from client

```tsx
"use client"
import { useState } from "react"

export default function SaveButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/your-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: "value" }),
      })
      if (!res.ok) throw new Error("Failed")
      const data = await res.json()
      // Handle success
    } catch (error) {
      console.error(error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
      {isLoading && <span className="loading loading-spinner loading-sm" />}
      Save
    </button>
  )
}
```

### Call external API (server-side utility)

Create utilities in `lib/` for external APIs. Keep API keys server-side only.

```typescript
// lib/weather.ts (example)
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

export async function getWeather(city: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`
  )
  if (!res.ok) throw new Error("Weather API failed")
  return res.json()
}
```

Then call from API route or server component:

```typescript
// app/api/weather/route.ts
import { getWeather } from "@/lib/weather"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city")
  if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 })
  }
  try {
    const data = await getWeather(city)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 })
  }
}
```

### Send email

```typescript
import { sendEmail, emailTemplates } from "@/lib/resend"

// Send using a template
const template = emailTemplates.welcome(name)
await sendEmail({ to: email, ...template })
```

### Create email template

1. Create template in `emails/YourTemplate.tsx`:

```tsx
import { Body, Container, Head, Html, Preview, Text } from "@react-email/components"
import { styles } from "./styles"

interface YourTemplateProps {
  name: string
}

export function YourTemplate({ name }: YourTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Preview text shown in inbox</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Text style={styles.text}>Hello {name}!</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default YourTemplate
```

2. Add to `lib/resend.tsx`:

```typescript
import { YourTemplate } from "@/emails/YourTemplate"

export const emailTemplates = {
  // ... existing templates
  yourTemplate: (name: string) => ({
    subject: "Your Subject",
    react: <YourTemplate name={name} />,
  }),
}
```

3. Add preview variant to `emails/preview.tsx`:

```tsx
export function YourTemplatePreview() {
  return <YourTemplate name="Test User" />
}
```

4. Preview with `npm run email:dev` (http://localhost:3001)

### Call LLM (simple)

```typescript
import { complete, models } from "@/lib/openrouter"
const response = await complete({
  messages: [{ role: "user", content: "Hello" }],
  model: models["gpt-4o-mini"]
})
```

### Call LLM (streaming)

```typescript
import { streamComplete, models } from "@/lib/openrouter"

for await (const chunk of streamComplete({
  messages: [{ role: "user", content: "Hello" }],
  model: models["claude-3.5-sonnet"]
})) {
  process.stdout.write(chunk)
}
```

## TypeScript Conventions

### Import order

```typescript
// 1. React/Next.js
import { redirect } from "next/navigation"
import type { Metadata } from "next"

// 2. Third-party
import Stripe from "stripe"

// 3. Internal components
import { Header } from "@/components/header"

// 4. Internal libs
import { createClient } from "@/lib/supabase/server"

// 5. Types
import type { User } from "@/types"
```

### Type imports

```typescript
// Use `import type` for type-only imports
import type { User, Plan } from "@/types"
```

### Props interfaces

```typescript
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export function Button({ label, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}
```

## Debugging Tips

**Auth Issues:**

- Check middleware config in `proxy.ts`
- Verify `.env.local` has correct Supabase keys
- Ensure using correct client (browser vs server)

**Payment Issues:**

- Verify Stripe webhook endpoint configured in Stripe dashboard
- Check webhook signature verification is passing
- Ensure using admin client in webhook handler

**Database Issues:**

- Check RLS policies allow the operation
- Verify using server client (not browser) in server components
- Look for `PGRST116` errors (no rows found)

**Build Errors:**

- Ensure all Next.js 16 async APIs use `await`
- Check params are typed as `Promise<T>`
- Verify no `"use client"` in files using server-only APIs