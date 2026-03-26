"use client";
import { Button } from "@sf-symbols-online/ui/components/button";
import { cn } from "@sf-symbols-online/ui/lib/utils";
import { categories } from "@/lib/icon-utils";

interface CategorySidebarProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export function CategorySidebar({
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  return (
    <aside className="w-48 shrink-0 border-r p-2">
      <div className="mb-2 px-2 font-medium text-muted-foreground text-xs uppercase tracking-wide">
        Categories
      </div>
      <div className="space-y-1">
        <Button
          className={cn(
            "w-full justify-start",
            !selectedCategory && "bg-muted"
          )}
          onClick={() => onSelectCategory(null)}
          variant="ghost"
        >
          <span className="flex-1 text-left">All</span>
          <span className="text-muted-foreground text-xs">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </span>
        </Button>
        {categories.map((category) => (
          <Button
            className={cn(
              "w-full justify-start",
              selectedCategory === category.name && "bg-muted"
            )}
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            variant="ghost"
          >
            <span className="flex-1 text-left">{category.name}</span>
            <span className="text-muted-foreground text-xs">
              {category.count}
            </span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
