import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SignalMark } from "@/components/portal/signal-mark";

export function PageHero({
  eyebrow,
  title,
  summary,
  primaryHref,
  primaryLabel,
  sectionNumber,
  signalTone = "gold",
}: {
  eyebrow: string;
  title: string;
  summary: string;
  primaryHref: string;
  primaryLabel: string;
  sectionNumber: string;
  signalTone?: "gold" | "compute" | "create" | "grow";
}) {
  return (
    <section className="surface-stone architect-grid border-b border-black/10">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:py-32 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end">
        <div>
          <p className="portal-eyebrow">{eyebrow}</p>
          <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-[var(--portal-text)] sm:text-6xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[var(--portal-muted)]">
            {summary}
          </p>
          <Link
            href={primaryHref}
            className="portal-focus-ring mt-10 inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
          >
            {primaryLabel}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="border-l border-black/15 pl-6 lg:pb-1">
          <p className="text-6xl font-semibold tracking-[-0.06em] text-[var(--portal-text)]">
            {sectionNumber}
          </p>
          <SignalMark label={eyebrow} tone={signalTone} />
        </div>
      </div>
    </section>
  );
}
