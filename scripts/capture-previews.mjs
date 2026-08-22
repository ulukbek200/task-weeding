import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const templates = [
  ["amore", "https://toy-amore.vercel.app/"],
  ["ak-niyet", "https://ak-niyet.vercel.app/"],
  ["ak-niyet-classic", "https://ak-niyet-wcug.vercel.app/"],
  ["wedding-classic", "https://weeding2-two.vercel.app/"],
  ["ak-jol", "https://ak-jol-five.vercel.app/"],
];

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

for (const [id, url] of templates) {
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
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
