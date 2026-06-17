import { useState, useEffect } from "react";

/**
 * Google Sheets gviz API — free, no third-party service needed.
 * The spreadsheet must be shared as "Anyone with the link can view".
 */
const SPREADSHEET_ID = "1TF-l8u37KA1Eo704hcgwOEuhb__e1eAExkJXgmO06lo";
const GVIZ_BASE = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

// ──────────────────────────────────────────────
// gviz Parser
// ──────────────────────────────────────────────

function parseGvizResponse(text: string): {
  headers: string[];
  rows: Record<string, string>[];
} {
  const jsonStr = text.replace(/^[^(]*\(/, "").replace(/\);?\s*$/, "");
  const parsed = JSON.parse(jsonStr);
  const { cols, rows } = parsed.table;
  const headers: string[] = cols.map((c: any) => c.label || c.id);

  const mapped = (rows || []).map((row: any) => {
    const obj: Record<string, string> = {};
    row.c.forEach((cell: any, i: number) => {
      if (cell && cell.v !== null && cell.v !== undefined) {
        obj[headers[i]] =
          typeof cell.v === "string" && cell.v.startsWith("Date(")
            ? (cell.f ?? cell.v)
            : String(cell.v);
      } else {
        obj[headers[i]] = "";
      }
    });
    return obj;
  });

  return { headers, rows: mapped };
}

async function fetchSheet(
  sheetName: string,
  expectedColumn?: string
): Promise<Record<string, string>[]> {
  const url = `${GVIZ_BASE}&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  // Detect Google login/error HTML pages
  if (text.trimStart().startsWith("<!")) {
    throw new Error("Spreadsheet not accessible (not shared publicly)");
  }
  const { headers, rows } = parseGvizResponse(text);
  if (expectedColumn && !headers.includes(expectedColumn)) {
    throw new Error(`Sheet "${sheetName}" missing column "${expectedColumn}"`);
  }
  return rows;
}

// ──────────────────────────────────────────────
// Generic Hooks
// ──────────────────────────────────────────────

export function useSheetData<T>(
  sheetName: string,
  mapper: (rows: Record<string, string>[]) => T[],
  fallback: T[],
  expectedColumn?: string
) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (rows.length === 0) throw new Error("Empty sheet");
        if (!cancelled) setData(mapper(rows));
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sheetName]);

  return { data, loading };
}

export function useSheetSingle<T>(
  sheetName: string,
  mapper: (row: Record<string, string>) => T,
  fallback: T,
  expectedColumn?: string
) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (rows.length === 0) throw new Error("Empty sheet");
        if (!cancelled) setData(mapper(rows[0]));
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sheetName]);

  return { data, loading };
}

// ══════════════════════════════════════════════
// Sheet: "Site"  (single row — brand & section text)
// ══════════════════════════════════════════════
// Columns: Brand Name | Tagline | Hero Subtitle | Hero Description | Hero CTA1 | Hero CTA2 | Hero Image URL |
//          About Label | About Heading | About Bio 1 | About Bio 2 | About Bio 3 | About Image URL | About Year |
//          Stat 1 Number | Stat 1 Label | Stat 2 Number | Stat 2 Label | Stat 3 Number | Stat 3 Label |
//          Gallery Label | Gallery Title |
//          Process Label | Process Title |
//          Contact Label | Contact Title | Studio Address | Email | Response Note |
//          Copyright

export interface SiteData {
  brandName: string;
  tagline: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCta1: string;
  heroCta2: string;
  heroImageUrl: string;
  aboutLabel: string;
  aboutHeading: string;
  aboutBio1: string;
  aboutBio2: string;
  aboutBio3: string;
  aboutImageUrl: string;
  aboutYear: string;
  stat1Number: string;
  stat1Label: string;
  stat2Number: string;
  stat2Label: string;
  stat3Number: string;
  stat3Label: string;
  galleryLabel: string;
  galleryTitle: string;
  processLabel: string;
  processTitle: string;
  contactLabel: string;
  contactTitle: string;
  studioAddress: string;
  email: string;
  responseNote: string;
  copyright: string;
}

const f = (row: Record<string, string>, ...keys: string[]) => {
  for (const k of keys) {
    if (row[k] !== undefined && row[k] !== "") return row[k];
  }
  return "";
};

export const DEFAULT_SITE: SiteData = {
  brandName: "",
  tagline: "",
  heroSubtitle: "",
  heroDescription: "",
  heroCta1: "",
  heroCta2: "",
  heroImageUrl: "",
  aboutLabel: "",
  aboutHeading: "",
  aboutBio1: "",
  aboutBio2: "",
  aboutBio3: "",
  aboutImageUrl: "",
  aboutYear: "",
  stat1Number: "",
  stat1Label: "",
  stat2Number: "",
  stat2Label: "",
  stat3Number: "",
  stat3Label: "",
  galleryLabel: "",
  galleryTitle: "",
  processLabel: "",
  processTitle: "",
  contactLabel: "",
  contactTitle: "",
  studioAddress: "",
  email: "",
  responseNote: "",
  copyright: "",
};

export function mapSite(row: Record<string, string>): SiteData {
  return {
    brandName: f(row, "Brand Name"),
    tagline: f(row, "Tagline"),
    heroSubtitle: f(row, "Hero Subtitle"),
    heroDescription: f(row, "Hero Description"),
    heroCta1: f(row, "Hero CTA1"),
    heroCta2: f(row, "Hero CTA2"),
    heroImageUrl: f(row, "Hero Image URL"),
    aboutLabel: f(row, "About Label"),
    aboutHeading: f(row, "About Heading"),
    aboutBio1: f(row, "About Bio 1"),
    aboutBio2: f(row, "About Bio 2"),
    aboutBio3: f(row, "About Bio 3"),
    aboutImageUrl: f(row, "About Image URL"),
    aboutYear: f(row, "About Year"),
    stat1Number: f(row, "Stat 1 Number"),
    stat1Label: f(row, "Stat 1 Label"),
    stat2Number: f(row, "Stat 2 Number"),
    stat2Label: f(row, "Stat 2 Label"),
    stat3Number: f(row, "Stat 3 Number"),
    stat3Label: f(row, "Stat 3 Label"),
    galleryLabel: f(row, "Gallery Label"),
    galleryTitle: f(row, "Gallery Title"),
    processLabel: f(row, "Process Label"),
    processTitle: f(row, "Process Title"),
    contactLabel: f(row, "Contact Label"),
    contactTitle: f(row, "Contact Title"),
    studioAddress: f(row, "Studio Address"),
    email: f(row, "Email"),
    responseNote: f(row, "Response Note"),
    copyright: f(row, "Copyright"),
  };
}

// ══════════════════════════════════════════════
// Sheet: "Artworks"  (multiple rows)
// ══════════════════════════════════════════════
// Columns: Title | Year | Medium | Size | Category | Available | Image URL | Description

export interface ArtworkData {
  id: number;
  title: string;
  year: string;
  medium: string;
  size: string;
  category: string;
  available: boolean;
  img: string;
  description: string;
}

export function mapArtworks(rows: Record<string, string>[]): ArtworkData[] {
  return rows.map((row, i) => ({
    id: i + 1,
    title: f(row, "Title") || "Untitled",
    year: f(row, "Year") || "",
    medium: f(row, "Medium") || "",
    size: f(row, "Size") || "",
    category: f(row, "Category") || "Oil",
    available: f(row, "Available").toLowerCase() === "true",
    img: f(row, "Image URL") || "",
    description: f(row, "Description") || "",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Process"  (multiple rows)
// ══════════════════════════════════════════════
// Columns: Number | Title | Body

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export function mapProcessSteps(rows: Record<string, string>[]): ProcessStep[] {
  return rows.map((row, i) => ({
    number: f(row, "Number") || String(i + 1).padStart(2, "0"),
    title: f(row, "Title") || "",
    body: f(row, "Body") || "",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Socials"  (multiple rows)
// ══════════════════════════════════════════════
// Columns: Name | Handle | URL | Icon

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export function mapSocials(rows: Record<string, string>[]): SocialLink[] {
  return rows.map((row) => ({
    name: f(row, "Name") || "",
    handle: f(row, "Handle") || "",
    url: f(row, "URL") || "#",
    icon: f(row, "Icon", "Platform") || "",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Studio Images"  (multiple rows)
// ══════════════════════════════════════════════
// Columns: Image URL

export interface StudioImage {
  url: string;
}

export function mapStudioImages(rows: Record<string, string>[]): StudioImage[] {
  return rows.map((row) => ({
    url: f(row, "Image URL") || "",
  }));
}
