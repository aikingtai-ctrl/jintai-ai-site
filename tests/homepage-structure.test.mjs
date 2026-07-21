import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const hero = await readFile(new URL("../src/components/portal/hero.tsx", import.meta.url), "utf8");
const trustStrip = await readFile(
  new URL("../src/components/portal/trust-strip.tsx", import.meta.url),
  "utf8",
);
const centerStory = await readFile(new URL("../src/components/portal/center-story.tsx", import.meta.url), "utf8");
const audiencePaths = await readFile(new URL("../src/components/portal/audience-paths.tsx", import.meta.url), "utf8");
const cooperationPath = await readFile(
  new URL("../src/components/portal/cooperation-path.tsx", import.meta.url),
  "utf8",
);
const inquiryForm = await readFile(
  new URL("../src/components/inquiry-form.tsx", import.meta.url),
  "utf8",
);
const globals = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const site = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");
const cooperationPaths = site.match(/export const cooperationPaths = \[([\s\S]*?)\] as const;/)?.[1];
const allPortalSource = [
  page,
  hero,
  trustStrip,
  audiencePaths,
  centerStory,
  cooperationPath,
].join("\n");

function hexToken(name) {
  const match = globals.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(match, `missing ${name} token`);
  return match[1];
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

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

test("homepage uses the 21st architectural narrative structure", () => {
  for (const id of ["trust", "capabilities", "center", "cooperation", "inquiry"]) {
    assert.match(allPortalSource, new RegExp(`id=["']${id}["']`));
  }
  assert.match(hero, /<FloorStack/);
  assert.match(centerStory, /<FloorStack/);
  assert.match(audiencePaths, /grid-cols-\[.*1fr.*2fr.*1fr/);
  assert.match(hero, /href="#cooperation"/);
  assert.match(hero, /href="\/ai-center\/#visit"/);
  assert.match(cooperationPath, /<InquiryForm defaultKind="业务咨询"/);
});

test("homepage keeps the public static-content boundary", () => {
  assert.doesNotMatch(allPortalSource, /framer-motion|gsap|images\.unsplash\.com|https?:\/\//);
  assert.doesNotMatch(allPortalSource, /[\u{1F000}-\u{1FAFF}]/u);
  assert.doesNotMatch(allPortalSource, /(?:累计|超过|服务).*?\d+(?:\.\d+)?(?:%|家|个|万)/);
});

test("homepage places the stone inquiry form inside an opaque night panel", () => {
  assert.match(
    cooperationPath,
    /<section id="inquiry" className="surface-stone">[\s\S]*?<div className="bg-night-2[^"\n]*">[\s\S]*?<InquiryForm/,
  );
  assert.doesNotMatch(
    cooperationPath,
    /<section id="inquiry" className="surface-stone">[\s\S]*?<div className="glass[^"\n]*">[\s\S]*?<InquiryForm/,
  );
});

test("homepage inquiry feedback uses contrast-verified tokens", () => {
  assert.match(inquiryForm, /status\.kind === "error" \? "text-alert" : "text-ink-2"/);
  assert.match(
    inquiryForm,
    /<p className="text-base leading-relaxed text-ink-3">\{inquiry\.note\}<\/p>/,
  );
  assert.doesNotMatch(inquiryForm, /text-red-300/);

  const background = hexToken("--jt-night-2");
  for (const token of ["--jt-alert", "--jt-ink-2", "--jt-ink-3"]) {
    assert.ok(
      contrastRatio(hexToken(token), background) >= 4.5,
      `${token} must meet 4.5:1 against --jt-night-2`,
    );
  }
});

test("homepage controls retain accessible motion and touch targets", () => {
  assert.ok((hero.match(/min-h-11/g) ?? []).length >= 2, "hero CTAs need 44px targets");
  assert.match(inquiryForm, /<button[\s\S]*?min-h-11/);
  assert.match(globals, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(globals, /transition-duration: 0\.01ms !important/);
});
