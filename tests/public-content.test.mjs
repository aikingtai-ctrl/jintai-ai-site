import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const sourceDirectory = new URL("../src/", import.meta.url);

async function readPublicSource(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const sources = await Promise.all(
    entries.map(async (entry) => {
      const file = new URL(entry.name, directory);
      if (entry.isDirectory()) return readPublicSource(new URL(`${entry.name}/`, directory));
      if (!/\.(mjs|ts|tsx)$/.test(entry.name)) return [];
      return [{ file: path.relative(new URL("..", import.meta.url).pathname, file.pathname), source: await readFile(file, "utf8") }];
    }),
  );
  return sources.flat();
}

const publicSources = await readPublicSource(sourceDirectory);

test("公开内容扫描包含 JavaScript helper", () => {
  assert.equal(
    publicSources.some(
      ({ file }) => file === path.join("src", "lib", "inquiry-mailto.mjs"),
    ),
    true,
  );
});

test("公开内容不保留限制数字和内部口径", () => {
  for (const value of [
    "1.00 元/度",
    "3,360",
    "140 个机柜",
    "资费与计价",
    "索取该档报价",
    "五类必须留在城区的负载",
    "张北、乌兰察布等地综合成本更低",
    "涉密专区",
  ]) {
    for (const { file, source } of publicSources) {
      assert.equal(source.includes(value), false, `限制内容泄漏：${value} (${file})`);
    }
  }
});

test("公开内容提供三种合作入口", () => {
  for (const value of ["业务咨询", "预约参观", "生态合作"]) {
    assert.equal(publicSources.some(({ source }) => source.includes(value)), true, "缺少入口：" + value);
  }
});
