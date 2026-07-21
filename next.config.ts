import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 全静态导出到 out/：本站无服务端逻辑，询价表单走 mailto，
  // 因此可直接托管在任何静态服务器（GitHub Pages 等）。
  output: "export",
  // GitHub Pages 是子路径托管（/jintai-ai-site/），不设 basePath 的话
  // 导出的 /_next/... 绝对路径会全部 404。本地预览用 BASE_PATH="" 覆盖。
  basePath: process.env.BASE_PATH ?? "/jintai-ai-site",
  // 目录式路由，静态托管下 /path 能直接命中 /path/index.html
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
