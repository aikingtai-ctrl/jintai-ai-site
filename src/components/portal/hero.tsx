import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PortalHero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
        <p className="portal-eyebrow">城区算力与内容交付基础设施</p>
        <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight sm:text-6xl">
          让算力、场景与客户，发生在同一栋楼里
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2">
          金泰 AI 以场景协同、空间交流与内容交付，支持合作从目标沟通走向持续落地。
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#cooperation"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
          >
            了解合作方式
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/ai-center/#visit"
            className="inline-flex min-h-11 items-center rounded-md border border-border px-6 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
          >
            参观 AI 中心
          </Link>
        </div>
      </div>
    </section>
  );
}
