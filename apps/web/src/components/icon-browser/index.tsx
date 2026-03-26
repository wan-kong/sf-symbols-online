"use client";
import { useMemo, useState } from "react";
import { useIconSearch } from "@/hooks/use-icon-search";
import { manifest } from "@/lib/icon-utils";
import { CategorySidebar } from "./category-sidebar";
import { SearchBar } from "./search-bar";
import { VirtualizedIconGrid } from "./virtualized-icon-grid";

export function IconBrowser() {
  const { query, setQuery, results } = useIconSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter by category
  const filteredIcons = useMemo(() => {
    if (!selectedCategory) {
      return results;
    }
    const categoryIconNames = new Set(
      manifest.categories[selectedCategory] ?? []
    );
    return results.filter((icon) => categoryIconNames.has(icon.name));
  }, [results, selectedCategory]);

  return (
    <div className="flex h-full flex-col">
      {/* Search header */}
      <div className="p-4">
        <div className="mx-auto max-w-md">
          <SearchBar onChange={setQuery} value={query} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <CategorySidebar
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />

        {/* Icon grid */}
        <div className="flex-1 overflow-hidden border-t">
          <VirtualizedIconGrid icons={filteredIcons} />
        </div>
      </div>
    </div>
  );
}
