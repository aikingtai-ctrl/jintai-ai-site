import Link from "next/link";
import { Logo } from "@/components/brand";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-night-2/50">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div>
            <div className="flex min-h-11 items-center gap-3 text-gold">
              <Logo className="size-7" />
              <span className="text-lg font-semibold tracking-[0.12em]">
                {site.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-3">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="页脚导航">
            <ul className="grid grid-cols-2 gap-x-12 sm:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  {/* min-h-11 = 44px，满足触控目标最小尺寸 */}
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 cursor-pointer items-center text-base text-ink-2 transition-colors duration-200 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-base text-ink-3">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>页面数据以核实清单修订为准</p>
        </div>
      </div>
    </footer>
  );
}
