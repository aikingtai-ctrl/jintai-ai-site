import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { trustPoints } from "@/content/site";

export default function CapabilitiesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="能力服务"
          title="把场景沟通转化为可推进的协同工作"
          summary="围绕实际业务需求组织服务、协同和内容交付，让每一次沟通都有清晰的下一步。"
          primaryHref="#inquiry"
          primaryLabel="发起业务咨询"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <ul className="portal-grid">
              {trustPoints.map((point) => (
                <li key={point.id} className="portal-link-card">
                  <h2 className="text-2xl font-semibold">{point.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink-2">{point.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="inquiry">
          <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <p className="portal-eyebrow">业务咨询</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">说说你的场景与目标</h2>
            <InquiryForm defaultKind="业务咨询" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
