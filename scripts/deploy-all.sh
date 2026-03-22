#!/bin/bash
# Deploy to Render, Cloudflare Pages, and Railway
# Run from project root: bash scripts/deploy-all.sh

set -e
cd "$(dirname "$0")/.."

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  60 Projects — Multi-Platform Deploy Script  ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ─── CLOUDFLARE PAGES ────────────────────────────────────────────────────────
echo "▶ Cloudflare Pages"
if ! npx wrangler whoami &>/dev/null; then
  echo "  → Login required. Running: npx wrangler login"
  npx wrangler login
fi
echo "  → Deploying public/ to Cloudflare Pages..."
npx wrangler pages deploy public \
  --project-name 60-projects-ecosystem \
  --branch main \
  --commit-message "Deploy from deploy-all.sh"
echo "  ✅ Cloudflare Pages deployed"
echo ""

# ─── RENDER ──────────────────────────────────────────────────────────────────
echo "▶ Render"
if ! render whoami &>/dev/null; then
  echo "  → Login required. Running: render login"
  render login
fi
echo "  → Deploying via render.yaml blueprint..."
render blueprint launch --yes 2>/dev/null || \
  render deploy --yes 2>/dev/null || \
  echo "  ℹ  Render: connect repo at https://dashboard.render.com → New → Blueprint"
echo ""

# ─── RAILWAY ─────────────────────────────────────────────────────────────────
echo "▶ Railway"
if ! railway whoami &>/dev/null; then
  echo "  → Login required. Running: railway login"
  railway login
fi
# Link or create project
if [ ! -f ".railway/config.json" ]; then
  echo "  → Creating Railway project..."
  railway init --name 60-projects-ecosystem
fi
echo "  → Deploying to Railway..."
railway up --detach
echo "  ✅ Railway deployment triggered"
echo ""

echo "╔══════════════════════════════════════════════╗"
echo "║              All platforms deployed!         ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "  Cloudflare: https://60-projects-ecosystem.pages.dev"
echo "  Render:     https://60-projects-ecosystem.onrender.com"
echo "  Railway:    check dashboard.railway.app"
