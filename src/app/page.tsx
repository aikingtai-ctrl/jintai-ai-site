import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AudiencePaths } from "@/components/portal/audience-paths";
import { CenterStory } from "@/components/portal/center-story";
import { CooperationPath } from "@/components/portal/cooperation-path";
import { PortalHero } from "@/components/portal/hero";
import { TrustStrip } from "@/components/portal/trust-strip";

export default function HomePage() {
  return (
    <>
      <SiteHeader currentPath="/" />
      <main id="main">
        <PortalHero />
        <TrustStrip />
        <AudiencePaths />
        <CenterStory />
        <CooperationPath />
      </main>
      <SiteFooter />
    </>
  );
}
