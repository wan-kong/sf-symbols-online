import Fuse, { type IFuseOptions } from "fuse.js";
import { useDeferredValue, useMemo, useState } from "react";
import { allIcons } from "@/lib/icon-utils";
import type { SFIcon } from "@/types/icons";

const fuseOptions: IFuseOptions<SFIcon> = {
  keys: ["name", "baseName"],
  threshold: 0.3,
  includeScore: true,
  findAllMatches: true,
};

// Create fuse instance once
const fuse = new Fuse(allIcons, fuseOptions);

export function useIconSearch() {
  const [query, setQuery] = useState("");

  // Use React 19's useDeferredValue for better UX during typing
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    if (!deferredQuery.trim()) {
      return allIcons;
    }
    return fuse.search(deferredQuery).map((result) => result.item);
  }, [deferredQuery]);

  return {
    query,
    setQuery,
    results,
    isSearching: query !== deferredQuery,
  };
}
