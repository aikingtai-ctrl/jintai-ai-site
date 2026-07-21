import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const form = await readFile(
  new URL("../src/components/inquiry-form.tsx", import.meta.url),
  "utf8",
);

test("咨询表单暴露合作类型选择", () => {
  assert.match(form, /name="kind"/);
  assert.match(form, /inquiryKinds/);
  assert.match(form, /defaultKind/);
});
