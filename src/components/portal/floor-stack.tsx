import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type FloorTone = "gold" | "compute" | "create" | "grow";

type Floor = {
  code: string;
  title: string;
  description: string;
  tone: FloorTone;
};

type FloorStackProps = {
  floors: Floor[];
  compact?: boolean;
};

const toneClassNames: Record<FloorTone, string> = {
  gold: "floor-tone-gold",
  compute: "floor-tone-compute",
  create: "floor-tone-create",
  grow: "floor-tone-grow",
};

export function FloorStack({ floors, compact = false }: FloorStackProps) {
  return (
    <ol className={cn("floor-stack", compact && "floor-stack-compact")}>
      {floors.map((floor) => (
        <li className="floor-stack-item" key={floor.code}>
          <span className={cn("floor-code", toneClassNames[floor.tone])}>
            {floor.code}
          </span>
          <div>
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
              {floor.title}
            </h3>
            <p className="mt-2 max-w-2xl leading-7 text-[var(--jt-ink-2)]">
              {floor.description}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-5 text-[var(--jt-ink-3)]"
            strokeWidth={1.5}
          />
        </li>
      ))}
    </ol>
  );
}
