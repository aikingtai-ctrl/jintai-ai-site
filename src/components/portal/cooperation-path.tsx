import { InquiryForm } from "@/components/inquiry-form";

const steps = ["提出目标", "匹配能力与空间", "现场交流/场景验证", "共建与持续交付"];

export function CooperationPath() {
  return (
    <section id="cooperation">
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <div className="grid gap-12 rounded-xl border border-border bg-night-2 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="portal-eyebrow">开始合作</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">把想法带来，一起找到落地路径</h2>
            <ol className="mt-10 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-center gap-3 text-lg text-ink-2">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-sm font-semibold text-gold">
                    {index + 1}
                  </span>
                  {step}
                  {index < steps.length - 1 ? (
                    <span aria-hidden className="text-gold">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">业务咨询</h3>
            <p className="mt-3 leading-relaxed text-ink-2">留下单位和需求方向，我们将在一个工作日内回复。</p>
            <InquiryForm defaultKind="业务咨询" />
          </div>
        </div>
      </div>
    </section>
  );
}
