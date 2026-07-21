import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");

test("static export defaults to GitHub Pages and has an explicit root-path mode", () => {
  assert.match(config, /process\.env\.JINTAI_ROOT_PATH === "1"/);
  assert.match(config, /basePath: isRootPath \? "" : "\/jintai-ai-site"/);
});

test("本地开发文档显式选择配置支持的根路径模式", () => {
  const localDevelopment = readme.match(
    /## 本地开发([\s\S]*?)(?=\n## )/,
  )?.[1];

  assert.ok(localDevelopment, "missing local development section");
  assert.match(
    localDevelopment,
    /\$env:JINTAI_ROOT_PATH = "1"[\s\S]*?npm run dev/,
  );
  assert.match(localDevelopment, /http:\/\/localhost:3000\//);
  assert.match(localDevelopment, /新 PowerShell 终端/);
  assert.match(
    localDevelopment,
    /停止服务后[\s\S]*?Remove-Item Env:JINTAI_ROOT_PATH/,
  );
  assert.doesNotMatch(readme, /BASE_PATH/);
});
