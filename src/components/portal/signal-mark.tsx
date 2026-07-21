import { Radio } from "lucide-react";

import { cn } from "@/lib/utils";

type SignalTone = "gold" | "compute" | "create" | "grow";

type SignalMarkProps = {
  label: string;
  tone?: SignalTone;
};

export function SignalMark({ label, tone = "gold" }: SignalMarkProps) {
  return (
    <span aria-label={label} className={cn("signal-mark", `signal-${tone}`)}>
      <Radio aria-hidden="true" className="size-4" strokeWidth={1.75} />
      <span>{label}</span>
    </span>
  );
}
