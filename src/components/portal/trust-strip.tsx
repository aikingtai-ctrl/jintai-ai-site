import { SectionHeading } from "@/components/portal/section-heading";
import { SignalMark } from "@/components/portal/signal-mark";
import { trustPoints } from "@/content/site";

const trustTones = ["gold", "compute", "grow"] as const;

export function TrustStrip() {
  return (
    <section id="trust" className="surface-stone border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="合作基础"
          title="把每一次沟通带进可验证的现场"
          description="围绕真实需求组织交流、协同与交付，让合作路径始终有清晰的下一步。"
        />
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <li key={point.id} className="border-t border-current/20 pt-5">
              <SignalMark label={point.id} tone={trustTones[index] ?? "gold"} />
              <h3 className="mt-5 text-xl font-semibold text-[var(--portal-text)]">{point.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--portal-muted)]">{point.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
