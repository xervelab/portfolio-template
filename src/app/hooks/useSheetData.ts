import { useState, useEffect } from "react";

const SHEETDB_BASE = "https://sheetdb.io/api/v1/de7mxzfmbvmy7";

/**
 * Generic hook to fetch data from a specific SheetDB tab (sheet name).
 * SheetDB uses ?sheet=<name> to query different tabs.
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

    async function fetchData() {
      try {
        const url = `${SHEETDB_BASE}?sheet=${encodeURIComponent(sheetName)}`;
        const res = await fetch(url, { redirect: "follow" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rows: any[] = Array.isArray(json) ? json : json.data ?? json.rows ?? [];

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

    fetchData();
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

    async function fetchData() {
      try {
        const url = `${SHEETDB_BASE}?sheet=${encodeURIComponent(sheetName)}`;
        const res = await fetch(url, { redirect: "follow" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rows: any[] = Array.isArray(json) ? json : json.data ?? json.rows ?? [];

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

    fetchData();
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
  username: "maya.chen.art",
  displayName: "Maya Chen",
  avatarUrl: "https://images.unsplash.com/photo-1551180452-aea351b23949?w=150&h=150&fit=crop&auto=format",
  bio: "Contemporary painter · Oil & acrylic on canvas\nNew York · Exhibitions in NYC, Paris & Tokyo",
  quote: "Every canvas is a conversation with silence",
  location: "New York, NY",
  posts: "248",
  followers: "42.5K",
  following: "312",
  currentlyWorking: '"Untitled No. 31" — Oil on linen, 48×60in',
  availableForCommissions: true,
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

// ── Sheet: "Site" ──
export interface SiteData {
  brandName: string;
  brandSlug: string;
  copyright: string;
  footerQuote: string;
}

export const DEFAULT_SITE: SiteData = {
  brandName: "Maya Chen",
  brandSlug: "maya.art",
  copyright: "© 2024 Maya Chen · All Rights Reserved · New York, NY",
  footerQuote: "Art is not what you see, but what you make others see.",
};

export function mapSite(row: any): SiteData {
  return {
    brandName: row["Brand Name"] ?? row.brandName ?? DEFAULT_SITE.brandName,
    brandSlug: row["Brand Slug"] ?? row.brandSlug ?? DEFAULT_SITE.brandSlug,
    copyright: row.Copyright ?? row.copyright ?? DEFAULT_SITE.copyright,
    footerQuote: row["Footer Quote"] ?? row.footerQuote ?? DEFAULT_SITE.footerQuote,
  };
}
