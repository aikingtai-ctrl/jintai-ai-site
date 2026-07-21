import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [layout, styles, header, footer] = await Promise.all([
  readFile(new URL("src/app/layout.tsx", root), "utf8"),
  readFile(new URL("src/app/globals.css", root), "utf8"),
  readFile(new URL("src/components/site-header.tsx", root), "utf8"),
  readFile(new URL("src/components/site-footer.tsx", root), "utf8"),
]);

const routes = [
  "/capabilities/",
  "/solutions/",
  "/ai-center/",
  "/partners/",
  "/about/",
];

test("共享站点壳层提供公共路由、联系入口和门户样式", () => {
  assert.match(layout, /portal-shell/);
  for (const route of routes) {
    assert.ok(header.includes(route), `header missing ${route}`);
    assert.ok(footer.includes(route), `footer missing ${route}`);
  }
  assert.match(header, /href="\/about\/#contact"/);
  assert.match(header, /发起合作/);
  assert.match(footer, /最小化收集/);
  for (const className of [
    "portal-shell",
    "portal-eyebrow",
    "portal-grid",
    "portal-link-card",
    "portal-floor-row",
  ]) {
    assert.match(styles, new RegExp(`\\.${className}`));
  }
  assert.match(styles, /@media \(min-width: 1024px\)/);
  assert.match(styles, /prefers-reduced-motion/);
});
