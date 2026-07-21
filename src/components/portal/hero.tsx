import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FloorStack } from "@/components/portal/floor-stack";
import { SignalMark } from "@/components/portal/signal-mark";
import { floorStories } from "@/content/site";

const heroTones = ["gold", "compute", "create"] as const;

export function PortalHero() {
  return (
    <section id="hero" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)] lg:items-end">
        <div>
          <SignalMark label="Jintai AI center" />
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[var(--portal-text)] sm:text-6xl">
            让算力、场景与客户，发生在同一栋楼里
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--portal-muted)]">
            金泰 AI 以场景协同、空间交流与内容交付，支持合作从目标沟通走向持续落地。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#cooperation"
              prefetch={false}
              className="portal-focus-ring inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
            >
              了解合作方式
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/ai-center/#visit"
              prefetch={false}
              className="portal-focus-ring inline-flex min-h-11 items-center rounded-md border border-border px-6 py-3 font-medium text-[var(--portal-text)] transition-colors hover:border-gold hover:text-gold"
            >
              参观 AI 中心
            </Link>
          </div>
        </div>
        <div className="border-l border-gold/30 pl-6">
          <p className="portal-eyebrow">空间剖面</p>
          <FloorStack
            compact
            floors={floorStories.slice(0, 3).map((story, index) => ({
              code: story.label,
              title: story.title,
              description: story.summary,
              tone: heroTones[index] ?? "gold",
            }))}
          />
        </div>
      </div>
    </section>
  );
}
