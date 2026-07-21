import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");

test("公开内容不保留限制数字和内部口径", () => {
  for (const value of ["1.00 元/度", "3,360", "140 个机柜", "资费与计价", "索取该档报价"]) {
    assert.equal(source.includes(value), false, "限制内容泄漏：" + value);
  }
});

test("公开内容提供三种合作入口", () => {
  for (const value of ["业务咨询", "预约参观", "生态合作"]) {
    assert.equal(source.includes(value), true, "缺少入口：" + value);
  }
});
