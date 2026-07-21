export const INQUIRY_RECIPIENT = "ai.kingtai@gmail.com";

/** @typedef {"业务咨询" | "预约参观" | "生态合作"} InquiryKind */

/**
 * @typedef {object} InquiryInput
 * @property {string} org
 * @property {string} person
 * @property {string} phone
 * @property {InquiryKind} kind
 * @property {string} need
 * @property {string} scale
 * @property {string} timeline
 * @property {string} message
 */

/** @param {InquiryInput} input */
export function validateInquiryInput(input) {
  const missing = [
    [input.org, "单位名称"],
    [input.person, "联系人"],
    [input.phone, "联系方式"],
  ]
    .filter(([value]) => !value.trim())
    .map(([, label]) => label);

  if (missing.length === 0) {
    return null;
  }

  const labels =
    missing.length === 1
      ? missing[0]
      : `${missing.slice(0, -1).join("、")}和${missing.at(-1)}`;
  return `请填写${labels}。`;
}

/** @param {InquiryInput} input */
export function buildMailtoUrl(input) {
  const body = [
    `单位：${input.org.trim()}`,
    `联系人：${input.person.trim()}`,
    `联系方式：${input.phone.trim()}`,
    `需求方向：${input.need.trim()}`,
    `规模：${input.scale.trim()}`,
    `时间预期：${input.timeline.trim()}`,
    "",
    "补充说明：",
    input.message.trim() || "（无）",
  ].join("\n");
  const subject = `${input.kind} · ${input.org.trim()}`;

  return (
    `mailto:${INQUIRY_RECIPIENT}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`
  );
}
