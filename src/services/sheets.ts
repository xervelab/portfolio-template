/**
 * Google Sheets Data Service
 * Fetches portfolio data from Google Sheets using the Visualization API
 */

import { ServicePackage, Skill, Project, Testimonial, Profile } from "../types";

const SHEET_ID = "1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU";
// `headers=1` forces Google to always treat the first row as column headers.
// Without it, all-text tabs (Profile, Projects, TimeSlots) are returned with
// empty column labels and the header names leak into the first data row.
const GOOGLE_SHEETS_URL = (sheetName: string) =>
  `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(
    sheetName
  )}`;

interface GoogleVisualizationResponse {
  version: string;
  reqId: string;
  status: string;
  p: { [key: string]: string };
  table: {
    cols: Array<{ id: string; label: string; type: string }>;
    rows: Array<{ c: Array<{ v: string | number | boolean | null }> }>;
  };
}

/**
 * Parse Google Sheets response and convert to array of objects
 */
function parseSheetResponse(
  response: GoogleVisualizationResponse
): Record<string, string | number | boolean>[] {
  const cols = response.table.cols;
  const rows = response.table.rows;

  return rows.map((row) => {
    const obj: Record<string, string | number | boolean> = {};
    cols.forEach((col, index) => {
      const value = row.c[index]?.v;
      obj[col.label] = value !== null ? value : "";
    });
    return obj;
  });
}

/**
 * Fetch data from a specific Google Sheet tab by its tab name
 */
async function fetchSheetData(
  sheetName: string
): Promise<Record<string, string | number | boolean>[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL(sheetName));
    const text = await response.text();

    // Google wraps the JSON like: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
    // Extract only the JSON object between the first "{" and the last "}".
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) {
      throw new Error("Unexpected Google Sheets response format");
    }
    const jsonString = text.substring(start, end + 1);
    const data = JSON.parse(jsonString);

    if (data.status === "error") {
      throw new Error(`Google Sheets error: ${data.errors?.join(", ")}`);
    }

    return parseSheetResponse(data);
  } catch (error) {
    console.error(`Error fetching sheet data (sheet: ${sheetName}):`, error);
    throw error;
  }
}

/**
 * Tab names for each section. These must match the actual tab names in the
 * Google Sheet exactly (case-sensitive).
 */
export const SHEET_TABS = {
  PROFILE: "Profile",
  SERVICES: "Services",
  SKILLS: "Skills",
  PROJECTS: "Projects",
  TESTIMONIALS: "Testimonials",
  TIME_SLOTS: "TimeSlots",
};

/**
 * Data transformation functions
 */

export async function loadServices(): Promise<ServicePackage[]> {
  const data = await fetchSheetData(SHEET_TABS.SERVICES);
  const services = data
    .map((row) => ({
      id: String(row.id || ""),
      name: String(row.name || ""),
      description: String(row.description || ""),
      rate: Number(row.rate || 0),
      priceInfo: String(row.priceInfo || ""),
      iconName: String(row.iconName || ""),
      colorAccent: String(row.colorAccent || ""),
      features: parseArrayField(row.features),
      badgeText: row.badgeText ? String(row.badgeText) : undefined,
    }))
    .filter((s) => s.id && s.name);
  if (services.length === 0) {
    throw new Error("No valid service rows found (check the Services tab name and column headers)");
  }
  return services;
}

export async function loadSkills(): Promise<Skill[]> {
  const data = await fetchSheetData(SHEET_TABS.SKILLS);
  const skills = data
    .map((row) => ({
      name: String(row.name || ""),
      category: String(row.category || "") as Skill["category"],
      description: String(row.description || ""),
      level: Number(row.level || 0),
      tools: parseArrayField(row.tools),
    }))
    .filter((s) => s.name);
  if (skills.length === 0) {
    throw new Error("No valid skill rows found (check the Skills tab name and column headers)");
  }
  return skills;
}

export async function loadProjects(): Promise<Project[]> {
  const data = await fetchSheetData(SHEET_TABS.PROJECTS);
  const projects = data
    .map((row) => ({
      id: String(row.id || ""),
      title: String(row.title || ""),
      category: String(row.category || ""),
      client: String(row.client || ""),
      description: String(row.description || ""),
      challenge: String(row.challenge || ""),
      solution: String(row.solution || ""),
      outcome: String(row.outcome || ""),
      imageUrl: String(row.imageUrl || ""),
      toolsUsed: parseArrayField(row.toolsUsed),
      statsHighlight: row.statsHighlight ? String(row.statsHighlight) : undefined,
    }))
    .filter((p) => p.id && p.title);
  if (projects.length === 0) {
    throw new Error("No valid project rows found (check the Projects tab name and column headers)");
  }
  return projects;
}

export async function loadTestimonials(): Promise<Testimonial[]> {
  const data = await fetchSheetData(SHEET_TABS.TESTIMONIALS);
  const testimonials = data
    .map((row) => ({
      id: String(row.id || ""),
      name: String(row.name || ""),
      role: String(row.role || ""),
      company: String(row.company || ""),
      feedback: String(row.feedback || ""),
      rating: Number(row.rating || 0),
      avatarUrl: String(row.avatarUrl || ""),
    }))
    .filter((t) => t.id && t.name);
  if (testimonials.length === 0) {
    throw new Error("No valid testimonial rows found (check the Testimonials tab name and column headers)");
  }
  return testimonials;
}

export async function loadTimeSlots(): Promise<string[]> {
  const data = await fetchSheetData(SHEET_TABS.TIME_SLOTS);
  const slots = data
    .map((row) => String(row.timeSlot || ""))
    .filter((slot) => slot.length > 0);
  if (slots.length === 0) {
    throw new Error("No valid time slot rows found (check the TimeSlots tab name and column header)");
  }
  return slots;
}

/**
 * Load the personal profile from a key/value sheet.
 * The Profile tab must have two columns: `key` and `value` (one field per row).
 * Only keys present in the sheet are returned; missing keys fall back to defaults.
 */
export async function loadProfile(): Promise<Partial<Profile>> {
  const data = await fetchSheetData(SHEET_TABS.PROFILE);
  const profile: Record<string, string> = {};
  data.forEach((row) => {
    const key = String(row.key || "").trim();
    if (key) {
      profile[key] = String(row.value ?? "");
    }
  });
  if (!profile.name) {
    throw new Error("No valid profile data found (check the Profile tab name and that it has `key`/`value` columns)");
  }
  return profile as Partial<Profile>;
}

/**
 * Helper function to parse comma-separated array fields
 * Assumes fields are stored as comma-separated strings in the sheet
 */
function parseArrayField(value: string | number | boolean | null | undefined): string[] {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}
