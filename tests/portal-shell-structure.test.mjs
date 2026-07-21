import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";

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

async function findTsxFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = new URL(entry.name, directory);

      if (entry.isDirectory()) {
        return findTsxFiles(new URL(`${entry.name}/`, directory));
      }

      return entry.isFile() && entry.name.endsWith(".tsx") ? [file] : [];
    }),
  );

  return nested.flat();
}

const root = new URL("../", import.meta.url);
const [layout, styles, header, footer, sectionHeading, floorStack, signalMark] = await Promise.all([
  readFile(new URL("src/app/layout.tsx", root), "utf8"),
  readFile(new URL("src/app/globals.css", root), "utf8"),
  readFile(new URL("src/components/site-header.tsx", root), "utf8"),
  readFile(new URL("src/components/site-footer.tsx", root), "utf8"),
  readFile(new URL("src/components/portal/section-heading.tsx", root), "utf8"),
  readFile(new URL("src/components/portal/floor-stack.tsx", root), "utf8"),
  readFile(new URL("src/components/portal/signal-mark.tsx", root), "utf8"),
]);

const routes = [
  "/capabilities/",
  "/solutions/",
  "/ai-center/",
  "/partners/",
  "/about/",
];

const pageHero = await readFile(
  new URL("src/components/portal/page-hero.tsx", root),
  "utf8",
);
const internalLinkSources = (
  await Promise.all(
    (await findTsxFiles(new URL("src/", root))).map(async (file) => ({
      file,
      source: await readFile(file, "utf8"),
    })),
  )
).filter(({ source }) => /from\s+["']next\/link["']/.test(source));
const pageSources = await Promise.all(
  routes.map((route) => readFile(new URL(`src/app${route}page.tsx`, root), "utf8")),
);

test("共享站点壳层提供公共路由、联系入口和门户样式", () => {
  assert.match(layout, /portal-shell/);
  assert.match(header, /aria-label=/);
  assert.match(header, /min-h-11/);
  assert.match(footer, /href="\/about\/#contact"/);
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
  assert.match(sectionHeading, /<h2/);
  assert.match(floorStack, /<ol/);
  assert.match(signalMark, /aria-label=/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(styles, /\.surface-stone/);
  assert.match(styles, /\.architect-grid/);
  assert.match(sectionHeading, /align = "left"/);
  assert.match(sectionHeading, /align === "center" && "mx-auto text-center"/);
  assert.match(sectionHeading, /var\(--portal-text\)/);
  assert.match(sectionHeading, /var\(--portal-muted\)/);
  assert.match(floorStack, /type FloorTone = "gold" \| "compute" \| "create" \| "grow"/);
  assert.match(floorStack, /compact && "floor-stack-compact"/);
  for (const tone of ["gold", "compute", "create", "grow"]) {
    assert.match(floorStack, new RegExp(`${tone}: "floor-tone-${tone}"`));
  }
  assert.match(floorStack, /ArrowUpRight[\s\S]*?aria-hidden="true"/);
  assert.match(floorStack, /var\(--portal-text\)/);
  assert.match(floorStack, /var\(--portal-muted\)/);
  assert.match(signalMark, /aria-label=\{label\}/);
  assert.match(signalMark, /Radio aria-hidden="true"/);
  assert.match(signalMark, /signal-\$\{tone\}/);
  assert.match(pageHero, /import \{ SignalMark \}/);
  assert.match(pageHero, /sectionNumber: string/);
  assert.match(pageHero, /<SignalMark/);

  const stone = declaredHex(styles, "--jt-stone");
  const stoneSurface = cssBlock(styles, ".surface-stone");
  for (const token of [
    "--portal-text",
    "--portal-muted",
    "--portal-accent",
    "--portal-compute",
    "--portal-create",
    "--portal-grow",
  ]) {
    assert.ok(
      contrastRatio(stone, declaredHex(stoneSurface, token)) >= 4.5,
      `${token} must meet 4.5:1 contrast on stone`,
    );
  }
  assert.ok(
    contrastRatio(stone, declaredHex(stoneSurface, "--portal-focus")) >= 4.5,
    "--portal-focus must meet 4.5:1 contrast on stone",
  );
});

test("five inner pages share numbered hero, editorial sections, and footer CTA", () => {
  for (const [index, source] of pageSources.entries()) {
    assert.match(source, /<PageHero/);
    assert.match(source, new RegExp(`sectionNumber="0${index + 1}"`));
    assert.match(source, /<SectionHeading/);
    assert.match(source, /<SiteFooter/);
  }
});

test("移动端折叠菜单内提供发起合作入口", () => {
  const mobileMenu = header.match(
    /<details\s+className=[\s\S]*?<\/details>/,
  )?.[0];

  assert.ok(mobileMenu, "missing mobile details menu");
  assert.match(mobileMenu, /href="\/about\/#contact"/);
  assert.match(mobileMenu, /发起合作/);
});

test("静态导出中的站内链接不预取 RSC 响应", () => {
  const links = internalLinkSources.flatMap(({ file, source }) =>
    (source.match(/<Link\b[\s\S]*?>/g) ?? []).map((tag) => ({ file, tag })),
  );

  assert.ok(links.length >= 12, "expected current internal Link coverage");
  for (const { file, tag } of links) {
    assert.equal(
      (tag.match(/\bprefetch=\{false\}/g) ?? []).length,
      1,
      `every Link in ${file.pathname} must have exactly one prefetch={false}`,
    );
  }
});
