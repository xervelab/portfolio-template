import { useState, useEffect } from "react";

const SPREADSHEET_ID = "1ARR9y8R7EU1ArV4q92l1kIhFVwR6YUIQ5To6NlPIRwM";
const GVIZ_BASE = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

/**
 * Parses the Google Visualization JSON response format.
 * The response looks like: google.visualization.Query.setResponse({...})
 * We strip the JSONP wrapper and convert cols/rows into plain objects.
 */
function parseGvizResponse(text: string): Record<string, any>[] {
  const jsonStr = text
    .replace(/^[^(]*\(/, "")
    .replace(/\);?\s*$/, "");

  const parsed = JSON.parse(jsonStr);
  const { cols, rows } = parsed.table;

  const headers: string[] = cols.map((col: any) => col.label || col.id);

  return (rows || []).map((row: any) => {
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
}

async function fetchSheet(sheetName: string): Promise<Record<string, any>[]> {
  const url = `${GVIZ_BASE}&headers=1&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  return parseGvizResponse(text);
}

/**
 * Generic hook to fetch data from a specific Google Sheets tab (sheet name).
 */
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

/**
 * Hook to fetch a single-row sheet (like Profile or Site config).
 */
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
// Data types & mappers for each sheet
// ──────────────────────────────────────────────

// ── Sheet: "Profile" ──
export interface ProfileData {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  quote: string;
  location: string;
  posts: string;
  followers: string;
  following: string;
  currentlyWorking: string;
  availableForCommissions: boolean;
}

export const DEFAULT_PROFILE: ProfileData = {
  username: "",
  displayName: "",
  avatarUrl: "",
  bio: "",
  quote: "",
  location: "",
  posts: "0",
  followers: "0",
  following: "0",
  currentlyWorking: "",
  availableForCommissions: false,
};

export function mapProfile(row: any): ProfileData {
  return {
    username: row.Username ?? row.username ?? DEFAULT_PROFILE.username,
    displayName: row["Display Name"] ?? row.displayName ?? DEFAULT_PROFILE.displayName,
    avatarUrl: row["Avatar URL"] ?? row.avatarUrl ?? DEFAULT_PROFILE.avatarUrl,
    bio: row.Bio ?? row.bio ?? DEFAULT_PROFILE.bio,
    quote: row.Quote ?? row.quote ?? DEFAULT_PROFILE.quote,
    location: row.Location ?? row.location ?? DEFAULT_PROFILE.location,
    posts: row.Posts ?? row.posts ?? DEFAULT_PROFILE.posts,
    followers: row.Followers ?? row.followers ?? DEFAULT_PROFILE.followers,
    following: row.Following ?? row.following ?? DEFAULT_PROFILE.following,
    currentlyWorking: row["Currently Working"] ?? row.currentlyWorking ?? DEFAULT_PROFILE.currentlyWorking,
    availableForCommissions: String(row["Available For Commissions"] ?? row.availableForCommissions ?? "true").toLowerCase() === "true",
  };
}

// ── Sheet: "Gallery" ──
export interface GalleryItem {
  id: number;
  url: string;
  title: string;
  medium: string;
  year: number;
  likes: number;
  comments: number;
  caption: string;
}

export function mapGallery(rows: any[]): GalleryItem[] {
  return rows.map((row, idx) => ({
    id: Number(row.ID ?? row.id) || idx + 1,
    url: row["Image URL"] ?? row.url ?? row.image ?? "",
    title: row.Title ?? row.title ?? "Untitled",
    medium: row.Medium ?? row.medium ?? "",
    year: Number(row.Year ?? row.year) || new Date().getFullYear(),
    likes: Number(String(row.Likes ?? row.likes ?? 0).replace(/,/g, "")) || 0,
    comments: Number(String(row.Comments ?? row.comments ?? 0).replace(/,/g, "")) || 0,
    caption: row.Caption ?? row.caption ?? "",
  }));
}

// ── Sheet: "Highlights" ──
export interface HighlightItem {
  id: number;
  name: string;
  imageUrl: string;
}

export function mapHighlights(rows: any[]): HighlightItem[] {
  return rows.map((row, idx) => ({
    id: Number(row.ID ?? row.id) || idx + 1,
    name: row.Name ?? row.name ?? row.Title ?? "Highlight",
    imageUrl: row["Image URL"] ?? row.imageUrl ?? row.image ?? "",
  }));
}

// ── Sheet: "Socials" ──
export interface SocialItem {
  id: number;
  name: string;
  handle: string;
  url: string;
  color: string;
  platform: string;
}

export function mapSocials(rows: any[]): SocialItem[] {
  return rows.map((row, idx) => ({
    id: Number(row.ID ?? row.id) || idx + 1,
    name: row.Name ?? row.name ?? row.Platform ?? "Social",
    handle: row.Handle ?? row.handle ?? "",
    url: row.URL ?? row.url ?? row.Link ?? "#",
    color: row.Color ?? row.color ?? "#ffffff",
    platform: (row.Platform ?? row.platform ?? row.Name ?? row.name ?? "").toLowerCase(),
  }));
}

// ── Sheet: "Reels" ──
export interface ReelItem {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

export function mapReels(rows: any[]): ReelItem[] {
  return rows.map((row, idx) => ({
    id: Number(row.ID ?? row.id) || idx + 1,
    title: row.Title ?? row.title ?? "",
    videoUrl: row["Video URL"] ?? row.videoUrl ?? row.video ?? "",
    thumbnailUrl: row["Thumbnail URL"] ?? row.thumbnailUrl ?? row.thumbnail ?? "",
    likes: Number(String(row.Likes ?? row.likes ?? 0).replace(/,/g, "")) || 0,
    comments: Number(String(row.Comments ?? row.comments ?? 0).replace(/,/g, "")) || 0,
    caption: row.Caption ?? row.caption ?? "",
  }));
}

// ── Sheet: "Site" ──
export interface SiteData {
  brandName: string;
  brandSlug: string;
  copyright: string;
  footerQuote: string;
}

export const DEFAULT_SITE: SiteData = {
  brandName: "",
  brandSlug: "",
  copyright: "",
  footerQuote: "",
};

export function mapSite(row: any): SiteData {
  return {
    brandName: row["Brand Name"] ?? row.brandName ?? DEFAULT_SITE.brandName,
    brandSlug: row["Brand Slug"] ?? row.brandSlug ?? DEFAULT_SITE.brandSlug,
    copyright: row.Copyright ?? row.copyright ?? DEFAULT_SITE.copyright,
    footerQuote: row["Footer Quote"] ?? row.footerQuote ?? DEFAULT_SITE.footerQuote,
  };
}
