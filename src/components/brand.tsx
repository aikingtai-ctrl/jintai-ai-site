import { cn } from "@/lib/utils";

/**
 * 金泰 K 形标识。
 * 构造＝一个统一圆角方形被两条 45° 等宽通道切开（不是三块各自倒角拼接）。
 *   外框 15..497，圆角 r=70，仅外框四角圆角、切口尖角保持锐利
 *   上通道 x+y ∈ [328, 394]，全幅
 *   下通道 y−x ∈ [70, 136]，且只在 x+y > 328 一侧
 *          （若不加这个限制，上通道左侧会被多切出第四块）
 */
export function Logo({ className }: { className?: string }) {
  const id = "jt-k-mask";
  return (
    <svg
      viewBox="0 0 512 512"
      role="img"
      aria-label="金泰 AI"
      className={cn("size-8", className)}
    >
      <mask id={id}>
        <rect x="15" y="15" width="482" height="482" rx="70" fill="#fff" />
        <polygon points="-200,528 628,-300 628,-234 -200,594" fill="#000" />
        <polygon points="129,199 628,698 628,764 96,232" fill="#000" />
      </mask>
      <rect
        x="15"
        y="15"
        width="482"
        height="482"
        rx="70"
        fill="currentColor"
        mask={`url(#${id})`}
      />
    </svg>
  );
}

/** 章节小标题：编号 + 标签 */
export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="slate flex items-center gap-3.5 text-xs text-gold">
      {index ? <span className="tnum text-gold-dim">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}

/** 待核实标记 —— 对外发布前必须清零 */
export function UnverifiedMark({ label = "待核实" }: { label?: string }) {
  return (
    <span
      title="该数据尚未完成核实，对外发布前须据实修订"
      className="ml-2 inline-block rounded border border-alert/40 px-1.5 py-px align-middle text-xs font-medium text-alert"
    >
      {label}
    </span>
  );
}
