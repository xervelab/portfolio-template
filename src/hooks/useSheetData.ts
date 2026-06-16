import { useState, useEffect } from "react";

/**
 * Google Sheets gviz API — free, no third-party service needed.
 * The spreadsheet must be published to web or shared as "Anyone with the link can view".
 */
const SPREADSHEET_ID = "1tp1lmbNaxqmytsBSHKTeDLDlywLiUA0upE9OD7q9OAs";
const GVIZ_BASE = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

// ──────────────────────────────────────────────
// gviz Parser
// ──────────────────────────────────────────────

function parseGvizResponse(text: string): { headers: string[]; rows: Record<string, any>[] } {
  const jsonStr = text
    .replace(/^[^(]*\(/, "")
    .replace(/\);?\s*$/, "");

  const parsed = JSON.parse(jsonStr);
  const { cols, rows } = parsed.table;

  const headers: string[] = cols.map((col: any) => col.label || col.id);

  const mappedRows = (rows || []).map((row: any) => {
    const obj: Record<string, any> = {};
    row.c.forEach((cell: any, idx: number) => {
      if (cell && cell.v !== null && cell.v !== undefined) {
        if (typeof cell.v === "string" && cell.v.startsWith("Date(")) {
          obj[headers[idx]] = cell.f ?? cell.v;
        } else {
          obj[headers[idx]] = cell.v;
        }
      } else {
        obj[headers[idx]] = "";
      }
    });
    return obj;
  });

  return { headers, rows: mappedRows };
}

async function fetchSheet(sheetName: string, expectedColumn?: string): Promise<Record<string, any>[]> {
  const url = `${GVIZ_BASE}&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const { headers, rows } = parseGvizResponse(text);
  // If we expect a specific column and it's not present, the sheet doesn't exist
  // (Google returns the first sheet as fallback for missing sheet names)
  if (expectedColumn && !headers.includes(expectedColumn)) {
    throw new Error(`Sheet "${sheetName}" not found (missing column "${expectedColumn}")`);
  }
  return rows;
}

// ──────────────────────────────────────────────
// Generic Hooks
// ──────────────────────────────────────────────

export function useSheetData<T>(
  sheetName: string,
  mapper: (rows: any[]) => T[],
  defaultValue: T[] = [],
  expectedColumn?: string
) {
  const [data, setData] = useState<T[]>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (rows.length === 0) throw new Error("Empty");
        if (!cancelled) {
          setData(mapper(rows));
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData(defaultValue);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [sheetName]);

  return { data, loading };
}

export function useSheetSingle<T>(
  sheetName: string,
  mapper: (row: any) => T,
  defaultValue: T,
  expectedColumn?: string
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rows = await fetchSheet(sheetName, expectedColumn);
        if (rows.length === 0) throw new Error("Empty");
        if (!cancelled) {
          setData(mapper(rows[0]));
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setData(defaultValue);
          setLoading(false);
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [sheetName]);

  return { data, loading };
}

// ──────────────────────────────────────────────
// Sheet: "Profile"
// Columns: Name, Role, Location, Narrative, Avatar URL, Studio Image URL
// ──────────────────────────────────────────────

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  narrative: string;
  avatarUrl: string;
  studioImageUrl: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: "Clara Moreau",
  role: "Contemporary Visual Artist",
  location: "Paris, France",
  narrative: "Exploring the boundaries between light and form, my work investigates the ephemeral nature of perception through layered compositions that challenge the viewer's relationship with space and memory. Each piece is an invitation to pause, reflect, and discover the quiet poetry hidden within everyday moments.",
  avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
  studioImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop",
};

export function mapProfile(row: any): ProfileData {
  return {
    name: row.Name ?? row.name ?? "",
    role: row.Role ?? row.role ?? "",
    location: row.Location ?? row.location ?? "",
    narrative: row.Narrative ?? row.narrative ?? "",
    avatarUrl: row["Avatar URL"] ?? row.avatarUrl ?? "",
    studioImageUrl: row["Studio Image URL"] ?? row.studioImageUrl ?? "",
  };
}

// ──────────────────────────────────────────────
// Sheet: "Philosophies"
// Columns: Title, Text
// ──────────────────────────────────────────────

export interface Philosophy {
  title: string;
  text: string;
}

export function mapPhilosophies(rows: any[]): Philosophy[] {
  return rows.map((row) => ({
    title: row.Title ?? row.title ?? "",
    text: row.Text ?? row.text ?? "",
  }));
}

export const SAMPLE_PHILOSOPHIES: Philosophy[] = [
  { title: "Light as Language", text: "I treat light not as a passive element but as the primary medium through which meaning is constructed. Each composition is a dialogue between illumination and shadow." },
  { title: "Memory & Material", text: "My process involves layering — both physically and conceptually. Pigments, textures, and transparencies accumulate the way memories do: imperfectly, beautifully." },
  { title: "The Quiet Revolution", text: "Art need not shout. I believe in the power of stillness, of work that reveals itself slowly to those willing to stay and look." },
];

// ──────────────────────────────────────────────
// Sheet: "Artworks"
// Columns: ID, Title, Year, Medium, Dimensions, Description, Image URL, Category, Status, Price, Featured
// ──────────────────────────────────────────────

export interface ArtworkData {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  category: string;
  status: string;
  price: string;
  featured: boolean;
}

export function mapArtworks(rows: any[]): ArtworkData[] {
  return rows.map((row, idx) => ({
    id: String(row.ID ?? row.id ?? `art-${idx + 1}`),
    title: row.Title ?? row.title ?? "Untitled",
    year: Number(row.Year ?? row.year) || new Date().getFullYear(),
    medium: row.Medium ?? row.medium ?? "",
    dimensions: row.Dimensions ?? row.dimensions ?? "",
    description: row.Description ?? row.description ?? "",
    imageUrl: row["Image URL"] ?? row.imageUrl ?? row.image ?? "",
    category: row.Category ?? row.category ?? "Oil",
    status: row.Status ?? row.status ?? "Inquire",
    price: row.Price ?? row.price ?? "",
    featured: String(row.Featured ?? row.featured ?? "false").toLowerCase() === "true",
  }));
}

export const SAMPLE_ARTWORKS: ArtworkData[] = [
  { id: "art-1", title: "Lumière d'Automne", year: 2025, medium: "Oil on linen", dimensions: "120 × 90 cm", description: "A meditation on the fleeting golden light of late October.", imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop", category: "Oil", status: "Available", price: "€8,400", featured: true },
  { id: "art-2", title: "Fragments of Silence", year: 2025, medium: "Mixed media on panel", dimensions: "80 × 60 cm", description: "Exploring the space between sound and stillness.", imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1000&fit=crop", category: "Mixed Media", status: "Available", price: "€5,200", featured: true },
  { id: "art-3", title: "Tidal Memory", year: 2024, medium: "Acrylic and ink on canvas", dimensions: "150 × 100 cm", description: "Inspired by the rhythmic patterns of coastal erosion.", imageUrl: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=800&h=1000&fit=crop", category: "Acrylic", status: "Sold", price: "€12,000", featured: true },
  { id: "art-4", title: "Veiled Geometry", year: 2024, medium: "Oil on canvas", dimensions: "100 × 100 cm", description: "Hard edges dissolve into atmospheric washes.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop", category: "Oil", status: "Inquire", price: "", featured: false },
  { id: "art-5", title: "Nocturne No. 7", year: 2024, medium: "Oil on linen", dimensions: "90 × 70 cm", description: "Part of an ongoing series exploring urban nights.", imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1000&fit=crop", category: "Oil", status: "Available", price: "€6,800", featured: false },
  { id: "art-6", title: "Ephemeral Garden", year: 2023, medium: "Watercolor and gold leaf", dimensions: "60 × 45 cm", description: "Delicate botanical forms rendered in transparent washes.", imageUrl: "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&h=1000&fit=crop", category: "Watercolor", status: "Sold", price: "€3,600", featured: false },
];

// ──────────────────────────────────────────────
// Sheet: "Exhibitions"
// Columns: ID, Title, Venue, Location, Dates, Status, Description
// ──────────────────────────────────────────────

export interface ExhibitionData {
  id: string;
  title: string;
  venue: string;
  location: string;
  dates: string;
  status: string;
  description: string;
}

export function mapExhibitions(rows: any[]): ExhibitionData[] {
  return rows.map((row, idx) => ({
    id: String(row.ID ?? row.id ?? `ex-${idx + 1}`),
    title: row.Title ?? row.title ?? "Exhibition",
    venue: row.Venue ?? row.venue ?? "",
    location: row.Location ?? row.location ?? "",
    dates: row.Dates ?? row.dates ?? "",
    status: row.Status ?? row.status ?? "Upcoming",
    description: row.Description ?? row.description ?? "",
  }));
}

export const SAMPLE_EXHIBITIONS: ExhibitionData[] = [
  { id: "ex-1", title: "Resonance: New Works", venue: "Galerie Perrotin", location: "Paris, France", dates: "Sep 15 – Nov 20, 2026", status: "Upcoming", description: "A solo exhibition presenting twelve new large-scale paintings." },
  { id: "ex-2", title: "Collective Frequencies", venue: "Whitechapel Gallery", location: "London, UK", dates: "Mar 1 – Jun 15, 2026", status: "Current", description: "Group exhibition featuring five international artists." },
  { id: "ex-3", title: "Material Whispers", venue: "MoMA PS1", location: "New York, USA", dates: "Oct 2024 – Jan 2025", status: "Past", description: "An immersive installation combining painting, sound, and sculpture." },
];

// ──────────────────────────────────────────────
// Sheet: "Contact"
// Columns: Address, Email, Hours, Reply Timeframe
// ──────────────────────────────────────────────

export interface ContactData {
  address: string;
  email: string;
  hours: string;
  replyTimeframe: string;
}

export const DEFAULT_CONTACT: ContactData = {
  address: "47 Rue de Rivoli, 75001 Paris, France",
  email: "studio@claramoreau.art",
  hours: "Tuesday – Saturday, 10:00 – 18:00 CET",
  replyTimeframe: "Within 48 hours",
};

export function mapContact(row: any): ContactData {
  return {
    address: row.Address ?? row.address ?? "",
    email: row.Email ?? row.email ?? "",
    hours: row.Hours ?? row.hours ?? "",
    replyTimeframe: row["Reply Timeframe"] ?? row.replyTimeframe ?? "",
  };
}

// ──────────────────────────────────────────────
// Sheet: "Socials"
// Columns: Name, URL, Handle, Icon
// ──────────────────────────────────────────────

export interface SocialData {
  name: string;
  url: string;
  handle: string;
  icon: string;
}

export function mapSocials(rows: any[]): SocialData[] {
  return rows.map((row) => ({
    name: row.Name ?? row.name ?? "",
    url: row.URL ?? row.url ?? row.Link ?? "#",
    handle: row.Handle ?? row.handle ?? "",
    icon: row.Icon ?? row.icon ?? row.Platform ?? row.platform ?? "",
  }));
}

export const SAMPLE_SOCIALS: SocialData[] = [
  { name: "Instagram", url: "https://instagram.com", handle: "@artist", icon: "instagram" },
  { name: "Twitter", url: "https://twitter.com", handle: "@artist", icon: "twitter" },
  { name: "LinkedIn", url: "https://linkedin.com", handle: "Artist", icon: "linkedin" },
  { name: "Website", url: "https://example.com", handle: "artist.com", icon: "globe" },
];

// ──────────────────────────────────────────────
// Sheet: "Site"
// Columns: Brand Name, Brand Subtitle, Hero Tag, Hero Title, Hero Subtitle, Hero Description, Hero CTA1, Hero CTA2, Gallery Label, Gallery Title, Lightroom Label, Lightroom Title, Lightroom Description, Exhibitions Label, Exhibitions Title, Exhibitions Description, Exhibitions Representation, Contact Label, Contact Title, Contact Description, Copyright
// ──────────────────────────────────────────────

export interface SiteData {
  brandName: string;
  brandSubtitle: string;
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroCta1: string;
  heroCta2: string;
  galleryLabel: string;
  galleryTitle: string;
  lightroomLabel: string;
  lightroomTitle: string;
  lightroomDescription: string;
  exhibitionsLabel: string;
  exhibitionsTitle: string;
  exhibitionsDescription: string;
  exhibitionsRepresentation: string;
  contactLabel: string;
  contactTitle: string;
  contactDescription: string;
  copyright: string;
}

export const DEFAULT_SITE: SiteData = {
  brandName: "Clara Moreau",
  brandSubtitle: "Atelier",
  heroTag: "Contemporary Visual Art",
  heroTitle: "Where Light Meets Form",
  heroSubtitle: "Original Works & Limited Editions",
  heroDescription: "Discover a curated collection of paintings, mixed-media pieces, and installations exploring the interplay of perception, memory, and space.",
  heroCta1: "View Collection",
  heroCta2: "Visit Studio",
  galleryLabel: "Portfolio",
  galleryTitle: "Selected Works",
  lightroomLabel: "Interactive Experience",
  lightroomTitle: "The Lightroom",
  lightroomDescription: "Explore how lighting transforms the perception of each artwork. Adjust warmth, intensity, and direction to experience pieces as they appear in different environments.",
  exhibitionsLabel: "Calendar",
  exhibitionsTitle: "Exhibitions & Events",
  exhibitionsDescription: "Upcoming and past exhibitions featuring original works and collaborative installations.",
  exhibitionsRepresentation: "Represented by Galerie Perrotin, Paris",
  contactLabel: "Correspondence Desk",
  contactTitle: "Get In Touch",
  contactDescription: "For acquisitions, commissions, studio visits, or press inquiries — reach out through the form below.",
  copyright: "© 2026 Clara Moreau. All rights reserved.",
};

export function mapSite(row: any): SiteData {
  return {
    brandName: row["Brand Name"] ?? row.brandName ?? DEFAULT_SITE.brandName,
    brandSubtitle: row["Brand Subtitle"] ?? row.brandSubtitle ?? DEFAULT_SITE.brandSubtitle,
    heroTag: row["Hero Tag"] ?? row.heroTag ?? DEFAULT_SITE.heroTag,
    heroTitle: row["Hero Title"] ?? row.heroTitle ?? DEFAULT_SITE.heroTitle,
    heroSubtitle: row["Hero Subtitle"] ?? row.heroSubtitle ?? DEFAULT_SITE.heroSubtitle,
    heroDescription: row["Hero Description"] ?? row.heroDescription ?? DEFAULT_SITE.heroDescription,
    heroCta1: row["Hero CTA1"] ?? row.heroCta1 ?? DEFAULT_SITE.heroCta1,
    heroCta2: row["Hero CTA2"] ?? row.heroCta2 ?? DEFAULT_SITE.heroCta2,
    galleryLabel: row["Gallery Label"] ?? row.galleryLabel ?? DEFAULT_SITE.galleryLabel,
    galleryTitle: row["Gallery Title"] ?? row.galleryTitle ?? DEFAULT_SITE.galleryTitle,
    lightroomLabel: row["Lightroom Label"] ?? row.lightroomLabel ?? DEFAULT_SITE.lightroomLabel,
    lightroomTitle: row["Lightroom Title"] ?? row.lightroomTitle ?? DEFAULT_SITE.lightroomTitle,
    lightroomDescription: row["Lightroom Description"] ?? row.lightroomDescription ?? DEFAULT_SITE.lightroomDescription,
    exhibitionsLabel: row["Exhibitions Label"] ?? row.exhibitionsLabel ?? DEFAULT_SITE.exhibitionsLabel,
    exhibitionsTitle: row["Exhibitions Title"] ?? row.exhibitionsTitle ?? DEFAULT_SITE.exhibitionsTitle,
    exhibitionsDescription: row["Exhibitions Description"] ?? row.exhibitionsDescription ?? DEFAULT_SITE.exhibitionsDescription,
    exhibitionsRepresentation: row["Exhibitions Representation"] ?? row.exhibitionsRepresentation ?? DEFAULT_SITE.exhibitionsRepresentation,
    contactLabel: row["Contact Label"] ?? row.contactLabel ?? DEFAULT_SITE.contactLabel,
    contactTitle: row["Contact Title"] ?? row.contactTitle ?? DEFAULT_SITE.contactTitle,
    contactDescription: row["Contact Description"] ?? row.contactDescription ?? DEFAULT_SITE.contactDescription,
    copyright: row.Copyright ?? row.copyright ?? DEFAULT_SITE.copyright,
  };
}
