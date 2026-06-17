/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HeroData,
  AboutData,
  ServiceData,
  SkillData,
  ClientData,
  ProjectData,
  TestimonialData,
  BlogData,
  ResumeItem,
  ContactData
} from '../types';

import {
  fallbackHero,
  fallbackAbout,
  fallbackServices,
  fallbackSkills,
  fallbackClients,
  fallbackPortfolio,
  fallbackTestimonials,
  fallbackBlogs,
  fallbackResume,
  fallbackContact
} from '../utils/defaultData';

const SPREADSHEET_ID = '1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU';
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

/**
 * Normalizes headers to standard lowercase, alphanumeric strings
 */
function normalizeHeader(label: string, fallbackIdx: number): string {
  if (!label) return `col_${fallbackIdx}`;
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Parses the Google Sheets visualization JSON structure
 */
function parseGvizResponse(text: string): Record<string, any>[] {
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
  if (!match) {
    throw new Error('Could not parse Google Sheets response format');
  }

  const json = JSON.parse(match[1]);
  if (json.status === 'error') {
    throw new Error(json.errors?.[0]?.detailed_message || 'Google Sheets API error');
  }

  const table = json.table;
  if (!table || !table.cols || !table.rows) {
    return [];
  }

  // Create clean string representations of column keys
  const headers = table.cols.map((col: any, idx: number) => {
    return normalizeHeader(col.label, idx);
  });

  return table.rows.map((row: any) => {
    const obj: Record<string, any> = {};
    if (row && row.c) {
      row.c.forEach((cell: any, idx: number) => {
        const val = cell ? cell.v : null;
        const key = headers[idx] || `col_${idx}`;
        obj[key] = val;
        // Map raw indexes too as a fallback mechanism
        obj[`_${idx}`] = val;
      });
    }
    return obj;
  });
}

/**
 * Fetches sheet data using the public gviz/tq endpoint and parses it.
 */
export async function fetchSheetData(sheetName: string): Promise<Record<string, any>[]> {
  const url = `${BASE_URL}&sheet=${encodeURIComponent(sheetName)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch sheet ${sheetName}: ${res.statusText}`);
    }
    const text = await res.text();
    return parseGvizResponse(text);
  } catch (error) {
    console.warn(`Could not retrieve dynamic sheet [${sheetName}]:`, error);
    throw error;
  }
}

/**
 * Maps the parsed sheet data into appropriate section types.
 */
