import { trustPoints } from "@/content/site";

export function TrustStrip() {
  return (
    <section id="trust" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <p className="portal-eyebrow">合作基础</p>
        <ul className="mt-7 grid gap-6 md:grid-cols-3">
          {trustPoints.map((point) => (
            <li key={point.id} className="border-l border-gold/50 pl-5">
              <h2 className="text-xl font-semibold text-ink">{point.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{point.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
