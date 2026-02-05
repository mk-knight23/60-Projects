#!/usr/bin/env node
/**
 * Open browser with cleared cache to verify new screenshots
 */

const { chromium } = require('playwright');

async function main() {
  console.log('🌐 Opening browser with cleared cache...');

  // Launch browser with fresh context (no cache)
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-cache', '--disk-cache-size=0']
  });

  // Create new context with no storage state (fresh session)
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 }
  });

  const page = await context.newPage();

  // Navigate to the app
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle'
  });

  console.log('✅ Page loaded - scroll down to see Portfolio section with new screenshots');
  console.log('📝 Press Ctrl+C to close browser');

  // Keep browser open
  await new Promise(() => {});
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
