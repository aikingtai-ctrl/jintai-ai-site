import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SectionHeading } from "@/components/portal/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { aboutPoints, site } from "@/content/site";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="关于我们"
          title={`${site.name}，面向真实场景组织协同与交付`}
          summary={site.description}
          primaryHref="#contact"
          primaryLabel="联系合作"
          sectionNumber="05"
          signalTone="gold"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <SectionHeading
              eyebrow="品牌原则"
              title="让每一次合作回到真实场景、明确边界与可持续交付"
              description="我们公开展示能被验证的服务方向，并为下一步沟通保留清晰入口。"
            />
            <ul className="portal-grid mt-12">
              {aboutPoints.map((point) => (
                <li key={point.id} className="portal-link-card">
                  <h3 className="text-2xl font-semibold">{point.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-2">{point.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="contact">
          <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <p className="portal-eyebrow">业务咨询</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">让我们从你的需求开始</h2>
            <InquiryForm defaultKind="业务咨询" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
