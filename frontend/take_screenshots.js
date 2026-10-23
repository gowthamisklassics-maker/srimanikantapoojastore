import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function run() {
  const outDir = path.resolve('./screenshots');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Homepage Desktop
  console.log('Capturing Home Desktop...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'home_desktop.png') });

  // 2. Homepage Mobile
  console.log('Capturing Home Mobile (390px)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'home_mobile.png') });

  // 3. Shop Page Desktop
  console.log('Capturing Shop Desktop...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'shop_desktop.png') });

  // 4. Product Details
  console.log('Capturing Product Details...');
  await page.goto('http://localhost:3000/product/5006', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'product_details.png') });

  // 5. Contact Page
  console.log('Capturing Contact Page...');
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.screenshot({ path: path.join(outDir, 'contact_page.png') });

  await browser.close();
  console.log('All screenshots saved in ./screenshots!');
}

run().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
