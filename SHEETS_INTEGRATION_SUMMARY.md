# Google Sheets Integration - Implementation Summary

## What Changed

Your portfolio has been updated to dynamically load content from Google Sheets instead of using hardcoded data. Here's what was implemented:

### New Files Created

1. **[src/services/sheets.ts](src/services/sheets.ts)** - Google Sheets data service
   - Handles fetching data from Google Sheets using the Visualization API
   - Parses JSON responses and transforms them into typed objects
   - Includes error handling with fallback to static data

2. **[GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md)** - Complete setup guide
   - Instructions for configuring Google Sheets
   - Column structure for each data type
   - Troubleshooting tips

### Updated Files

1. **[src/data.ts](src/data.ts)**
   - Added import of async loading functions from sheets service
   - Kept static fallback data for when sheets are unavailable
   - Added async wrapper functions: `getServices()`, `getSkills()`, `getProjects()`, `getTestimonials()`, `getTimeSlots()`

2. **[src/App.tsx](src/App.tsx)**
   - Updated imports to use async loading functions
   - Added state variables for each data type: `services`, `skills`, `projects`, `testimonials`, `timeSlots`
   - Added `useEffect` hook to load all data on component mount
   - Replaced all hardcoded constant references with state variables
   - Graceful fallback to static data if Google Sheets fetch fails

## How It Works

1. **On App Load**: When your portfolio loads, the `useEffect` hook triggers data fetching from Google Sheets
2. **Data Fetching**: The `sheets.ts` service uses Google's Visualization API to fetch data in JSON format
3. **Fallback**: If Google Sheets is unavailable or private, the app automatically uses the static data defined in `data.ts`
4. **Real-time Updates**: Update your Google Sheet and refresh the browser to see changes

## Setup Instructions

### Step 1: Prepare Your Google Sheet

1. Create or open a Google Sheet with your portfolio data
2. Create separate tabs (sheets) for each section:
   - Services
   - Skills
   - Projects
   - Testimonials
   - TimeSlots

### Step 2: Configure Sheet Access

1. Click "Share" on your Google Sheet
2. Change permissions to "Anyone with the link can view"
3. Copy your Sheet ID from the URL (found between `/d/` and `/edit`)

### Step 3: Update Configuration

Open [src/services/sheets.ts](src/services/sheets.ts) and update:

```typescript
const SHEET_ID = "YOUR_SHEET_ID_HERE";

export const SHEET_TABS = {
  SERVICES: YOUR_GID_HERE,        // Replace with actual tab ID
  SKILLS: YOUR_GID_HERE,
  PROJECTS: YOUR_GID_HERE,
  TESTIMONIALS: YOUR_GID_HERE,
  TIME_SLOTS: YOUR_GID_HERE,
};
```

To find tab IDs:
1. Click on each sheet tab
2. Note the `gid=XXXX` value in the URL
3. Update the corresponding value in `SHEET_TABS`

### Step 4: Structure Your Sheets

Follow the column structure defined in [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) for each sheet type.

**Key Points:**
- Column names are case-sensitive
- Array fields (features, tools, etc.) should be comma-separated
- Numeric fields should contain numbers, not text
- Image URLs must be complete (starting with http:// or https://)

## Testing

1. Run your development server: `npm run dev`
2. Open browser Developer Tools (F12)
3. Check Console for any errors or warnings
4. Verify data loads from your Google Sheet

## Rollback

If you need to use only static data again:
1. Remove or revert the imports in `src/App.tsx`
2. Use the static constants: `SERVICES`, `SKILLS`, etc. directly
3. The static data remains available in `src/data.ts` for this purpose

## API Endpoint Format

The integration uses Google's public Visualization API:

```
https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?gid={GID}&out=json
```

- No API key required
- Sheet must be publicly accessible
- Real-time data syncing with your Google Sheet

## Security Notes

- Your Google Sheet must be publicly accessible (anyone with link can view)
- No sensitive data should be stored in the portfolio sheet
- The sheet ID is visible in the code and URLs

For more details, see [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md).
