"use client";
import { Button } from "@sf-symbols-online/ui/components/button";
import { Input } from "@sf-symbols-online/ui/components/input";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface SearchBarProps {
  onChange: (value: string) => void;
  value: string;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
      <Input
        className="pr-9 pl-9"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search icons... (⌘K)"
        ref={inputRef}
        type="text"
        value={value}
      />
      {value && (
        <Button
          className="absolute right-1 size-7"
          onClick={handleClear}
          size="icon-xs"
          variant="ghost"
        >
          <X className="size-3" />
        </Button>
      )}
    </div>
  );
}
