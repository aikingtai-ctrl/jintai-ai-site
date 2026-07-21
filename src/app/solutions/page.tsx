import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { solutionGroups } from "@/content/site";

export default function SolutionsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="解决方案"
          title="从不同合作场景出发，组织可落地的协同"
          summary="面向政企与媒体、产业伙伴、院校与招商等方向，建立从场景验证到持续交付的合作路径。"
          primaryHref="#government"
          primaryLabel="查看合作场景"
        />
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          {solutionGroups.map((group) => (
            <section key={group.id} id={group.id} className="border-t border-border py-10 first:border-t-0 first:pt-0">
              <p className="portal-eyebrow">合作场景</p>
              <h2 className="mt-4 text-3xl font-semibold">{group.title}</h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">{group.summary}</p>
            </section>
          ))}
        </div>
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <p className="portal-eyebrow">业务咨询</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">找到适合的合作起点</h2>
            <InquiryForm defaultKind="业务咨询" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
