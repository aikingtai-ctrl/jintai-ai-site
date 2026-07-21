"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { inquiry, inquiryKinds } from "@/content/site";
import {
  buildMailtoUrl,
  INQUIRY_RECIPIENT,
  validateInquiryInput,
} from "@/lib/inquiry-mailto.mjs";

/**
 * 结构化询价表单。
 *
 * 本站为静态站点，无后端接收端点。提交时把字段组装成邮件正文，
 * 交由访问者本机的邮件客户端发出——数据不经本站服务器，也不落任何第三方。
 * 若日后接入表单服务，只需替换 handleSubmit 内的 mailto 组装逻辑。
 */

const fieldBase =
  "w-full rounded-lg border border-border bg-night/45 px-4 py-3 text-base text-ink backdrop-blur-md " +
  "outline-none transition-colors duration-200 placeholder:text-ink-3 " +
  "focus-visible:border-gold/60 focus-visible:ring-2 focus-visible:ring-gold/25";

const labelBase = "block text-base text-ink-2";

export function InquiryForm({
  defaultKind = "业务咨询",
}: {
  defaultKind?: (typeof inquiryKinds)[number];
}) {
  const [status, setStatus] = useState<{
    kind: "idle" | "error" | "success";
    message: string;
  }>({ kind: "idle", message: "" });

  // select 不做受控：取值只在提交时经 FormData 读取，无需渲染期同步
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const input = {
      org: get("org"),
      person: get("person"),
      phone: get("phone"),
      kind: get("kind") as (typeof inquiryKinds)[number],
      need: get("need"),
      scale: get("scale"),
      timeline: get("timeline"),
      message: get("message"),
    };
    const error = validateInquiryInput(input);

    if (error) {
      setStatus({ kind: "error", message: error });
      return;
    }

    setStatus({
      kind: "success",
      message: "已生成邮件内容，并尝试打开本机邮件客户端。",
    });
    window.location.href = buildMailtoUrl(input);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelBase} htmlFor="org">
            单位名称
          </label>
          <input
            id="org"
            name="org"
            required
            autoComplete="organization"
            placeholder="如：某某广播电视台"
            className={fieldBase}
          />
        </div>
        <div className="space-y-2">
          <label className={labelBase} htmlFor="person">
            联系人
          </label>
          <input
            id="person"
            name="person"
            required
            autoComplete="name"
            placeholder="姓名与职务"
            className={fieldBase}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelBase} htmlFor="phone">
          联系方式
        </label>
        <input
          id="phone"
          name="phone"
          required
          placeholder="电话或邮箱"
          className={fieldBase}
        />
      </div>

      <div className="space-y-2">
        <label className={labelBase} htmlFor="kind">
          合作类型
        </label>
        <select
          id="kind"
          name="kind"
          defaultValue={defaultKind}
          className={`${fieldBase} cursor-pointer`}
        >
          {inquiryKinds.map((kind) => (
            <option key={kind} value={kind}>
              {kind}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className={labelBase} htmlFor="need">
          需求方向
        </label>
        <select
          id="need"
          name="need"
          defaultValue={inquiry.needs[0]}
          className={`${fieldBase} cursor-pointer`}
        >
          {inquiry.needs.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className={labelBase} htmlFor="scale">
            规模
          </label>
          <select
            id="scale"
            name="scale"
            defaultValue={inquiry.scales[0]}
            className={`${fieldBase} cursor-pointer`}
          >
            {inquiry.scales.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className={labelBase} htmlFor="timeline">
            时间预期
          </label>
          <select
            id="timeline"
            name="timeline"
            defaultValue={inquiry.timelines[0]}
            className={`${fieldBase} cursor-pointer`}
          >
            {inquiry.timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className={labelBase} htmlFor="message">
          补充说明（选填）
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="负载类型、功率密度、隔离要求、是否需要闭环交付等"
          className={`${fieldBase} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-lg font-medium text-[#241a05] transition-colors duration-200 hover:bg-gold-soft"
      >
        生成询价邮件
        <ArrowRight className="size-4" aria-hidden />
      </button>

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`min-h-6 text-base leading-relaxed ${
          status.kind === "error" ? "text-red-300" : "text-ink-2"
        }`}
      >
        {status.message}
        {status.kind === "success" && (
          <>
            {" "}邮件客户端未打开时，可复制或点击邮箱：
            <a
              href={`mailto:${INQUIRY_RECIPIENT}`}
              className="cursor-pointer text-gold underline underline-offset-4"
            >
              {INQUIRY_RECIPIENT}
            </a>
          </>
        )}
      </div>

      <p className="text-base leading-relaxed text-ink-3">{inquiry.note}</p>
    </form>
  );
}