export async function getSectionData<T>(sheetName: string): Promise<T> {
  const UPPER_NAME = sheetName.toUpperCase();
  const rawData = await fetchSheetData(UPPER_NAME);

  if (rawData.length === 0) {
    throw new Error(`No records returned from sheet: ${sheetName}`);
  }

  switch (UPPER_NAME) {
    case 'HERO': {
      const row = rawData[0];
      // Expected: 0: name, 1: jobtitle, 2: intro, 3: imageurl, 4: resumeurl, 5: skills (comma-separated string)
      const name = row.name || row._0 || fallbackHero.name;
      const jobTitle = row.jobtitle || row.title || row._1 || fallbackHero.jobTitle;
      const intro = row.introduction || row.intro || row._2 || fallbackHero.intro;
      const imageUrl = row.imageurl || row.image || row._3 || fallbackHero.imageUrl;
      const resumeUrl = row.resumeurl || row.resume || row._4 || fallbackHero.resumeUrl;
      const skillsStr = row.skills || row.skillslist || row._5;
      
      const skills = skillsStr
        ? String(skillsStr).split(',').map((s) => s.trim()).filter(Boolean)
        : fallbackHero.skills;

      return {
        name,
        jobTitle,
        intro,
        imageUrl,
        resumeUrl,
        skills,
      } as unknown as T;
    }

    case 'ABOUT': {
      const row = rawData[0];
      // Expected: 0: summary, 1: experience/years, 2: industries, 3: projectsCompleted, 4: happyClients, 5: responseRate
      const summary = row.summary || row.bio || row._0 || fallbackAbout.summary;
      const yearsVal = row.years || row.experience || row._1;
      const yearsOfExperience = yearsVal ? parseInt(String(yearsVal), 10) : fallbackAbout.yearsOfExperience;
      
      const indStr = row.industriesserved || row.industries || row._2;
      const industriesServed = indStr
        ? String(indStr).split(',').map((s) => s.trim()).filter(Boolean)
        : fallbackAbout.industriesServed;

      const pCount = row.projectscompleted || row.projects || row._3;
      const projectsCompleted = pCount ? parseInt(String(pCount), 10) : fallbackAbout.projectsCompleted;

      const cCount = row.happyclients || row.clients || row._4;
      const happyClients = cCount ? parseInt(String(cCount), 10) : fallbackAbout.happyClients;

      const responseRate = row.responserate || row.response || row._5 || fallbackAbout.responseRate;

      return {
        summary,
        yearsOfExperience,
        industriesServed,
        projectsCompleted,
        happyClients,
        responseRate,
      } as unknown as T;
    }

    case 'SERVICES': {
      // Expected: Row list -> title, description, startingPrice, icon
      return rawData.map((row, idx) => {
        return {
          id: row.id || `sheet-service-${idx}`,
          title: row.title || row.servicetitle || row._0 || `Service ${idx + 1}`,
          description: row.description || row._1 || 'Professional VA assistance.',
          startingPrice: row.price || row.startingprice || row._2 || undefined,
          icon: row.icon || row._3 || 'briefcase',
        };
      }) as unknown as T;
    }

    case 'SKILLS': {
      // Expected: Row list -> name, category, progress, yearsOfExperience
      return rawData.map((row, idx) => {
        const progressVal = row.progress || row.level || row._2;
        let progress = 90;
        if (progressVal !== undefined && progressVal !== null) {
          const parsed = parseInt(String(progressVal).replace(/[^0-9]/g, ''), 10);
          if (!isNaN(parsed)) progress = parsed;
        }
        return {
          name: row.name || row.skillname || row._0 || `Skill ${idx + 1}`,
          category: row.category || row._1 || 'General',
          progress,
          yearsOfExperience: row.yearsofexperience || row.years || row._3 || '1+ Years',
        };
      }) as unknown as T;
    }

    case 'CLIENTS': {
      // Expected: Row list -> name, logo (text or url), industry, servicesProvided, testimonial
      return rawData.map((row, idx) => {
        return {
          id: row.id || `sheet-client-${idx}`,
          name: row.name || row.clientname || row._0 || `Client ${idx + 1}`,
          logo: row.logo || row.clientlogo || row._1 || (row.name || row._0 || 'C').charAt(0),
          industry: row.industry || row._2 || 'Agnostic',
          servicesProvided: row.services || row.servicesprovided || row._3 || 'VA Consultation',
          testimonial: row.testimonial || row.feedback || row._4 || 'Exceptional work, highly recommended.',
        };
      }) as unknown as T;
    }

    case 'PORTFOLIO': {
      // Expected: Row list -> title, description, toolsUsed, resultsAchieved, imageUrl
      return rawData.map((row, idx) => {
        const toolsStr = row.tools || row.toolsused || row._2;
        const toolsUsed = toolsStr
          ? String(toolsStr).split(',').map((s) => s.trim()).filter(Boolean)
          : [];
        return {
          id: row.id || `sheet-portfolio-${idx}`,
          title: row.title || row._0 || `Project ${idx + 1}`,
          description: row.description || row._1 || 'Project description placeholder.',
          toolsUsed,
          resultsAchieved: row.results || row.resultsachieved || row._3 || 'Optimal outcomes completed.',
          imageUrl: row.image || row.imageurl || row.projectimage || row._4 || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
        };
      }) as unknown as T;
    }

    case 'TESTIMONIALS': {
      // Expected: Row list -> name, position, feedback, imageUrl
      return rawData.map((row, idx) => {
        return {
          id: row.id || `sheet-testimonial-${idx}`,
          clientName: row.name || row.clientname || row._0 || 'Confident Client',
          position: row.position || row.title || row._1 || 'Business Owner',
          feedback: row.feedback || row.testimonial || row._2 || 'Highly talented assistant, extremely detail oriented.',
          imageUrl: row.image || row.photo || row.imageurl || row._3 || undefined,
        };
      }) as unknown as T;
    }

    case 'BLOGS': {
      // Expected: Row list -> title, excerpt, publishDate, imageUrl, readMoreUrl
      return rawData.map((row, idx) => {
        return {
          id: row.id || `sheet-blog-${idx}`,
          title: row.title || row._0 || `Insightful Post ${idx + 1}`,
          excerpt: row.excerpt || row._1 || 'Reviewing core structures of outsourcing.',
          publishDate: row.date || row.publishdate || row._2 || '2026-06-17',
          imageUrl: row.image || row.coverimage || row._3 || 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=400',
          readMoreUrl: row.url || row.readmore || row._4 || 'https://medium.com',
        };
      }) as unknown as T;
    }

    case 'RESUME': {
      // Expected: Row list -> type ('experience', 'education', 'certification'), title, organization, dateRange, description
      return rawData.map((row, idx) => {
        let typeVal = String(row.type || row._0 || 'experience').toLowerCase().trim();
        let type: 'experience' | 'education' | 'certification' = 'experience';
        if (typeVal.includes('edu')) type = 'education';
        else if (typeVal.includes('cert')) type = 'certification';

        return {
          id: row.id || `sheet-resume-${idx}`,
          type,
          title: row.title || row.role || row._1 || 'Assistant',
          organization: row.organization || row.company || row.school || row._2 || 'Enterprise Co.',
          dateRange: row.date || row.duration || row.daterange || row._3 || 'Continuous',
          description: row.description || row._4 || undefined,
        };
      }) as unknown as T;
    }

    case 'CONTACT': {
      const row = rawData[0];
      // Expected: 0: email, 1: phone, 2: whatsapp, 3: linkedin, 4: facebook
      const email = row.email || row._0 || fallbackContact.email;
      const phone = row.phone || row._1 || fallbackContact.phone;
      const whatsAppPruned = (row.whatsapp || row._2 || fallbackContact.whatsApp).toString().replace(/[^0-9]/g, '');
      const whatsApp = row.whatsapp || row._2 || fallbackContact.whatsApp;
      const whatsAppUrl = `https://wa.me/${whatsAppPruned}`;
      const linkedIn = row.linkedin || row._3 || fallbackContact.linkedIn;
      const facebook = row.facebook || row._4 || fallbackContact.facebook;

      return {
        email,
        phone,
        whatsApp,
        whatsAppUrl,
        linkedIn,
        facebook,
      } as unknown as T;
    }

    default:
      throw new Error(`Unsupported sheet type: ${sheetName}`);
  }
}
