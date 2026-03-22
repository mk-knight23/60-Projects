# [![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)

# [![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)

# [![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)

# [![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)

# [![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)

[![CI/CD](https://github.com/mk-knight23/60-Projects/actions/workflows/ci.yml/badge.svg)](https://github.com/mk-knight23/60-Projects/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://typescriptlang.org)

# 60 Projects Ecosystem

> **I Don't Just Build Projects, I Build Products.**

A curated ecosystem of 60 real-world, production-ready projects covering AI, SaaS, web apps, games, tools, and developer utilities — demonstrating end-to-end product building with a modern tech stack.

## Live Site

**[60projects.dev](https://60projects.dev)** | **[Docs](https://60projects.dev/docs)**

## What's Included

| Category | Count | Description |
|----------|-------|-------------|
| 💼 Portfolio | 8 | Professional developer portfolio sites |
| 🌐 Web Apps | 20 | Interactive web applications |
| 🎮 Games | 10 | Browser-based games |
| 🛠️ Tools | 12 | Developer utilities |
| 🚀 Starters | 10 | Boilerplate templates |
| **Total** | **60** | Production-ready projects |

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + DaisyUI 5
- **Auth**: Supabase Auth (magic link)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (subscriptions + webhooks)
- **AI Chat**: OpenRouter + Z.AI (multi-model)
- **Email**: Resend + React Email
- **Docs**: Fumadocs MDX
- **Analytics**: Plausible
- **Deployment**: Vercel (primary), Cloudflare Pages, Firebase, Azure SWA, AWS Amplify

## Getting Started

```bash
git clone https://github.com/mk-knight23/60-Projects
cd 60-Projects
npm install
cp .env.example .env.local
# Fill in your .env.local values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for all required variables:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase project
- `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` — Stripe billing
- `OPENROUTER_API_KEY` — AI chat (free tier available)
- `RESEND_API_KEY` — Transactional email

## Project Structure

```
├── app/              # Next.js App Router pages & API routes
│   ├── api/          # REST API (chat, stripe, auth, email)
│   ├── dashboard/    # Protected user dashboard
│   ├── docs/         # Documentation (MDX)
│   └── ...           # Public pages (home, pricing, login)
├── components/       # Shared React components
├── lib/              # Business logic (db, stripe, models, plans)
├── content/docs/     # MDX documentation source
├── supabase/         # DB schema (setup.sql)
└── emails/           # React Email templates
```

## Plans

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Project screenshots + 5 project demos via email |
| Paid | $10/mo | All 60 projects source code + docs + real use cases |

Use code **OPEN60** for 100% off.

## Development

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm test             # Run tests
npm run email:dev    # Preview email templates
```

## Deployment

This project is deployed across 5 cloud platforms per project:
- **Vercel** (primary)
- **Cloudflare Pages**
- **Firebase Hosting**
- **Azure Static Web Apps**
- **AWS Amplify**

## Security

- No hardcoded credentials — all secrets via environment variables
- Stripe webhook signature verification
- Supabase Row Level Security (RLS) on all tables
- OWASP security headers
- Dependency scanning in CI

## License

MIT — see [LICENSE](LICENSE)

---

*Part of [Kazi's Agents Army](https://github.com/mk-knight23/Kazis-Agents-Army) — built with 10 specialized AI mega-agents*
