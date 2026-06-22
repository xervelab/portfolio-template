# Google Sheets Integration Setup Guide

This guide explains how to configure your portfolio to dynamically load content from Google Sheets.

## Overview

Your portfolio now loads data from Google Sheets instead of hardcoded values. This allows you to update your services, skills, projects, testimonials, and time slots directly in a spreadsheet without touching code.

## Prerequisites

- A Google Sheets document that is publicly accessible (anyone with the link can view)
- Your Google Sheets ID (found in the URL)
- The sheet tab IDs (gid values)

## Configuration Steps

### 1. Update the Sheet ID

Open [src/services/sheets.ts](src/services/sheets.ts) and update the `SHEET_ID` constant with your Google Sheets ID:

```typescript
const SHEET_ID = "YOUR_SHEET_ID_HERE"; // Replace with your actual sheet ID
```

### 2. Set Up Sheet Tabs

Each section of your portfolio should be in a separate tab in your Google Sheets document. The default tab names are:

- **Services** - Service packages with rates and features
- **Skills** - Your professional skills with categories and proficiency levels
- **Projects** - Portfolio projects and case studies
- **Testimonials** - Client testimonials and reviews
- **TimeSlots** - Available booking time slots

### 3. Find Sheet Tab IDs

For each tab in your Google Sheets:

1. Click on the tab at the bottom of the sheet
2. Look at the URL and find the `gid=XXXX` parameter
3. Copy that number

Example URL: `https://docs.google.com/spreadsheets/d/ABC123/edit?gid=2070066926#gid=2070066926`
The gid is: `2070066926`

### 4. Update Tab IDs in Code

In [src/services/sheets.ts](src/services/sheets.ts), update the `SHEET_TABS` object with your actual tab IDs:

```typescript
export const SHEET_TABS = {
  SERVICES: 2070066926,        // Update with your Services tab gid
  SKILLS: 1234567890,          // Update with your Skills tab gid
  PROJECTS: 0987654321,        // Update with your Projects tab gid
  TESTIMONIALS: 1111111111,    // Update with your Testimonials tab gid
  TIME_SLOTS: 2222222222,      // Update with your Time Slots tab gid
};
```

## Sheet Structure

### Services Tab

Required columns:
- `id` - Unique identifier (e.g., "admin-calm")
- `name` - Service name
- `description` - Service description
- `rate` - Hourly rate (numeric)
- `priceInfo` - Display text (e.g., "$35 per hour")
- `iconName` - Lucide icon name (e.g., "Inbox", "Sparkles", "Cpu", "Shield")
- `colorAccent` - Tailwind color class (e.g., "brand-sage-500")
- `badgeText` - Optional badge label (e.g., "Core Ops")

Example features storage (comma-separated in single cell):
- `features` - "Full priority email triage & response drafting, Comprehensive calendar restructuring & gatekeeping, Travel coordinates & local accommodation mapping"

### Skills Tab

Required columns:
- `name` - Skill name
- `category` - Skill category ("Design & Content" | "Systems & Tech" | "Admin & Ops" | "Strategy & Growth")
- `description` - Skill description
- `level` - Proficiency level (0-100, represents percentage)
- `tools` - Comma-separated tools (e.g., "Canva Pro, Figma, Pinterest")

### Projects Tab

Required columns:
- `id` - Unique identifier
- `title` - Project title
- `category` - Project category
- `client` - Client name
- `description` - Project overview
- `challenge` - The challenge addressed
- `solution` - The solution provided
- `outcome` - The results achieved
- `imageUrl` - Image URL (full URL required)
- `toolsUsed` - Comma-separated tools used
- `statsHighlight` - Optional: Single highlight stat (e.g., "Saved 6.5 hrs/week")

### Testimonials Tab

Required columns:
- `id` - Unique identifier
- `name` - Testimonial author name
- `role` - Author's role/title
- `company` - Author's company
- `feedback` - Full testimonial text
- `rating` - Rating (1-5)
- `avatarUrl` - Profile image URL (full URL required)

### TimeSlots Tab

Required columns:
- `timeSlot` - Time slot string (e.g., "09:30 AM - 10:00 AM")

## Array Fields

Fields that contain multiple items (like features, tools, etc.) should be stored as **comma-separated values** in a single cell:

```
Feature 1, Feature 2, Feature 3, Feature 4
```

The code will automatically parse these and split them into arrays.

## Publishing Your Sheet

**IMPORTANT**: Your Google Sheet must be publicly accessible for the portfolio to fetch the data.

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Change sharing settings to "Anyone with the link can view"
4. Copy the link and verify it can be accessed without signing in

## Fallback Behavior

If the Google Sheets fetch fails (network error, sheet is private, etc.), the application will automatically fall back to the static data defined in [src/data.ts](src/data.ts). This ensures your site never completely breaks.

To test the fallback, you can:
1. Keep your sheet private temporarily
2. Check the browser console for fallback warnings
3. The page should still display using the static data

## Testing

1. After updating the sheet IDs, run `npm run dev`
2. Open your browser's Developer Tools (F12)
3. Go to the Console tab
4. Check for any error messages about fetching from Google Sheets
5. Verify that your data is loading correctly

## Troubleshooting

### Data not updating
- Check that the sheet is publicly accessible
- Verify the `gid` values are correct
- Check browser console for error messages
- Clear browser cache and reload

### Parse errors
- Verify column names match exactly (case-sensitive)
- Check that numeric fields contain numbers, not text
- Ensure array fields use comma-separated values

### Sheet is private
- The data won't load if the sheet requires authentication
- Share settings must be set to "Anyone with the link can view"
- Check the "Share" button settings

## Technical Details

The integration uses Google's Visualization API query language (gviz/tq) to fetch data in JSON format. The API endpoint for each tab is:

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?gid={GID}&out=json
```

No API key is required, but the sheet must be publicly accessible.
