import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const hero = await readFile(new URL("../src/components/portal/hero.tsx", import.meta.url), "utf8");
const centerStory = await readFile(new URL("../src/components/portal/center-story.tsx", import.meta.url), "utf8");
const audiencePaths = await readFile(new URL("../src/components/portal/audience-paths.tsx", import.meta.url), "utf8");
const cooperationPath = await readFile(
  new URL("../src/components/portal/cooperation-path.tsx", import.meta.url),
  "utf8",
);
const site = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");
const cooperationPaths = site.match(/export const cooperationPaths = \[([\s\S]*?)\] as const;/)?.[1];

test("homepage orders trust, paths, center, and cooperation", () => {
  let previousIndex = -1;
  for (const name of [
    "PortalHero",
    "TrustStrip",
    "AudiencePaths",
    "CenterStory",
    "CooperationPath",
  ]) {
    const index = page.indexOf("<" + name);
    assert.notEqual(index, -1, `missing <${name}`);
    assert.ok(index > previousIndex, `<${name} is out of order`);
    previousIndex = index;
  }
});

test("cooperation path shows the required handoff sequence", () => {
  for (const step of [
    "提出目标",
    "匹配能力与空间",
    "现场交流/场景验证",
    "共建与持续交付",
  ]) {
    assert.ok(cooperationPath.includes(step));
  }
  assert.match(cooperationPath, /→/);
  assert.match(cooperationPath, /<InquiryForm defaultKind="业务咨询"/);
});

test("homepage CTAs target the conversion anchors", () => {
  assert.match(hero, /href="#cooperation"/);
  assert.match(hero, /href="\/ai-center\/#visit"/);
  assert.match(centerStory, /href="\/ai-center\/#visit"/);
  assert.match(cooperationPath, /<section id="cooperation"/);
});

test("homepage audience paths retain all three cooperation destinations", () => {
  assert.match(audiencePaths, /cooperationPaths\.map/);
  assert.match(audiencePaths, /<Link href={path.href}/);
  assert.ok(cooperationPaths, "missing cooperationPaths data");
  for (const href of [
    "/solutions/#government",
    "/solutions/#industry",
    "/ai-center/#visit",
  ]) {
    assert.match(cooperationPaths, new RegExp(`href: "${href}"`));
  }
});

test("homepage hero CTA uses the token-backed primary foreground", () => {
  assert.doesNotMatch(hero, /text-\[#241a05\]/);
  assert.match(hero, /text-primary-foreground/);
});
