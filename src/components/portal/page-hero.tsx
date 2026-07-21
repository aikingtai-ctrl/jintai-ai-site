import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  summary,
  primaryHref,
  primaryLabel,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  primaryHref: string;
  primaryLabel: string;
}) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32">
        <p className="portal-eyebrow">{eyebrow}</p>
        <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight sm:text-6xl">
          {title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-ink-2">
          {summary}
        </p>
        <Link
          href={primaryHref}
          className="mt-10 inline-flex min-h-11 items-center gap-2 rounded-md bg-gold px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-gold-soft"
        >
          {primaryLabel}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
