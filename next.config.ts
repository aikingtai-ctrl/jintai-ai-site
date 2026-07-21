import type { NextConfig } from "next";

const isRootPath = process.env.JINTAI_ROOT_PATH === "1";

const nextConfig: NextConfig = {
  // 全静态导出到 out/：本站无服务端逻辑，询价表单走 mailto，
  // 因此可直接托管在任何静态服务器（GitHub Pages 等）。
  output: "export",
  // GitHub Pages is hosted under /jintai-ai-site/, so its assets need a base path.
  // Set JINTAI_ROOT_PATH=1 for a root-hosted export; GitHub Pages remains default.
  basePath: isRootPath ? "" : "/jintai-ai-site",
  // 目录式路由，静态托管下 /path 能直接命中 /path/index.html
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
