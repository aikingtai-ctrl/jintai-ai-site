import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircleCheck,
  Landmark,
  MapPin,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel, UnverifiedMark } from "@/components/brand";
import {
  advantages,
  audiences,
  businesses,
  faqs,
  heroFacts,
  inquiry,
  pricing,
  site,
} from "@/content/site";
import { InquiryForm } from "@/components/inquiry-form";

const shell = "mx-auto w-full max-w-7xl px-6";

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <section className="letterbox relative overflow-hidden border-b border-border">
      {/* 玻璃背后的被折射物：两团缓慢漂移的色光。
          颗粒挂在这一层而非 section——section 的 ::after 已被 letterbox 占用 */}
      <div aria-hidden className="grain pointer-events-none absolute inset-0">
        <div
          className="aurora"
          style={{
            width: "58rem",
            height: "34rem",
            left: "-14rem",
            top: "-16rem",
            background:
              "radial-gradient(circle, rgba(232,181,77,0.30), transparent 66%)",
          }}
        />
        <div
          className="aurora"
          style={{
            width: "46rem",
            height: "30rem",
            right: "-10rem",
            top: "2rem",
            animationDelay: "-13s",
            background:
              "radial-gradient(circle, rgba(76,201,255,0.20), transparent 68%)",
          }}
        />
        {/* 变形宽银幕炫光，压在首屏视觉中线上 */}
        <div className="anamorphic" style={{ top: "38%" }} />
      </div>

      <div className={`${shell} relative z-[1] py-32 sm:py-40`}>
        <p className="slate inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-night-2/50 px-5 py-2 text-xs text-gold backdrop-blur-md">
          <MapPin className="size-4" aria-hidden />
          Beijing · Chang&apos;an Ave
        </p>

        {/* 窄屏用 2rem，避免标题出现孤字。 */}
        <h1 className="mt-10 max-w-5xl text-[2rem] font-bold leading-[1.16] tracking-tight sm:text-6xl lg:text-7xl">
          面向政企、产业与院校的
          <span className="text-gold">AI 场景协同</span>
          <br />
          与内容交付服务
        </h1>

        <p className="mt-9 max-w-3xl text-xl leading-relaxed text-ink-2">
          {site.description}
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-gold px-8 py-4 text-lg font-medium text-[#241a05] transition-colors duration-200 hover:bg-gold-soft"
          >
            业务咨询
            <ArrowRight className="size-5" aria-hidden />
          </Link>
          <Link
            href="#compute"
            className="glass glass-hover inline-flex cursor-pointer items-center gap-2.5 rounded-lg px-8 py-4 text-lg text-ink"
          >
            查看算力节点
          </Link>
        </div>

        <dl className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {heroFacts.map((f) => (
            <div key={f.label} className="glass glass-hover rounded-2xl p-8">
              <dd className="tnum text-5xl font-semibold text-gold">
                {f.value}
                <span className="ml-2 text-xl font-normal text-gold-dim">
                  {f.unit}
                </span>
              </dd>
              <dt className="mt-4 text-lg text-ink">
                {f.label}
                {"unverified" in f && f.unverified ? <UnverifiedMark /> : null}
              </dt>
              <p className="mt-1.5 text-base text-ink-3">{f.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Business */

const businessIcon = {
  compute: Server,
  delivery: ShieldCheck,
  center: Building2,
} as const;

export function BusinessSections() {
  return (
    <>
      {businesses.map((b, i) => {
        const Icon = businessIcon[b.id as keyof typeof businessIcon];
        return (
          <section
            key={b.id}
            id={b.id}
            className="relative overflow-hidden border-b border-border"
          >
            {/* 每节一团低亮度环境光，交替左右，形成推轨般的节奏 */}
            <div
              aria-hidden
              className="aurora"
              style={{
                width: "40rem",
                height: "26rem",
                [i % 2 === 0 ? "left" : "right"]: "-12rem",
                top: "6rem",
                animationDelay: `${-7 * i}s`,
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle, rgba(232,181,77,0.13), transparent 68%)"
                    : "radial-gradient(circle, rgba(160,140,255,0.13), transparent 68%)",
              }}
            />

            <div className={`${shell} relative py-28`}>
              <div className="grid gap-14 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-20">
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <SectionLabel index={b.index}>业务</SectionLabel>
                  <h2 className="mt-6 flex items-start gap-4 text-4xl font-bold leading-tight sm:text-5xl">
                    <Icon
                      className="mt-1.5 size-9 shrink-0 text-gold"
                      aria-hidden
                    />
                    {b.title}
                  </h2>
                  <p className="mt-6 text-xl text-ink">{b.lead}</p>
                  <p className="mt-5 text-lg leading-relaxed text-ink-2">
                    {b.body}
                  </p>
                </div>

                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {b.items.map((item) => (
                    <li
                      key={item.title}
                      className="glass glass-hover flex flex-col rounded-2xl p-7"
                    >
                      <p className="slate text-xs text-gold-dim">{item.spec}</p>
                      <h3 className="mt-4 text-2xl font-semibold text-gold-soft">
                        {item.title}
                      </h3>
                      <p className="mt-4 flex-1 text-base leading-relaxed text-ink-2">
                        {item.desc}
                      </p>
                      <p className="mt-6 border-t border-border pt-4 text-base text-ink-3">
                        {item.audience}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------ Advantages */

export function Advantages() {
  return (
    <section id="why" className="relative overflow-hidden border-b border-border">
      <div className={`${shell} py-28`}>
        <SectionLabel>为什么是金泰</SectionLabel>
        <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
          围绕实际需求推进服务与协同
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
          通过场景沟通、联合验证与内容交付支持，推进项目合作。
        </p>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <li key={a.no} className="glass glass-hover rounded-2xl p-8">
              <p className="tnum slate text-xs text-gold-dim">{a.no}</p>
              <h3 className="mt-5 text-2xl font-semibold text-gold-soft">
                {a.title}
                {"unverified" in a && a.unverified ? <UnverifiedMark /> : null}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-2">
                {a.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Audiences */

export function Audiences() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="aurora"
        style={{
          width: "44rem",
          height: "26rem",
          left: "30%",
          top: "-8rem",
          animationDelay: "-19s",
          background:
            "radial-gradient(circle, rgba(76,201,255,0.13), transparent 68%)",
        }}
      />
      <div className={`${shell} relative py-28`}>
        <SectionLabel>服务对象</SectionLabel>
        <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
          三类合作伙伴
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
          面向政企与媒体、产业伙伴以及院校与招商方向开展协作。
        </p>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <li
              key={a.title}
              className={`glass glass-hover rounded-2xl p-8 ${
                "featured" in a && a.featured ? "glass-gold" : ""
              }`}
            >
              <h3 className="flex items-center gap-3 text-2xl font-semibold text-gold-soft">
                <Landmark className="size-5 shrink-0 text-gold" aria-hidden />
                {a.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-2">
                {a.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Pricing */

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="aurora"
        style={{
          width: "50rem",
          height: "30rem",
          right: "-14rem",
          top: "4rem",
          animationDelay: "-5s",
          background:
            "radial-gradient(circle, rgba(232,181,77,0.14), transparent 68%)",
        }}
      />
      <div className={`${shell} relative py-28`}>
        <SectionLabel>合作方式</SectionLabel>
        <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
          {pricing.lead}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
          {pricing.note}
        </p>

        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {pricing.plans.map((p) => (
            <li
              key={p.id}
              className={`glass glass-hover flex flex-col rounded-2xl p-8 ${
                "featured" in p && p.featured ? "glass-gold" : ""
              }`}
            >
              <p className="slate text-xs text-gold-dim">{p.spec}</p>
              <h3 className="mt-4 text-2xl font-semibold text-gold-soft">
                {p.name}
              </h3>
              <p className="mt-5 inline-flex w-fit rounded-md border border-border px-3 py-1.5 text-base text-ink-2">
                计价方式：{p.basis}
              </p>

              <p className="slate mt-9 text-xs text-gold-dim">包含</p>
              <ul className="mt-4 space-y-3">
                {p.includes.map((t) => (
                  <li key={t} className="flex gap-3">
                    <CircleCheck
                      className="mt-1 size-4 shrink-0 text-gold"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-ink-2">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="slate mt-9 text-xs text-gold-dim">计价依据</p>
              <ul className="mt-4 flex-1 space-y-3">
                {p.billing.map((t) => (
                  <li key={t} className="text-base leading-relaxed text-ink-3">
                    {t}
                  </li>
                ))}
              </ul>

              <Link
                href="#contact"
                className="mt-9 inline-flex min-h-11 cursor-pointer items-center gap-2 border-t border-border pt-5 text-lg text-gold transition-colors duration-200 hover:text-gold-soft"
              >
                发起合作咨询
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>

        <div className="glass mt-14 rounded-2xl p-8">
          <p className="slate text-xs text-gold-dim">增值项（可选，不捆绑）</p>
          <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.addons.map((a) => (
              <div key={a.name}>
                <dt className="text-lg text-ink">{a.name}</dt>
                <dd className="mt-1 text-base text-ink-3">{a.basis}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

export function Faq() {
  return (
    <section className="border-b border-border">
      <div className={`${shell} py-28`}>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>常见问答</SectionLabel>
            <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              客户最常问的六个问题
            </h2>
          </div>
          {/* Base UI 的 Accordion 默认 multiple={false}，即单开且可折叠；
              它没有 Radix 的 type / collapsible 属性，传了会泄漏到 DOM */}
          <Accordion className="glass w-full rounded-2xl px-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`q${i}`}>
                <AccordionTrigger className="cursor-pointer py-6 text-left text-xl font-medium hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-ink-2">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

const contactPoints = [
  { icon: Zap, text: "围绕实际业务需求组织服务与交付" },
  { icon: Server, text: "支持多方参与的场景沟通与联合验证" },
  { icon: ShieldCheck, text: "可预约了解空间、服务与合作方向" },
  { icon: CircleCheck, text: "提供面向项目的内容生产与交付支持" },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div
        aria-hidden
        className="aurora"
        style={{
          width: "52rem",
          height: "30rem",
          left: "-8rem",
          bottom: "-10rem",
          animationDelay: "-22s",
          background:
            "radial-gradient(circle, rgba(232,181,77,0.16), transparent 68%)",
        }}
      />
      <div className={`${shell} relative py-28`}>
        <div className="glass glass-gold grain relative overflow-hidden rounded-3xl">
          <div className="anamorphic" style={{ top: "0" }} />
          <div className="grid lg:grid-cols-2">
            <div className="p-10 sm:p-14">
              <SectionLabel>联系我们</SectionLabel>
              <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                {site.contact.label}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-2">
                {site.contact.note}
              </p>

              <dl className="mt-12 space-y-6">
                <div>
                  <dt className="slate text-xs text-ink-3">邮箱</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="inline-flex min-h-11 cursor-pointer items-center text-xl text-gold transition-colors duration-200 hover:text-gold-soft"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="slate text-xs text-ink-3">地址</dt>
                  <dd className="mt-1.5 text-xl text-ink">
                    {site.contact.address}
                  </dd>
                </div>
              </dl>

              <p className="slate mt-14 text-xs text-gold-dim">交付前提</p>
              <ul className="mt-6 space-y-4">
                {contactPoints.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-3.5">
                    <Icon
                      className="mt-1 size-5 shrink-0 text-gold"
                      aria-hidden
                    />
                    <span className="text-base leading-relaxed text-ink-2">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border bg-night/40 p-10 backdrop-blur-xl sm:p-14 lg:border-l lg:border-t-0">
              <p className="slate text-xs text-gold-dim">{inquiry.title}</p>
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
