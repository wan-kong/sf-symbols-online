"use client";
import { cn } from "@sf-symbols-online/ui/lib/utils";
import { useCopyIconName } from "@/hooks/use-copy-icon-name";
import type { SFIcon } from "@/types/icons";

interface IconCardProps {
  className?: string;
  icon: SFIcon;
}

export function IconCard({ icon, className }: IconCardProps) {
  const { copiedName, copyToClipboard } = useCopyIconName();

  const isCopied = copiedName === icon.name;

  return (
    <button
      className={cn(
        "group flex h-25 w-29 flex-col items-center justify-center gap-1 rounded-lg p-2",
        "cursor-pointer transition-colors hover:bg-muted/50",
        "focus:outline-none focus:ring-1 focus:ring-ring/50",
        isCopied && "bg-primary/10 ring-1 ring-primary/50",
        className
      )}
      onClick={() => copyToClipboard(icon.name)}
      title={icon.name}
      type="button"
    >
      <div className="relative flex size-10 items-center justify-center">
        {/* biome-ignore lint/performance/noImgElement: Static icons from symlink, not optimized by Next.js */}
        <img
          alt={icon.name}
          className="size-8 object-contain dark:invert"
          height={32}
          loading="lazy"
          src={icon.path}
          width={32}
        />
      </div>
      <span className="max-w-full truncate text-[10px] text-muted-foreground transition-colors group-hover:text-foreground">
        {icon.name}
      </span>
    </button>
  );
}
