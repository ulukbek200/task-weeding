import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const templates = [
  ["amore", "https://toy-amore.vercel.app/"],
  ["ak-niyet", "https://ak-niyet.vercel.app/"],
  ["ak-niyet-classic", "https://ak-niyet-wcug.vercel.app/"],
  ["wedding-classic", "https://weeding2-two.vercel.app/"],
  ["ak-jol", "https://ak-jol-five.vercel.app/"],
  ["velora", "https://velora-peach-ten.vercel.app/"],
];

const requestedIds = new Set(process.argv.slice(2));
const templatesToCapture = requestedIds.size
  ? templates.filter(([id]) => requestedIds.has(id))
  : templates;

if (requestedIds.size && templatesToCapture.length !== requestedIds.size) {
  const knownIds = new Set(templates.map(([id]) => id));
  const missingIds = [...requestedIds].filter((id) => !knownIds.has(id));
  throw new Error(`Unknown template id(s): ${missingIds.join(", ")}`);
}

const browserPaths = [
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
].filter(Boolean);

const executablePath = browserPaths.find((candidate) => fs.existsSync(candidate));

if (!executablePath) {
  throw new Error("No installed Chrome or Edge executable found for preview capture.");
}

const outDir = path.resolve("public/previews");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  headless: true,
  args: ["--disable-gpu", "--no-sandbox"],
});

const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});

for (const [id, url] of templatesToCapture) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForLoadState("load", { timeout: 30000 }).catch(() => {});

  const openTrigger = page.locator(".open-trigger").first();
  if (await openTrigger.count()) {
    await openTrigger.click({ timeout: 5000 }).catch(() => {});
    await page
      .waitForFunction(() => !document.querySelector(".opening-stage"), null, { timeout: 15000 })
      .catch(() => {});
    await page.waitForTimeout(600);
  }

  await page.waitForTimeout(1800);
  await page.screenshot({
    path: path.join(outDir, `${id}.webp`),
    type: "webp",
    quality: 86,
    fullPage: false,
  });
  await page.close();
  console.log(`captured ${id}`);
}

await browser.close();
