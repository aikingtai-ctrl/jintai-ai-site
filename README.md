# 金泰 AI 公共门户

这是一个全静态导出的 Next.js 网站。咨询表单只生成收件人预填的本地邮件草稿；网站不包含服务端、账户、支付或内部运营功能。

## 本地开发

在 PowerShell 中安装依赖并启动本地开发服务器：

```powershell
npm ci
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。本地开发使用根路径；无需设置环境变量。

## 静态构建

默认构建用于 GitHub Pages，站点发布在 `/jintai-ai-site/` 下：

```powershell
npm run build
$previewRoot = ".superpowers\sdd\preview-root"
New-Item -ItemType Directory -Path $previewRoot -Force
New-Item -ItemType Junction -Path "$previewRoot\jintai-ai-site" -Target (Resolve-Path out)
npx --yes serve $previewRoot -l 3000
```

然后打开 [http://localhost:3000/jintai-ai-site/](http://localhost:3000/jintai-ai-site/)。

若静态服务器将站点托管在域名根目录，请使用当前配置支持的 Windows 根路径模式：

```powershell
$env:JINTAI_ROOT_PATH = "1"
npm run build
npx --yes serve out -l 3000
Remove-Item Env:JINTAI_ROOT_PATH
```

根路径预览地址为 [http://localhost:3000/](http://localhost:3000/)。不要使用旧的 `BASE_PATH` 空字符串命令：构建配置以 `JINTAI_ROOT_PATH=1` 明确选择根路径，默认仍是 GitHub Pages 路径。

## GitHub Pages

仓库名为 `jintai-ai-site` 时，GitHub Pages 的发布目录是 `out/`，访问路径为：

`https://<GitHub 用户名>.github.io/jintai-ai-site/`

发布前运行默认构建，并确认 `out/index.html` 中的静态资源以 `/jintai-ai-site/_next/` 开头：

```powershell
npm run build
Select-String -Path out\index.html -Pattern "/jintai-ai-site/_next/"
```

GitHub Pages 需配置为部署此项目构建生成的 `out/` 内容；不要将源码目录或 `node_modules/` 作为发布产物。

## 内容确认清单

发布负责人必须逐项确认所有公开内容已经获得授权、准确且可公开：

- 每一个数字、案例、统计口径和日期。
- 每个名称的大小写、合作伙伴名称、商标、Logo 与品牌归属。
- 所有政策、合规、隐私、安全及服务承诺的表述。
- 每张图片、视频、肖像、截图和素材的使用权限与署名要求。
- 所有邮箱地址、电话、物理地址与联系路径。

未确认的内容不得以推测、占位或暗示方式发布。

## 验收清单

在发布前，从干净依赖状态完成以下检查：

```powershell
npm ci

# 根路径静态导出
$env:JINTAI_ROOT_PATH = "1"
npm run build

# GitHub Pages 静态导出（默认）
Remove-Item Env:JINTAI_ROOT_PATH -ErrorAction SilentlyContinue
npm run build
Select-String -Path out\index.html -Pattern "/jintai-ai-site/_next/"

npm test
npm run lint
```

随后以本节“静态构建”中的预览根目录命令预览 GitHub Pages 产物，并在 `http://localhost:3000/jintai-ai-site/` 人工确认。该 Junction 将 `out/` 挂载为 `jintai-ai-site/`，因此 HTML 与 `/jintai-ai-site/_next/` 下的静态资源均使用真实的 GitHub Pages 路径，而非只回退 HTML。

1. 桌面端导航与全部 CTA 前往预期路由或区块。
2. 390px 视口没有横向滚动，菜单与 CTA 可用。
3. Tab 顺序可到达跳过链接、导航、卡片、表单字段和提交按钮，且焦点可见。
4. 操作系统启用“减少动态效果”时，连续动画停止。
5. 三种咨询类型分别只生成对应的邮件草稿；不要发送真实邮件。
