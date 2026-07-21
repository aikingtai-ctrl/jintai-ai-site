import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const config = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");

test("static export defaults to GitHub Pages and has an explicit root-path mode", () => {
  assert.match(config, /process\.env\.JINTAI_ROOT_PATH === "1"/);
  assert.match(config, /basePath: isRootPath \? "" : "\/jintai-ai-site"/);
});
