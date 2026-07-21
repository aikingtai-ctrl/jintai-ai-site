import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FloorStack } from "@/components/portal/floor-stack";
import { SectionHeading } from "@/components/portal/section-heading";
import { floorStories } from "@/content/site";

const centerTones = ["gold", "compute", "create", "grow"] as const;

export function CenterStory() {
  return (
    <section id="center" className="surface-stone border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <SectionHeading
            eyebrow="AI 中心"
            title="一栋楼，承接从交流到交付的全过程"
            description="展示、验证、生产与生态协同在同一个空间发生，让对话能够进入真实的工作现场。"
          />
          <Link
            href="/ai-center/#visit"
            className="portal-focus-ring mt-8 inline-flex min-h-11 items-center gap-2 text-[var(--portal-accent)] transition-colors hover:text-gold"
          >
            预约参观
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <FloorStack
          floors={floorStories.map((story, index) => ({
            code: story.label,
            title: story.title,
            description: story.summary,
            tone: centerTones[index] ?? "gold",
          }))}
        />
      </div>
    </section>
  );
}
