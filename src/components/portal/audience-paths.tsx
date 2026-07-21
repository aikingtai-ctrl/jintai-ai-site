import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cooperationPaths } from "@/content/site";

export function AudiencePaths() {
  return (
    <section id="paths" className="border-b border-border">
      <div className="mx-auto w-full max-w-7xl px-6 py-24">
        <p className="portal-eyebrow">合作路径</p>
        <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight">
          从你的场景出发，找到适合的协同方式
        </h2>
        <ul className="portal-grid mt-12">
          {cooperationPaths.map((path) => (
            <li key={path.id}>
              <Link href={path.href} className="portal-link-card h-full">
                <h3 className="text-2xl font-semibold">{path.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-2">{path.summary}</p>
                <span className="mt-8 inline-flex min-h-11 items-center gap-2 text-gold">
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
