import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const routeContracts = {
  capabilities: { data: "trustPoints", formKind: "业务咨询", primaryHref: "#inquiry" },
  solutions: { data: "solutionGroups", formKind: "业务咨询", primaryHref: "#government" },
  "ai-center": { data: "floorStories", formKind: "预约参观", primaryHref: "#visit" },
  partners: { data: "partnerRoles", formKind: "生态合作", primaryHref: "#inquiry" },
  about: { data: "aboutPoints", formKind: "业务咨询", primaryHref: "#contact" },
};
const routeSources = await Promise.all(
  Object.keys(routeContracts).map(async (route) => [
    route,
    await readFile(new URL(`src/app/${route}/page.tsx`, root), "utf8"),
  ]),
);
const pageHero = await readFile(new URL("src/components/portal/page-hero.tsx", root), "utf8");
const site = await readFile(new URL("src/content/site.ts", root), "utf8");

for (const [route, source] of routeSources) {
  const { data, formKind, primaryHref } = routeContracts[route];

  test(`${route} retains its shared chrome, hero, data, and inquiry contract`, () => {
    for (const component of ["SiteHeader", "PageHero", "InquiryForm", "SiteFooter"]) {
      assert.match(source, new RegExp(`<${component}`));
    }
    assert.match(source, /<main id="main">/);
    assert.match(source, new RegExp(`${data}\.map`));
    assert.match(source, new RegExp(`defaultKind="${formKind}"`));
    assert.match(source, new RegExp(`primaryHref="${primaryHref}"`));
  });

  test(`fresh static export contains ${route}`, async () => {
    const output = new URL(`out/${route}/index.html`, root);
    await assert.doesNotReject(access(output));
    const stats = await Promise.all([
      stat(output),
      stat(new URL(`src/app/${route}/page.tsx`, root)),
      stat(new URL("src/components/portal/page-hero.tsx", root)),
      stat(new URL("src/components/site-header.tsx", root)),
      stat(new URL("src/components/site-footer.tsx", root)),
      stat(new URL("src/components/inquiry-form.tsx", root)),
      stat(new URL("src/content/site.ts", root)),
    ]);
    assert.ok(
      stats[0].mtimeMs >= Math.max(...stats.slice(1).map((file) => file.mtimeMs)),
      `${route} output is older than its source; run a fresh build`,
    );
  });
}

test("solutions exposes all data-backed deep-link anchors", () => {
  const source = Object.fromEntries(routeSources).solutions;
  const solutionGroups = site.match(/export const solutionGroups = \[([\s\S]*?)\] as const;/)?.[1];
  assert.match(source, /id={group.id}/);
  assert.ok(solutionGroups, "missing solutionGroups data");
  for (const anchor of ["government", "industry", "education"]) {
    assert.match(solutionGroups, new RegExp(`id: "${anchor}"`));
  }
});

test("AI center and about expose their required form anchors", () => {
  const sources = Object.fromEntries(routeSources);
  assert.match(sources["ai-center"], /id="visit"/);
  assert.match(sources.about, /id="contact"/);
});

test("page hero CTA uses the token-backed primary foreground", () => {
  assert.doesNotMatch(pageHero, /text-\[#241a05\]/);
  assert.match(pageHero, /text-primary-foreground/);
});
