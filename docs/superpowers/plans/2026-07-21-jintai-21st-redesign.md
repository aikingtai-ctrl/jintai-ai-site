# 金泰 AI 全站 21st 改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有六页金泰 AI 静态门户升级为“建筑级 AI 中枢”视觉系统，完成验证、发布并打开最终网页。

**Architecture:** 保持 Next.js App Router、静态导出、现有内容数据和路由不变。通过共享设计令牌、三个小型视觉原语和现有 portal 组件的定向重构实现统一体验，不引入新的动画运行时或远程媒体依赖。

**Tech Stack:** Next.js 16、React 19、TypeScript、Tailwind CSS 4、Lucide React、Node test runner、GitHub Pages。

## Global Constraints

- 使用 21st Modern Landing Hero（ID 18625）的层级与双 CTA 思路、Bento Product Features（ID 9206）的不等宽网格思路、Timeline-02（ID 5534）的节点思路，但必须改造成金泰品牌语言。
- 保留 `/`、`/capabilities`、`/solutions`、`/ai-center`、`/partners`、`/about` 六条路由。
- 不新增 Framer Motion、GSAP、远程图片、Emoji 图标、虚构指标、客户 Logo 或未公开内部信息。
- 保持静态导出、GitHub Pages `basePath` 和邮件咨询流程可用。
- 支持 `prefers-reduced-motion`，交互目标至少 44×44px，正文对比度至少 4.5:1。
- 验证 375、768、1024、1440px，无横向滚动。

---

### Task 1: 设计令牌与共享视觉原语

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/components/portal/section-heading.tsx`
- Create: `src/components/portal/floor-stack.tsx`
- Create: `src/components/portal/signal-mark.tsx`
- Modify: `tests/portal-shell-structure.test.mjs`

**Interfaces:**
- Produces: `SectionHeading({ eyebrow, title, description, align? })`
- Produces: `FloorStack({ floors, compact? })` where `floors` is an array of `{ code, title, description, tone }`
- Produces: `SignalMark({ label, tone? })`

- [ ] **Step 1: 写失败测试**

在 `tests/portal-shell-structure.test.mjs` 中读取三个新文件，断言存在语义标题、楼层列表、`aria-label`、`prefers-reduced-motion` 和新的 `surface-stone` / `architect-grid` 样式钩子。

```js
assert.match(sectionHeading, /<h2/);
assert.match(floorStack, /<ol/);
assert.match(signalMark, /aria-label=/);
assert.match(globalCss, /prefers-reduced-motion:\s*reduce/);
assert.match(globalCss, /\.surface-stone/);
assert.match(globalCss, /\.architect-grid/);
```

- [ ] **Step 2: 验证测试失败**

Run: `node --test tests/portal-shell-structure.test.mjs`

Expected: FAIL，原因是新组件或新样式不存在。

- [ ] **Step 3: 实现最小共享原语**

组件必须是服务端组件、无状态、仅使用现有 `cn` 与 Lucide；`FloorStack` 使用 `<ol>` / `<li>`，tone 只允许 `gold | compute | create | grow`。在 `globals.css` 添加石材白表面、建筑网格、楼层线条、可访问焦点和 reduced-motion 规则，保留现有令牌兼容旧组件。

- [ ] **Step 4: 运行测试和静态检查**

Run: `node --test tests/portal-shell-structure.test.mjs && npm run lint`

Expected: PASS，ESLint 0 errors。

- [ ] **Step 5: 提交**

```bash
git add src/app/globals.css src/components/portal/section-heading.tsx src/components/portal/floor-stack.tsx src/components/portal/signal-mark.tsx tests/portal-shell-structure.test.mjs
git commit -m "feat: add architectural portal design primitives"
```

### Task 2: 重做首页六段叙事

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/portal/hero.tsx`
- Modify: `src/components/portal/trust-strip.tsx`
- Modify: `src/components/portal/audience-paths.tsx`
- Modify: `src/components/portal/center-story.tsx`
- Modify: `src/components/portal/cooperation-path.tsx`
- Modify: `tests/homepage-structure.test.mjs`

**Interfaces:**
- Consumes: `SectionHeading`, `FloorStack`, `SignalMark`
- Produces: 首页可查询的段落 ID `trust`、`capabilities`、`center`、`cooperation`、`inquiry`

- [ ] **Step 1: 写失败测试**

扩展 `tests/homepage-structure.test.mjs`，断言首页组件包含建筑 Hero 的 `FloorStack`、能力 Bento 的 CSS grid、六段 ID、两条 Hero CTA 和咨询入口；断言没有 `framer-motion`、远程图片 URL、Emoji 或伪造统计文案。

