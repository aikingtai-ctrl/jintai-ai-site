import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const form = await readFile(
  new URL("../src/components/inquiry-form.tsx", import.meta.url),
  "utf8",
);

let inquiryMailto = {};
try {
  inquiryMailto = await import(
    new URL("../src/lib/inquiry-mailto.mjs", import.meta.url)
  );
} catch (error) {
  if (error?.code !== "ERR_MODULE_NOT_FOUND") {
    throw error;
  }
}

const validInquiry = {
  org: "金泰 & 合作?",
  person: "王小明",
  phone: "wang+合作@example.com",
  kind: "业务咨询",
  need: "业务咨询",
  scale: "已有项目计划",
  timeline: "近期",
  message: "A+B & C?\n第二行",
};

test("咨询表单暴露合作类型选择", () => {
  assert.match(form, /name="kind"/);
  assert.match(form, /inquiryKinds/);
  assert.match(form, /defaultKind/);
});

test("三种合作类型分别进入邮件主题", () => {
  assert.equal(
    typeof inquiryMailto.buildMailtoUrl,
    "function",
    "buildMailtoUrl must be exported",
  );

  for (const kind of ["业务咨询", "预约参观", "生态合作"]) {
    const url = new URL(
      inquiryMailto.buildMailtoUrl({ ...validInquiry, kind }),
    );
    assert.equal(url.searchParams.get("subject"), `${kind} · 金泰 & 合作?`);
  }
});

test("mailto 固定收件人并正确编码主题和正文", () => {
  assert.equal(
    typeof inquiryMailto.buildMailtoUrl,
    "function",
    "buildMailtoUrl must be exported",
  );

  const mailto = inquiryMailto.buildMailtoUrl(validInquiry);
  const url = new URL(mailto);
  const expectedSubject = "业务咨询 · 金泰 & 合作?";

  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "ai.kingtai@gmail.com");
  assert.ok(mailto.includes(`subject=${encodeURIComponent(expectedSubject)}`));
  assert.ok(
    mailto.includes(
      `body=${encodeURIComponent(
        "单位：金泰 & 合作?\n联系人：王小明\n联系方式：wang+合作@example.com\n需求方向：业务咨询\n规模：已有项目计划\n时间预期：近期\n\n补充说明：\nA+B & C?\n第二行",
      )}`,
    ),
  );
});

test("空必填字段返回可理解的文字错误", () => {
  assert.equal(
    typeof inquiryMailto.validateInquiryInput,
    "function",
    "validateInquiryInput must be exported",
  );

  const error = inquiryMailto.validateInquiryInput({
    ...validInquiry,
    org: " ",
    person: "",
    phone: "",
  });

  assert.equal(error, "请填写单位名称、联系人和联系方式。");
});

test("咨询表单提供可朗读的提交状态和邮箱回退入口", () => {
  assert.match(form, /noValidate/);
  assert.match(form, /aria-live="polite"/);
  assert.match(form, /role="status"/);
  assert.match(form, /邮件客户端未打开/);
  assert.match(form, /INQUIRY_RECIPIENT/);
});
