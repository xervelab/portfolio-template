import { useState, useEffect } from "react";

/**
 * Google Sheets gviz API — free, no third-party service needed.
 * The spreadsheet must be shared as "Anyone with the link can view".
 */
const SPREADSHEET_ID = "1DOLs386ktC5xg7QTO5B-v6Z2_oCKIQVc09z-ZbXpfCg";
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
  if (text.trimStart().startsWith("<!")) {
    throw new Error("Spreadsheet not accessible");
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
  expectedColumn?: string
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (!cancelled) setData(mapper(rows));
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : `Failed to load "${sheetName}"`;
          setError(message);
          setData([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sheetName]);

  return { data, loading, error };
}

export function useSheetSingle<T>(
  sheetName: string,
  mapper: (row: Record<string, string>) => T,
  expectedColumn?: string
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (rows.length === 0) throw new Error("Empty");
        if (!cancelled) setData(mapper(rows[0]));
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : `Failed to load "${sheetName}"`;
          setError(message);
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sheetName]);

  return { data, loading, error };
}

// ──────────────────────────────────────────────
// Helper
// ──────────────────────────────────────────────
const g = (row: Record<string, string>, ...keys: string[]) => {
  for (const k of keys) if (row[k] !== undefined && row[k] !== "") return row[k];
  return "";
};

// ══════════════════════════════════════════════
// Sheet: "Site" — single row with all site text
// ══════════════════════════════════════════════

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

export function mapSite(row: Record<string, string>): SiteData {
  return {
    brandName: g(row, "Brand Name"),
    tagline: g(row, "Tagline"),
    heroSubtitle: g(row, "Hero Subtitle"),
    heroDescription: g(row, "Hero Description"),
    heroCta1: g(row, "Hero CTA1"),
    heroCta2: g(row, "Hero CTA2"),
    heroImageUrl: g(row, "Hero Image URL"),
    aboutLabel: g(row, "About Label"),
    aboutHeading: g(row, "About Heading"),
    aboutBio1: g(row, "About Bio 1"),
    aboutBio2: g(row, "About Bio 2"),
    aboutBio3: g(row, "About Bio 3"),
    aboutImageUrl: g(row, "About Image URL"),
    aboutYear: g(row, "About Year"),
    stat1Number: g(row, "Stat 1 Number"),
    stat1Label: g(row, "Stat 1 Label"),
    stat2Number: g(row, "Stat 2 Number"),
    stat2Label: g(row, "Stat 2 Label"),
    stat3Number: g(row, "Stat 3 Number"),
    stat3Label: g(row, "Stat 3 Label"),
    galleryLabel: g(row, "Gallery Label"),
    galleryTitle: g(row, "Gallery Title"),
    processLabel: g(row, "Process Label"),
    processTitle: g(row, "Process Title"),
    contactLabel: g(row, "Contact Label"),
    contactTitle: g(row, "Contact Title"),
    studioAddress: g(row, "Studio Address"),
    email: g(row, "Email"),
    responseNote: g(row, "Response Note"),
    copyright: g(row, "Copyright"),
  };
}

// ══════════════════════════════════════════════
// Sheet: "Artworks"
// ══════════════════════════════════════════════

export interface ArtworkData {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  category: string;
  available: boolean;
  imageUrl: string;
  description: string;
  price: string;
  status: "available" | "sold" | "reserved";
  featured: boolean;
}

export function mapArtworks(rows: Record<string, string>[]): ArtworkData[] {
  return rows.map((row, i) => {
    const avail = g(row, "Available").toLowerCase();
    return {
      id: `art-${i + 1}`,
      title: g(row, "Title"),
      year: Number(g(row, "Year")) || 0,
      medium: g(row, "Medium"),
      dimensions: g(row, "Size", "Dimensions"),
      category: g(row, "Category"),
      available: avail === "true",
      imageUrl: g(row, "Image URL"),
      description: g(row, "Description"),
      price: g(row, "Price"),
      status: avail === "true" ? "available" : avail === "reserved" ? "reserved" : "sold",
      featured: g(row, "Featured").toLowerCase() === "true",
    };
  });
}

// ══════════════════════════════════════════════
// Sheet: "Exhibitions"
// ══════════════════════════════════════════════

export interface ExhibitionData {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: number;
  type: string;
}

export function mapExhibitions(rows: Record<string, string>[]): ExhibitionData[] {
  return rows.map((row, i) => ({
    id: `ex-${i + 1}`,
    title: g(row, "Title") || "",
    venue: g(row, "Venue") || "",
    location: g(row, "Location") || "",
    year: parseInt(g(row, "Year")) || new Date().getFullYear(),
    type: g(row, "Type") || "Solo",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Process"
// ══════════════════════════════════════════════

export interface ProcessStep {
  number: string;
  title: string;
  body: string;
}

export function mapProcessSteps(rows: Record<string, string>[]): ProcessStep[] {
  return rows.map((row, i) => ({
    number: g(row, "Number") || String(i + 1).padStart(2, "0"),
    title: g(row, "Title") || "",
    body: g(row, "Body") || "",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Socials"
// ══════════════════════════════════════════════

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export function mapSocials(rows: Record<string, string>[]): SocialLink[] {
  return rows.map((row) => ({
    name: g(row, "Name") || "",
    handle: g(row, "Handle") || "",
    url: g(row, "URL") || "#",
    icon: g(row, "Icon", "Platform") || "",
  }));
}

// ══════════════════════════════════════════════
// Sheet: "Studio Images"
// ══════════════════════════════════════════════

export interface StudioImage {
  url: string;
}

export function mapStudioImages(rows: Record<string, string>[]): StudioImage[] {
  return rows.map((row) => ({
    url: g(row, "Image URL") || "",
  }));
}
