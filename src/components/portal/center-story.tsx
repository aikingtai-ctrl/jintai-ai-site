import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { floorStories } from "@/content/site";

export function CenterStory() {
  return (
    <section id="center" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <p className="portal-eyebrow">AI 中心</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight">一栋楼，承接从交流到交付的全过程</h2>
          <p className="mt-6 leading-relaxed text-ink-2">
            在同一个空间里完成展示、验证、生产与生态协同，让对话能够进入真实的工作现场。
          </p>
          <Link
            href="/ai-center/#visit"
            className="mt-8 inline-flex min-h-11 items-center gap-2 text-gold transition-colors hover:text-gold-soft"
          >
            预约参观
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ol>
          {floorStories.map((story) => (
            <li key={story.id} className="portal-floor-row">
              <span className="pt-1 font-semibold text-gold">{story.label}</span>
              <div>
                <h3 className="text-xl font-semibold">{story.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-2">{story.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
