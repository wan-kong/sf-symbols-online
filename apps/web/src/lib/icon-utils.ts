import type { IconCategory, IconManifest, SFIcon } from "@/types/icons";

// Import the manifest at build time
import manifestData from "../../public/icons/manifest.json";

export const manifest: IconManifest = manifestData as IconManifest;

export const allIcons: SFIcon[] = manifest.icons;

export const categories: IconCategory[] = Object.entries(manifest.categories)
  .map(([name, iconNames]) => ({
    name,
    count: iconNames.length,
    iconNames,
  }))
  .sort((a, b) => b.count - a.count);

/**
 * Group icons by their base name
 */
export function groupIconsByBase(icons: SFIcon[]): Map<string, SFIcon[]> {
  const groups = new Map<string, SFIcon[]>();
  for (const icon of icons) {
    const existing = groups.get(icon.baseName) ?? [];
    existing.push(icon);
    groups.set(icon.baseName, existing);
  }
  return groups;
}

/**
 * Get unique base names from icons
 */
export function getUniqueBaseNames(icons: SFIcon[]): string[] {
  return [...new Set(icons.map((icon) => icon.baseName))].sort();
}
