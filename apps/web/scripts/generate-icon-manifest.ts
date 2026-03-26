import { readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const GLYPHS_DIR = resolve(
  import.meta.dirname,
  "../../../packages/sf-symbols/glyphs"
);
const OUTPUT_FILE = resolve(
  import.meta.dirname,
  "../public/icons/manifest.json"
);

interface SFIcon {
  baseName: string;
  name: string;
  path: string;
  segments: string[];
  variants: string[];
}

interface IconManifest {
  categories: Map<string, string[]>;
  icons: SFIcon[];
  totalCount: number;
  version: string;
}

// Semantic category mappings based on common SF Symbols naming
// Regex to remove .png extension
const PNG_EXTENSION_REGEX = /\.png$/;

const CATEGORY_MAPPINGS: Record<string, string> = {
  // Arrows & Navigation
  arrow: "Arrows",
  chevron: "Arrows",
  arrowtriangle: "Arrows",
  // UI Elements
  square: "UI",
  rectangle: "UI",
  circle: "UI",
  checkmark: "UI",
  xmark: "UI",
  plus: "UI",
  minus: "UI",
  // Media
  play: "Media",
  pause: "Media",
  stop: "Media",
  forward: "Media",
  backward: "Media",
  speaker: "Media",
  mic: "Media",
  music: "Media",
  // Communication
  phone: "Communication",
  envelope: "Communication",
  message: "Communication",
  bubble: "Communication",
  // Weather
  sun: "Weather",
  moon: "Weather",
  cloud: "Weather",
  rain: "Weather",
  snow: "Weather",
  wind: "Weather",
  tornado: "Weather",
  // Devices
  keyboard: "Devices",
  camera: "Devices",
  tv: "Devices",
  printer: "Devices",
  headphones: "Devices",
  // Symbols
  heart: "Symbols",
  star: "Symbols",
  bookmark: "Symbols",
  flag: "Symbols",
  // Currency
  dollarsign: "Currency",
  eurosign: "Currency",
  yensign: "Currency",
  bitcoinsign: "Currency",
  sterlingsign: "Currency",
  // People
  person: "People",
  "person.crop": "People",
  // Text & Editing
  textformat: "Text",
  doc: "Text",
  folder: "Text",
  // Nature
  leaf: "Nature",
  tree: "Nature",
  flame: "Nature",
  // Transport
  car: "Transport",
  bicycle: "Transport",
  bus: "Transport",
  // Time
  clock: "Time",
  calendar: "Time",
  timer: "Time",
  // Security
  lock: "Security",
  shield: "Security",
  key: "Security",
};

function categorizeIcon(baseName: string): string {
  const lowerBase = baseName.toLowerCase();
  for (const [keyword, category] of Object.entries(CATEGORY_MAPPINGS)) {
    if (lowerBase.includes(keyword)) {
      return category;
    }
  }
  return "Other";
}

function parseIconName(filename: string): SFIcon {
  // Remove .png extension
  const name = filename.replace(PNG_EXTENSION_REGEX, "");

  // Split by dots
  const segments = name.split(".");

  // First segment is the base name
  const baseName = segments[0] ?? name;

  // Everything after the base name is variants
  const variants = segments.slice(1);

  return {
    name,
    baseName,
    segments,
    variants,
    path: `/icons/glyphs/${filename}`,
  };
}

function generateManifest(): IconManifest {
  // Read all files from glyphs directory
  const files = readdirSync(GLYPHS_DIR);
  const pngFiles = files.filter((f) => f.endsWith(".png"));

  console.log(`Found ${pngFiles.length} PNG files`);

  const icons: SFIcon[] = [];
  const categories = new Map<string, string[]>();

  for (const file of pngFiles) {
    const icon = parseIconName(file);
    icons.push(icon);

    // Track categories
    const category = categorizeIcon(icon.baseName);
    const existing = categories.get(category) ?? [];
    existing.push(icon.name);
    categories.set(category, existing);
  }

  // Sort icons alphabetically
  icons.sort((a, b) => a.name.localeCompare(b.name));

  return {
    version: "1.0.0",
    totalCount: icons.length,
    icons,
    categories,
  };
}

function main() {
  console.log("Generating icon manifest...");
  console.log(`Source: ${GLYPHS_DIR}`);
  console.log(`Output: ${OUTPUT_FILE}`);

  const manifest = generateManifest();

  // Convert categories Map to object for JSON serialization
  const output = {
    version: manifest.version,
    totalCount: manifest.totalCount,
    icons: manifest.icons,
    categories: Object.fromEntries(manifest.categories),
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));

  console.log(`Generated manifest with ${manifest.totalCount} icons`);
  console.log(`Categories: ${Object.keys(output.categories).length}`);
}

main();
