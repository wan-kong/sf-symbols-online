export interface SFIcon {
  baseName: string;
  name: string;
  path: string;
  segments: string[];
  variants: string[];
}

export interface IconCategory {
  count: number;
  iconNames: string[];
  name: string;
}

export interface IconManifest {
  categories: Record<string, string[]>;
  icons: SFIcon[];
  totalCount: number;
  version: string;
}
