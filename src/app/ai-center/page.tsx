import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { floorStories } from "@/content/site";

export default function AiCenterPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="AI 中心"
          title="一栋楼，承接从交流到交付的全过程"
          summary="展示、场景验证、生产交付与生态协同在同一空间发生，让合作对话进入真实工作现场。"
          primaryHref="#visit"
          primaryLabel="预约参观"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <ol>
              {floorStories.map((story) => (
                <li key={story.id} className="portal-floor-row">
                  <span className="pt-1 font-semibold text-gold">{story.label}</span>
                  <div>
                    <h2 className="text-2xl font-semibold">{story.title}</h2>
                    <p className="mt-3 leading-relaxed text-ink-2">{story.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="visit">
          <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <p className="portal-eyebrow">预约参观</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">来现场了解空间与合作方向</h2>
            <InquiryForm defaultKind="预约参观" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
