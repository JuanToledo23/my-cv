// Accessibility check: starts the production build and runs axe (WCAG 2.0–2.2 A/AA
// plus best practices) on both routes, light and dark, desktop with form errors
// shown and mobile with the menu open. Exits with 1 if anything is found.
// Needs `next build` first (the npm script does it) and `npx playwright install chromium` once.
import { spawn } from "node:child_process";
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";

const PORT = 3999;
const BASE = `http://localhost:${PORT}`;
const ROUTES = [
  { path: "/", menu: "Menu" },
  { path: "/es", menu: "Menú" },
];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const server = spawn("npx", ["next", "start", "-p", String(PORT)], { stdio: "ignore" });

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(BASE)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("next start did not come up");
}

let failures = 0;
try {
  await waitForServer();
  const browser = await chromium.launch();
  for (const scheme of ["light", "dark"]) {
    for (const route of ROUTES) {
      for (const width of [1280, 375]) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
        const page = await context.newPage();
        await page.goto(BASE + route.path, { waitUntil: "networkidle" });
        if (width === 375) {
          await page.getByRole("button", { name: route.menu }).click();
        } else {
          // Empty submit: shows the validation errors, never sends an email.
          await page.locator("form button[type=submit]").click();
          await page.waitForSelector("#contact-name-error");
        }
        const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const label = `${route.path} ${scheme} ${width}px`;
        if (violations.length === 0) console.log(`ok   ${label}`);
        for (const v of violations) {
          failures++;
          console.log(`FAIL ${label}: [${v.impact}] ${v.id}: ${v.help}`);
          for (const node of v.nodes) console.log(`       ${node.target.join(" ")}`);
        }
        await context.close();
      }
    }
  }
  await browser.close();
} finally {
  server.kill();
}

console.log(failures ? `\n${failures} violation(s)` : "\nNo violations");
process.exit(failures ? 1 : 0);
