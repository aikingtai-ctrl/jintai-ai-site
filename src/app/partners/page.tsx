import { InquiryForm } from "@/components/inquiry-form";
import { PageHero } from "@/components/portal/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { partnerRoles } from "@/content/site";

export default function PartnersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="合作伙伴"
          title="围绕场景、内容与人才共建生态"
          summary="连接政企与媒体、产业伙伴、院校与招商等合作角色，在具体场景中持续推进协同。"
          primaryHref="#inquiry"
          primaryLabel="发起生态合作"
        />
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-7xl px-6 py-24">
            <ul className="portal-grid">
              {partnerRoles.map((role) => (
                <li key={role.id} className="portal-link-card">
                  <h2 className="text-2xl font-semibold">{role.title}</h2>
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
