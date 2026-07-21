import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/portal/section-heading";
import { SignalMark } from "@/components/portal/signal-mark";
import { cooperationPaths } from "@/content/site";

const pathTones = ["compute", "create", "grow"] as const;

export function AudiencePaths() {
  return (
    <section id="capabilities" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <SectionHeading
          eyebrow="能力矩阵"
          title="从场景出发，连接空间、能力与交付"
          description="选择当前最需要推进的方向，再进入相应的协同路径。"
        />
        <ul className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
          {cooperationPaths.map((path, index) => (
            <li key={path.id}>
              <Link href={path.href} prefetch={false}
                className="portal-focus-ring glass glass-hover block h-full rounded-lg p-6 text-[var(--portal-text)]"
              >
                <SignalMark label={path.id} tone={pathTones[index] ?? "gold"} />
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">{path.title}</h3>
                <p className="mt-4 leading-relaxed text-[var(--portal-muted)]">{path.summary}</p>
                <span className="mt-10 inline-flex min-h-11 items-center gap-2 text-gold">
                  查看路径
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
