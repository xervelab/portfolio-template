import { useState, useEffect } from "react";
import { ArtistProfile, Artwork, Exhibition, JournalPost } from "../types";

/**
 * Google Sheets Visualization API endpoint (free, no third-party service needed).
 * The spreadsheet must be published to web or shared as "Anyone with the link can view".
 * 
 * To query a specific tab, append &sheet=TabName to the URL.
 */
const SPREADSHEET_ID = "1aNO-Ocrg0Ap59SYhDbV7Hp5WhhNSg4FBorHOqcZKXeY";
const GVIZ_BASE = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

// ──────────────────────────────────────────────
// Google Sheets gviz parser
// ──────────────────────────────────────────────

/**
 * Parses the Google Visualization JSON response format.
 * The response looks like: google.visualization.Query.setResponse({...})
 * We strip the JSONP wrapper and convert cols/rows into plain objects.
 */
function parseGvizResponse(text: string): Record<string, any>[] {
  // Strip JSONP wrapper: /*O_o*/ google.visualization.Query.setResponse({...});
  const jsonStr = text
    .replace(/^[^(]*\(/, "")  // Remove everything up to and including the first (
    .replace(/\);?\s*$/, ""); // Remove trailing );

  const parsed = JSON.parse(jsonStr);
  const { cols, rows } = parsed.table;

  // Extract column labels (these become the object keys)
  const headers: string[] = cols.map((col: any) => col.label || col.id);

  // Map each row into a key-value object
  return (rows || []).map((row: any) => {
    const obj: Record<string, any> = {};
    row.c.forEach((cell: any, idx: number) => {
      if (cell && cell.v !== null && cell.v !== undefined) {
        // Google gviz returns dates as "Date(year,month,day)" — use the formatted value (f)
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
}

async function fetchSheet(sheetName: string): Promise<Record<string, any>[]> {
  // &headers=1 ensures row 1 is always treated as column headers
  const url = `${GVIZ_BASE}&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return parseGvizResponse(text);
}

// ──────────────────────────────────────────────
// Generic hooks
// ──────────────────────────────────────────────

export function useSheetData<T>(
  sheetName: string,
  mapper: (rows: any[]) => T[],
  defaultValue: T[] = []
) {
  const [data, setData] = useState<T[]>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rows = await fetchSheet(sheetName);
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
  defaultValue: T
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rows = await fetchSheet(sheetName);
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
// Columns: Name, Username, Avatar URL, Tagline, Bio, Categories, Followers, Following, Location, Available For Commissions, Website
// ──────────────────────────────────────────────

export const DEFAULT_PROFILE: ArtistProfile = {
  name: "",
  username: "",
  avatarUrl: "",
  tagline: "",
  bio: "",
  categories: [],
  followersCount: 0,
  followingCount: 0,
  location: "",
  availableForCommissions: false,
  website: "",
};

export function mapProfile(row: any): ArtistProfile {
  return {
    name: row.Name ?? row.name ?? DEFAULT_PROFILE.name,
    username: row.Username ?? row.username ?? DEFAULT_PROFILE.username,
    avatarUrl: row["Avatar URL"] ?? row.avatarUrl ?? DEFAULT_PROFILE.avatarUrl,
    tagline: row.Tagline ?? row.tagline ?? DEFAULT_PROFILE.tagline,
    bio: row.Bio ?? row.bio ?? DEFAULT_PROFILE.bio,
    categories: row.Categories
      ? String(row.Categories).split(",").map((s: string) => s.trim())
      : DEFAULT_PROFILE.categories,
    followersCount: Number(String(row.Followers ?? row.followersCount ?? DEFAULT_PROFILE.followersCount).replace(/,/g, "")) || DEFAULT_PROFILE.followersCount,
    followingCount: Number(String(row.Following ?? row.followingCount ?? DEFAULT_PROFILE.followingCount).replace(/,/g, "")) || DEFAULT_PROFILE.followingCount,
    location: row.Location ?? row.location ?? DEFAULT_PROFILE.location,
    availableForCommissions: row["Available For Commissions"] === true || String(row["Available For Commissions"] ?? row.availableForCommissions ?? "true").toLowerCase() === "true",
    website: row.Website ?? row.website ?? DEFAULT_PROFILE.website,
  };
}

// ──────────────────────────────────────────────
// Sheet: "Gallery"
// Columns: ID, Title, Medium, Category, Year, Dimensions, Description, Image URL, Price, Is Sold, Tags, Featured
// ──────────────────────────────────────────────

export function mapGallery(rows: any[]): Artwork[] {
  return rows.map((row, idx) => ({
    id: String(row.ID ?? row.id ?? `art-${idx + 1}`),
    title: row.Title ?? row.title ?? "Untitled",
    medium: row.Medium ?? row.medium ?? "Oil on Canvas",
    category: row.Category ?? row.category ?? "Abstract",
    year: String(row.Year ?? row.year ?? new Date().getFullYear()),
    dimensions: row.Dimensions ?? row.dimensions ?? "",
    description: row.Description ?? row.description ?? "",
    imageUrl: row["Image URL"] ?? row.imageUrl ?? row.image ?? "",
    likes: Number(String(row.Likes ?? row.likes ?? 0).replace(/,/g, "")) || 0,
    hasLiked: false,
    comments: [],
    price: Number(String(row.Price ?? row.price ?? 0).replace(/,/g, "")) || 0,
    isSold: row["Is Sold"] === true || String(row["Is Sold"] ?? row.isSold ?? "false").toLowerCase() === "true",
    tags: row.Tags ? String(row.Tags).split(",").map((s: string) => s.trim()) : [],
    views: Number(String(row.Views ?? row.views ?? 0).replace(/,/g, "")) || 0,
    featured: row.Featured === true || String(row.Featured ?? row.featured ?? "false").toLowerCase() === "true",
  }));
}

// ──────────────────────────────────────────────
// Sheet: "Exhibitions"
// Columns: ID, Title, Gallery, Location, Dates, Status, Link
// ──────────────────────────────────────────────

export function mapExhibitions(rows: any[]): Exhibition[] {
  return rows.map((row, idx) => ({
    id: String(row.ID ?? row.id ?? `ex-${idx + 1}`),
    title: row.Title ?? row.title ?? "Exhibition",
    gallery: row.Gallery ?? row.gallery ?? "",
    location: row.Location ?? row.location ?? "",
    dates: row.Dates ?? row.dates ?? "",
    status: (row.Status ?? row.status ?? "Upcoming") as Exhibition["status"],
    link: row.Link ?? row.link ?? undefined,
  }));
}

// ──────────────────────────────────────────────
// Sheet: "Journal"
// Columns: ID, Title, Date, Excerpt, Content, Image URL, Read Time
// ──────────────────────────────────────────────

export function mapJournal(rows: any[]): JournalPost[] {
  return rows.map((row, idx) => ({
    id: String(row.ID ?? row.id ?? `journal-${idx + 1}`),
    title: row.Title ?? row.title ?? "Untitled Post",
    date: row.Date ?? row.date ?? "",
    excerpt: row.Excerpt ?? row.excerpt ?? "",
    content: row.Content ?? row.content ?? "",
    imageUrl: row["Image URL"] ?? row.imageUrl ?? row.image ?? "",
    likes: Number(String(row.Likes ?? row.likes ?? 0).replace(/,/g, "")) || 0,
    readTime: row["Read Time"] ?? row.readTime ?? "3 min read",
  }));
}

// ──────────────────────────────────────────────
// Sheet: "Site"
// Columns: Brand Name, Footer Text, Footer Subtext, Powered By URL
// ──────────────────────────────────────────────

export interface SiteConfig {
  brandName: string;
  footerText: string;
  footerSubtext: string;
  poweredByUrl: string;
}

export const DEFAULT_SITE: SiteConfig = {
  brandName: "",
  footerText: "",
  footerSubtext: "",
  poweredByUrl: "",
};

export function mapSite(row: any): SiteConfig {
  return {
    brandName: row["Brand Name"] ?? row.brandName ?? DEFAULT_SITE.brandName,
    footerText: row["Footer Text"] ?? row.footerText ?? DEFAULT_SITE.footerText,
    footerSubtext: row["Footer Subtext"] ?? row.footerSubtext ?? DEFAULT_SITE.footerSubtext,
    poweredByUrl: row["Powered By URL"] ?? row.poweredByUrl ?? DEFAULT_SITE.poweredByUrl,
  };
}

// ──────────────────────────────────────────────
// Sheet: "Highlights"
// Columns: ID, Title, Cover URL, Story URLs, Captions
// 
// Story URLs and Captions are comma-separated lists (same order).
// Example:
//   Story URLs: https://img1.jpg, https://img2.jpg
//   Captions: Caption for image 1, Caption for image 2
// ──────────────────────────────────────────────

export interface HighlightStory {
  url: string;
  type: "image";
  caption: string;
}

export interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
  stories: HighlightStory[];
}

export function mapHighlights(rows: any[]): Highlight[] {
  return rows.map((row, idx) => {
    const storyUrls = row["Story URLs"] ?? row.storyUrls ?? "";
    const captions = row["Captions"] ?? row.captions ?? "";

    // Split by "|" delimiter (pipe) to avoid conflicts with commas in URLs
    const urlList = String(storyUrls).split("|").map((s: string) => s.trim()).filter(Boolean);
    const captionList = String(captions).split("|").map((s: string) => s.trim());

    const stories: HighlightStory[] = urlList.map((url: string, i: number) => ({
      url,
      type: "image" as const,
      caption: captionList[i] ?? "",
    }));

    return {
      id: String(row.ID ?? row.id ?? `h-${idx + 1}`),
      title: row.Title ?? row.title ?? "Highlight",
      coverUrl: row["Cover URL"] ?? row.coverUrl ?? (stories[0]?.url ?? ""),
      stories,
    };
  });
}
