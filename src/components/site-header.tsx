import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand";
import { nav, site } from "@/content/site";

/**
 * 吸顶导航。移动端用 <details> 实现折叠菜单——无需客户端 JS，
 * 保持整个页面为 Server Component（Next 建议默认不加 'use client'）。
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-night/70 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex h-24 max-w-7xl items-center gap-8 px-6">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-3 text-gold transition-opacity duration-200 hover:opacity-80"
        >
          <Logo className="size-9" />
          <span className="text-xl font-semibold tracking-[0.12em]">
            {site.name}
          </span>
        </Link>

        <nav aria-label="主导航" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="cursor-pointer text-base text-ink-2 transition-colors duration-200 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#contact"
          className="ml-auto hidden shrink-0 cursor-pointer items-center rounded-md bg-gold px-6 py-3 text-base font-medium text-[#241a05] transition-colors duration-200 hover:bg-gold-soft lg:ml-0 lg:inline-flex"
        >
          业务咨询
        </Link>

        {/* 移动端菜单 */}
        <details className="group relative ml-auto lg:hidden">
          <summary
            className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-ink-2 transition-colors duration-200 hover:text-gold [&::-webkit-details-marker]:hidden"
            aria-label="打开导航菜单"
          >
            <Menu className="size-6" aria-hidden />
          </summary>
          <div className="absolute right-0 top-full mt-3 w-60 glass rounded-xl p-2">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block cursor-pointer rounded-md px-4 py-3 text-base text-ink-2 transition-colors duration-200 hover:bg-night-3 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </header>
  );
}
