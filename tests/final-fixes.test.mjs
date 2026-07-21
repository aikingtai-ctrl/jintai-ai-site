import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const [header, styles, centerStory, inquiryForm, plan, homePage, ...innerPages] =
  await Promise.all([
    read("src/components/site-header.tsx"),
    read("src/app/globals.css"),
    read("src/components/portal/center-story.tsx"),
    read("src/components/inquiry-form.tsx"),
    read("docs/superpowers/plans/2026-07-21-jintai-21st-redesign.md"),
    read("src/app/page.tsx"),
    read("src/app/capabilities/page.tsx"),
    read("src/app/solutions/page.tsx"),
    read("src/app/ai-center/page.tsx"),
    read("src/app/partners/page.tsx"),
    read("src/app/about/page.tsx"),
  ]);

function cssBlock(source, selector) {
  const match = source.match(
    new RegExp(`${selector.replace(".", "\\.")}\\s*\\{([\\s\\S]*?)\\n\\s*\\}`),
  );
  assert.ok(match, `missing ${selector} CSS block`);
  return match[1];
}

function declaredHex(source, name) {
  const match = source.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert.ok(match, `missing ${name} hex token`);
  return match[1];
}

function relativeLuminance(hex) {
  const channels = [1, 3, 5].map((start) => {
    const channel = Number.parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (left, right) => right - left,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

test("SiteHeader marks the current route in desktop and mobile navigation", () => {
  assert.match(header, /interface SiteHeaderProps[\s\S]*?currentPath:/);
  assert.match(header, /aria-current=\{isCurrent \? "page" : undefined\}/);
  assert.match(header, /site-header-active/);
  assert.match(header, /hidden lg:block[\s\S]*?site-header-active/);
  assert.match(header, /<details[\s\S]*?site-header-active/);

  for (const [source, currentPath] of [
    [homePage, "/"],
    [innerPages[0], "/capabilities/"],
    [innerPages[1], "/solutions/"],
    [innerPages[2], "/ai-center/"],
    [innerPages[3], "/partners/"],
    [innerPages[4], "/about/"],
  ]) {
    assert.match(source, new RegExp(`<SiteHeader currentPath="${currentPath}"`));
  }
});

test("opaque header surfaces retain 4.5:1 navigation contrast over stone", () => {
  assert.doesNotMatch(header, /bg-night\/70/);
  assert.match(header, /bg-night(?!\/)/);
  assert.match(cssBlock(styles, ".glass"), /background:\s*var\(--jt-night-2\)/);

  for (const [surface, token] of [
    ["--jt-night", "--jt-ink-2"],
    ["--jt-night", "--jt-gold"],
    ["--jt-night-2", "--jt-ink-2"],
    ["--jt-night-2", "--jt-gold"],
  ]) {
    assert.ok(
      contrastRatio(declaredHex(styles, surface), declaredHex(styles, token)) >= 4.5,
      `${token} must meet 4.5:1 on opaque ${surface}`,
    );
  }
});

test("center visit link does not switch to low-contrast gold on stone hover", () => {
  assert.doesNotMatch(centerStory, /hover:text-gold/);
  assert.match(centerStory, /hover:underline/);
});

test("redesign plan builds root mode explicitly and Pages mode by default", () => {
  assert.doesNotMatch(plan, /GITHUB_PAGES/);
  assert.match(plan, /\$env:JINTAI_ROOT_PATH\s*=\s*["']1["'];[\s\S]*?npm run build;/);
  assert.match(plan, /Remove-Item Env:JINTAI_ROOT_PATH/);
  assert.match(plan, /Pages basePath[\s\S]*?Run:\s*`npm run build`/);
  assert.match(plan, /\/jintai-ai-site\//);
});

test("inquiry note selector targets its explanatory paragraph, not a placeholder", () => {
  assert.match(
    inquiryForm,
    /<p className="text-base leading-relaxed text-ink-3">\{inquiry\.note\}<\/p>/,
  );
});
