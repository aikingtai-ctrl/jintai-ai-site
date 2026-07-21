import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

for (const route of ["capabilities", "solutions", "ai-center", "partners", "about"]) {
  test("静态导出包含 " + route, async () => {
    await assert.doesNotReject(access(new URL("../out/" + route + "/index.html", import.meta.url)));
  });
}
