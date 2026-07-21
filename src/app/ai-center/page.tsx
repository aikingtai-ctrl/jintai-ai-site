import { InquiryForm } from "@/components/inquiry-form";
import { FloorStack } from "@/components/portal/floor-stack";
import { PageHero } from "@/components/portal/page-hero";
import { SectionHeading } from "@/components/portal/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { floorStories } from "@/content/site";

const floorTones = ["gold", "compute", "create", "grow"] as const;

export default function AiCenterPage() {
  return (
    <>
      <SiteHeader currentPath="/ai-center/" />
      <main id="main">
        <PageHero
          eyebrow="AI 中心"
          title="一栋楼，承接从交流到交付的全过程"
          summary="展示、场景验证、生产交付与生态协同在同一空间发生，让合作对话进入真实工作现场。"
          primaryHref="#visit"
          primaryLabel="预约参观"
          sectionNumber="03"
          signalTone="create"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <SectionHeading
              eyebrow="中心楼层"
              title="一栋楼，组织从会面到协同生产的工作流"
              description="每一层对应一个可被看见、讨论与推进的协同环节。"
            />
            <div className="mt-12">
              <FloorStack
                floors={floorStories.map((story, index) => ({
                  code: story.label,
                  title: story.title,
                  description: story.summary,
                  tone: floorTones[index],
                }))}
              />
            </div>
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
