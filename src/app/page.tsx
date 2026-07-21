import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Advantages,
  Audiences,
  BusinessSections,
  Contact,
  Faq,
  Hero,
  Pricing,
} from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <BusinessSections />
        <Advantages />
        <Audiences />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
