# Final Important Fix Report

## 范围

- 移动端折叠菜单内增加 `/about/#contact`“发起合作”入口，桌面 CTA 保持不变。
- README 本地开发命令改用 `JINTAI_ROOT_PATH=1`，说明新终端访问和停止服务后清理变量。
- 咨询表单增加纯 `mailto` 构建/校验、文字错误、`aria-live` 状态和邮箱回退入口。

## TDD 证据

### RED

命令：

```powershell
node --test tests/portal-shell-structure.test.mjs tests/base-path.test.mjs tests/inquiry-form-structure.test.mjs
```

结果：exit 1，9 项中 3 项通过、6 项按预期失败。失败分别证明移动 `<details className=...>` 内缺少 CTA、README 本地开发未设置 `JINTAI_ROOT_PATH`、缺少 `buildMailtoUrl`/`validateInquiryInput`，以及表单缺少文字状态结构。最初的移动菜单正则误匹配注释中的 `<details>`；收紧到真实标签作用域后重新运行，确认该测试因移动 CTA 缺失而失败。

### GREEN

同一 focused 命令在最小实现后结果：exit 0，9/9 通过，无警告。

首次根路径构建发现 `.mts` 无法通过 Next 别名解析；改为 Node/Next 均原生识别的 `.mjs` 并使用显式扩展名后，focused 测试仍为 9/9，随后两种构建均通过。

## 最终验证

- `node --test tests/portal-shell-structure.test.mjs tests/base-path.test.mjs tests/inquiry-form-structure.test.mjs`：9/9，exit 0。
- `$env:JINTAI_ROOT_PATH = "1"; npm run build`：exit 0，静态生成 9/9 页面。
- `Remove-Item Env:JINTAI_ROOT_PATH -ErrorAction SilentlyContinue; npm run build`：exit 0，静态生成 9/9 页面；`out/index.html` 包含 `/jintai-ai-site/_next/`。
- `npm test`：29/29，exit 0。
- `npm run test:content`：2/2，exit 0。
- `npm run lint`：exit 0。
- `git diff --check`：exit 0。

两次构建都输出了仓库既有的多 lockfile/worktree 根目录推断警告，但编译、TypeScript 检查与静态导出全部成功。本次没有扩大范围修改 Turbopack 根目录配置。

未执行部署、push 或三项人工发布门禁。

## 单一公开内容来源复核修复

### RED

命令：

```powershell
node --test tests/inquiry-form-structure.test.mjs tests/public-content.test.mjs
```

结果：exit 1，9 项中 5 项通过、4 项按预期失败。失败证明 helper 忽略传入收件人、表单未从 `site.contact.email` 传值、helper 重复公开邮箱/咨询类型，以及公开内容扫描未包含 `.mjs`。

### GREEN

同一 focused 命令在最小实现后结果：exit 0，9/9 通过。首次 GREEN 的 `.mjs` 包含断言因 Windows 路径分隔符失败；改用 `path.join` 后跨平台通过，扫描行为本身未再变更。

### 最终验证

- `npm run test:content`：3/3，exit 0。
- `npm run lint`：exit 0。
- `$env:JINTAI_ROOT_PATH = "1"; npm run build`：exit 0，静态生成 9/9 页面。
- `Remove-Item Env:JINTAI_ROOT_PATH -ErrorAction SilentlyContinue; npm run build`：exit 0，静态生成 9/9 页面；`out/index.html` 包含 `/jintai-ai-site/_next/`。
- `npm test`：31/31，exit 0。
- `git diff --check`：exit 0。

两次构建仍只有仓库既有的多 lockfile/worktree 根目录推断警告。未部署、push 或处理人工发布门禁。
