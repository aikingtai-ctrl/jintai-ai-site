import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

// 仅拉丁子集：中文交给系统字栈，避免为 CJK 拉取数 MB 字体
const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "城区算力",
    "机柜托管",
    "场景协同",
    "影像修复",
    "后期技术服务",
    "AI 产业中心",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0F1C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      className={`dark ${lexend.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="portal-shell flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#241a05]"
        >
          跳到主要内容
        </a>
        {children}
      </body>
    </html>
  );
}
