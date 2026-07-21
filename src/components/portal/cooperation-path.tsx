import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/portal/section-heading";

const steps = ["提出目标", "匹配能力与空间", "现场交流/场景验证", "共建与持续交付"];

export function CooperationPath() {
  return (
    <>
      <section id="cooperation" className="border-b border-border">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <SectionHeading
            eyebrow="开始合作"
            title="把想法带来，一起找到落地路径"
            description="从目标沟通到场景验证，再进入共建与持续交付。"
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step} className="glass flex min-h-24 items-center gap-5 rounded-lg p-6">
                <span className="text-sm font-semibold tracking-[0.14em] text-gold">0{index + 1}</span>
                <span className="text-lg text-[var(--portal-text)]">{step}</span>
                {index < steps.length - 1 ? (
                  <span aria-hidden className="ml-auto text-gold">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="inquiry" className="surface-stone">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <SectionHeading
            eyebrow="业务咨询"
            title="留下方向，我们准备下一次交流"
            description="请留下单位与需求方向；提交信息将由本机邮件客户端发出。"
          />
          <div className="bg-night-2 rounded-lg border border-border p-6 shadow-2xl sm:p-8">
            <InquiryForm defaultKind="业务咨询" />
          </div>
        </div>
      </section>
    </>
  );
}
