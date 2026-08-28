import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log("Navigating to http://127.0.0.1:5173...");
  await page.goto("http://127.0.0.1:5173", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  // 1. Hero capture
  console.log("Capturing hero...");
  await page.screenshot({ path: "videos/free-ia-integration/assets/hero.png" });

  // 2. Cockpit section
  const cockpit = page.locator('#cockpit');
  if (await cockpit.count() > 0) {
    console.log("Capturing cockpit...");
    await cockpit.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await cockpit.screenshot({ path: "videos/free-ia-integration/assets/agent-router.png" });
  }

  // 3. Pricing section
  const pricing = page.locator('#pricing');
  if (await pricing.count() > 0) {
    console.log("Capturing pricing...");
    await pricing.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await pricing.screenshot({ path: "videos/free-ia-integration/assets/pricing.png" });
  }

  // 4. FAQ section
  const faq = page.locator('#faq');
  if (await faq.count() > 0) {
    console.log("Capturing faq...");
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await faq.screenshot({ path: "videos/free-ia-integration/assets/faq-terminal.png" });
  }

  // 5. Training curriculum
  const training = page.locator('#training');
  if (await training.count() > 0) {
    console.log("Capturing training curriculum...");
    await training.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await training.screenshot({ path: "videos/free-ia-integration/assets/curriculum.png" });
  }

  console.log("All screenshots captured successfully!");
  await browser.close();
}

capture().catch(err => {
  console.error("Capture error:", err);
  process.exit(1);
});
