import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const cooperationPath = await readFile(
  new URL("../src/components/portal/cooperation-path.tsx", import.meta.url),
  "utf8",
);

test("homepage orders trust, paths, center, and cooperation", () => {
  let previousIndex = -1;
  for (const name of [
    "PortalHero",
    "TrustStrip",
    "AudiencePaths",
    "CenterStory",
    "CooperationPath",
  ]) {
    const index = page.indexOf("<" + name);
    assert.notEqual(index, -1, `missing <${name}`);
    assert.ok(index > previousIndex, `<${name} is out of order`);
    previousIndex = index;
  }
});

test("cooperation path shows the required handoff sequence", () => {
  for (const step of [
    "提出目标",
    "匹配能力与空间",
    "现场交流/场景验证",
    "共建与持续交付",
  ]) {
    assert.ok(cooperationPath.includes(step));
  }
  assert.match(cooperationPath, /→/);
  assert.match(cooperationPath, /<InquiryForm defaultKind="业务咨询"/);
});
