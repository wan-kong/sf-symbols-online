"use client";
import type { SFIcon } from "@/types/icons";
import { IconCard } from "./icon-card";

interface VirtualizedIconGridProps {
  icons: SFIcon[];
}

export function VirtualizedIconGrid({ icons }: VirtualizedIconGridProps) {
  return (
    <div className="h-full overflow-auto">
      <div
        className="grid gap-1 p-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(116px, 1fr))",
        }}
      >
        {icons.map((icon) => (
          <IconCard icon={icon} key={icon.name} />
        ))}
      </div>
    </div>
  );
}
