import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const browserPaths = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const executablePath = browserPaths.find((candidate) => fs.existsSync(candidate));

if (!executablePath) {
  throw new Error("No installed Chrome or Edge executable found.");
}

const outDir = path.resolve(".visual-check");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--disable-gpu", "--no-sandbox"],
});

const checks = [
  { name: "home-desktop", url: "http://172.18.0.158:5174/", width: 1440, height: 1100 },
  { name: "home-mobile", url: "http://172.18.0.158:5174/", width: 390, height: 1100 },
  { name: "preview-desktop", url: "http://172.18.0.158:5174/preview/amore", width: 1440, height: 1000 },
  { name: "order-mobile", url: "http://172.18.0.158:5174/order?template=ak-jol", width: 390, height: 1100 },
];

const results = [];

for (const check of checks) {
  const page = await browser.newPage({ viewport: { width: check.width, height: check.height } });
  await page.goto(check.url, { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({ path: path.join(outDir, `${check.name}.png`), fullPage: false });
  const metrics = await page.evaluate(() => ({
    bodyTextLength: document.body.innerText.length,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    buttons: Array.from(document.querySelectorAll("a, button")).map((node) => ({
      text: node.textContent.trim(),
      href: node.href || "",
      height: Math.round(node.getBoundingClientRect().height),
    })),
  }));
  results.push({ ...check, ...metrics });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