```js
for (const id of ["trust", "capabilities", "center", "cooperation", "inquiry"]) {
  assert.match(source, new RegExp(`id=["']${id}["']`));
}
assert.doesNotMatch(allPortalSource, /framer-motion|images\.unsplash\.com/);
```

- [ ] **Step 2: 验证测试失败**

Run: `node --test tests/homepage-structure.test.mjs`

Expected: FAIL，原因是新结构钩子尚未实现。

- [ ] **Step 3: 实现 Hero 与首页段落**

将 21st Hero 的“标题—说明—双 CTA—展示面板”结构改造成左文右楼层剖面；能力区域使用 1+2+1 不等宽 Bento；AI 中心使用 `FloorStack`；合作区域用三条编号路径；最后复用 `InquiryForm` 形成明确咨询收口。所有文案从 `src/content/site.ts` 读取或使用已公开、可验证的静态措辞。

- [ ] **Step 4: 运行首页测试、内容测试和 lint**

Run: `node --test tests/homepage-structure.test.mjs && npm run test:content && npm run lint`

Expected: PASS，且无新的内容边界错误。

- [ ] **Step 5: 提交**

```bash
git add src/app/page.tsx src/components/portal tests/homepage-structure.test.mjs
git commit -m "feat: rebuild Jintai homepage as AI center"
```

### Task 3: 统一导航、页脚和五个内页

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/portal/page-hero.tsx`
- Modify: `src/app/capabilities/page.tsx`
- Modify: `src/app/solutions/page.tsx`
- Modify: `src/app/ai-center/page.tsx`
- Modify: `src/app/partners/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `tests/portal-shell-structure.test.mjs`
- Modify: `tests/static-routes.test.mjs`

**Interfaces:**
- Consumes: `SectionHeading`, `FloorStack`, `SignalMark`, current `site` content exports
- Produces: 六页一致的 header、Page Hero、section rhythm、bottom CTA 和 footer

- [ ] **Step 1: 写失败测试**

为五个内页增加共享 `PageHero`、至少一个编号章节和底部合作 CTA 的断言；为 Header 增加移动菜单可访问名称、主 CTA 和 44px 交互高度断言；保留所有静态路由断言。

- [ ] **Step 2: 验证测试失败**

Run: `node --test tests/portal-shell-structure.test.mjs tests/static-routes.test.mjs`

Expected: FAIL，原因是统一内页结构尚未完成。

- [ ] **Step 3: 实现共享壳层与五个内页**

Header 使用半透明深海军蓝、桌面导航和可折叠移动导航；Page Hero 使用章节编号、宽标题和右侧信号标识。五页依照设计规格分别组织能力、解决方案、中心楼层、合作对象和品牌原则；长内容交替使用深色与石材白表面，页面尾部统一链接到合作咨询。

- [ ] **Step 4: 运行全部结构测试与 lint**

Run: `npm test && npm run lint`

Expected: 所有 Node tests PASS，ESLint 0 errors。

- [ ] **Step 5: 提交**

```bash
git add src/components/site-header.tsx src/components/site-footer.tsx src/components/portal/page-hero.tsx src/app tests/portal-shell-structure.test.mjs tests/static-routes.test.mjs
git commit -m "feat: unify Jintai portal pages"
```

### Task 4: 构建、浏览器验收与发布

**Files:**
- Modify: `README.md` only if release instructions drifted
- Modify: `PROJECT_MEMORY.md` if present; otherwise create/update the project memory file required by the existing workflow

**Interfaces:**
- Consumes: completed six-page static site
- Produces: verified GitHub Pages deployment and opened final URL

- [ ] **Step 1: 完整自动化验证**

Run: `npm test && npm run test:content && npm run lint && npm run build`

Expected: all tests PASS, lint 0 errors, Next.js static export succeeds.

- [ ] **Step 2: Pages basePath 构建**

Run: `$env:GITHUB_PAGES='true'; npm run build; Remove-Item Env:GITHUB_PAGES`

Expected: `out/index.html` 和五个内页目录存在，生成资源路径包含 `/jintai-ai-site/`。

- [ ] **Step 3: 浏览器视觉验收**

启动本地静态预览；在 375、768、1024、1440px 检查首页，并在桌面宽度逐页检查六条路由。验证无横向滚动、导航可达、CTA 正确、表单邮件流程可用、reduced-motion 可用。

- [ ] **Step 4: 修复验收问题并重复步骤 1 至 3**

每个发现必须有对应代码修复和最小回归断言；直到自动化与浏览器检查全部通过。

- [ ] **Step 5: 更新项目记忆并提交**

记录 21st 组件 ID、设计方向、验证命令、发布方式和最终 URL，不写入 API key 或其他秘密。

```bash
git add README.md PROJECT_MEMORY.md
git commit -m "docs: record Jintai 21st redesign release"
```

- [ ] **Step 6: 合并、推送和发布**

将 `codex/jintai-21st-redesign` 合并到 `main`，推送 `main`，按仓库既有 gh-pages 流程发布 `out/`。验证 GitHub Pages build 状态与六条公开路由均为 HTTP 200。

- [ ] **Step 7: 打开最终网页**

在 Codex 内置浏览器打开 `https://aikingtai-ctrl.github.io/jintai-ai-site/`，确认首屏是新版本并将标签页作为最终交付。

