import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SectionHeading } from "@/components/portal/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { partnerRoles } from "@/content/site";

export default function PartnersPage() {
  return (
    <>
      <SiteHeader currentPath="/partners/" />
      <main id="main">
        <PageHero
          eyebrow="合作伙伴"
          title="围绕场景、内容与人才共建生态"
          summary="连接政企与媒体、产业伙伴、院校与招商等合作角色，在具体场景中持续推进协同。"
          primaryHref="#inquiry"
          primaryLabel="发起生态合作"
          sectionNumber="04"
          signalTone="grow"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <SectionHeading
              eyebrow="共建对象"
              title="连接能够共同验证场景、生产内容与培养人才的伙伴"
              description="每一类伙伴都从明确的合作角色开始，再进入长期协同。"
            />
            <ul className="portal-grid mt-12">
              {partnerRoles.map((role) => (
                <li key={role.id} className="portal-link-card">
                  <h3 className="text-2xl font-semibold">{role.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-2">{role.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section id="inquiry">
          <div className="mx-auto w-full max-w-3xl px-6 py-24">
            <p className="portal-eyebrow">生态合作</p>
            <h2 className="mt-5 text-4xl font-bold leading-tight">一起定义下一步协同</h2>
            <InquiryForm defaultKind="生态合作" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
