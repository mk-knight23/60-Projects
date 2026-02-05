#!/usr/bin/env node
/**
 * Capture screenshots of all 8 portfolio websites
 * Uses Playwright to visit each site and save screenshots
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PORTFOLIO_SITES = [
  { num: '01', url: 'https://01-devtools.pages.dev', name: 'DevTools Engineer' },
  { num: '02', url: 'https://02-fullstack.pages.dev', name: 'Full Stack Developer' },
  { num: '03', url: 'https://03-frontend.pages.dev', name: 'Frontend Developer' },
  { num: '04', url: 'https://04-backend.pages.dev', name: 'Backend Developer' },
  { num: '05', url: 'https://05-frontend-ai.pages.dev', name: 'Frontend AI Engineer' },
  { num: '06', url: 'https://06-senior-frontend.pages.dev', name: 'Senior Frontend Developer' },
  { num: '07', url: 'https://07-indie-saas.pages.dev', name: 'Indie SaaS Builder' },
  { num: '08', url: 'https://08-ai-automation.pages.dev', name: 'AI Automation Engineer' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'screenshots');

async function captureScreenshot(site, browser) {
  console.log(`\n📸 Capturing ${site.num} - ${site.name}...`);
  console.log(`   URL: ${site.url}`);

  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    // Navigate with timeout and wait for network idle
    await page.goto(site.url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait a bit for any animations to settle
    await page.waitForTimeout(2000);

    // Take screenshot
    const outputPath = path.join(OUTPUT_DIR, `${site.num}.png`);
    await page.screenshot({
      path: outputPath,
      fullPage: false,
      type: 'png',
    });

    const stats = fs.statSync(outputPath);
    console.log(`   ✅ Saved: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);

    await context.close();
    return { success: true, site };
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}`);
    await context.close();
    return { success: false, site, error: error.message };
  }
}

async function main() {
  console.log('🚀 Starting Portfolio Screenshot Capture\n');
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Launch browser
  const browser = await chromium.launch({ headless: true });

  const results = [];

  // Capture screenshots sequentially to avoid overwhelming the system
  for (const site of PORTFOLIO_SITES) {
    const result = await captureScreenshot(site, browser);
    results.push(result);
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\n✅ Successful: ${successful.length}/${PORTFOLIO_SITES.length}`);
  console.log(`❌ Failed: ${failed.length}/${PORTFOLIO_SITES.length}`);

  if (failed.length > 0) {
    console.log('\nFailed sites:');
    failed.forEach(f => console.log(`  - ${f.site.num}: ${f.site.name} (${f.error})`));
  }

  console.log('\n✨ Done!');
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
