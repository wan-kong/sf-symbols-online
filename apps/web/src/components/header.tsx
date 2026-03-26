"use client";

import { Apple, ExternalLink, Github } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Apple className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-base leading-tight">
              SF Symbols Online
            </h1>
            <p className="text-muted-foreground text-xs">
              Browse & copy Apple SF Symbols
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href="https://github.com/wan-kong/sf-symbols-online"
            rel="noopener noreferrer"
            target="_blank"
            title="GitHub"
          >
            <Github className="size-4" />
          </a>
          <a
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href="https://github.com/andrewtavis/sf-symbols-online"
            rel="noopener noreferrer"
            target="_blank"
            title="Based on andrewtavis/sf-symbols-online"
          >
            <ExternalLink className="size-4" />
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
