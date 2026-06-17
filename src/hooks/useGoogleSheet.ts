import { useState, useEffect } from 'react';

export interface SheetRow {
  [key: string]: any;
}

// Highly aesthetic, rich default fallback data
export const FALLBACK_DATA: Record<string, any[]> = {
  HERO: [
    {
      name: "Cecilia Vance",
      tagline: "Executive Virtual Assistant & Business Operations Partner",
      headline: "Helping Visionary Entrepreneurs Focus On High-Impact Growth.",
      subheadline: "I streamline your systems, manage your complex calendar logistics, and clear your inbox clutter so you can operate at your absolute zone of genius.",
      ctaTextWork: "Let's Work Together",
      ctaTextResume: "Download Portfolio & Resume",
      portraitImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
      experienceBadge: "6+ Years Experience",
      projectsBadge: "150+ Workflows Designed",
      ratingBadge: "Top Rated VA Partner",
      resumeUrl: "https://docs.google.com/document/d/1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU/export?format=pdf"
    }
  ],
  STORY: [
    {
      title: "My Path from Corporate Structure to Entrepreneurial Support.",
      story: "Before founding my virtual assistance practice, I spent years refining administrative workflows inside scaling tech firms and high-visibility digital agencies. I noticed that high-integrity founders were routinely sacrificing over 5 hours daily on repetitive scheduling conflicts, administrative loops, and digital clutter.\n\nToday, I bridge that gap. I serve as a boutique partner for busy leaders, creative directors, and scaling founders globally—bringing structural calm, predictive calendar layouts, and absolute digital organization to their businesses.",
      mission: "To eliminate administrative friction for visionary companies, empowering them to pursue high-growth goals unburdened by details.",
      values: "Bespoke execution, radical ownership, absolute discretion, and organic visual balance.",
      quoteText: "Strategic order is the foundation upon which great ideas are built.",
      quoteAuthor: "Cecilia Vance"
    }
  ],
  SERVICES: [
    {
      serviceName: "Executive Calendar & Inbox Engineering",
      description: "Complete email sorting, daily schedule triage, double-booking prevention, meeting confirmations, and VIP customer filtering. I act as an elite defense layer for your time.",
      results: "Saves 15+ hours weekly & guarantees Inbox Zero by 5 PM.",
      iconName: "Inbox"
    },
    {
      serviceName: "Centralized System Architecture & SOPs",
      description: "Building intuitive Notion dashboards, setting up seamless Asana boards, and writing clear standard operating procedures (SOPs) so your operations can run on autopilot.",
      results: "Reduces team onboarding confusion by 40% immediately.",
      iconName: "Layout"
    },
    {
      serviceName: "Automated Client & CRM Logistical Workflows",
      description: "HubSpot schema optimization, lead pipeline tracking, elegant welcome sequences, invoice automated reminders, and Stripe custom payment integration setup.",
      results: "Keeps pipeline data 100% structured with instant payout tracking.",
      iconName: "Users"
    },
    {
      serviceName: "Creative Launch & Social Scheduling",
      description: "Planning aesthetic Pinterest boards, scheduling content grids on Later or Buffer, managing audience comments, and delivering monthly visual engagement metrics.",
      results: "3x wider Pinterest reach & structured social publishing plans.",
      iconName: "Sparkles"
    },
    {
      serviceName: "Boutique Financial Administration",
      description: "Drafting invoices, tracking contractor hours, conducting expense tagging, and delivering clean, ready-to-go spreadsheets for your CPA every single month.",
      results: "Eliminates tax-season panic entirely with structured folders.",
      iconName: "CreditCard"
    },
    {
      serviceName: "High-Touch Travel Planning",
      description: "Curating bespoke itineraries, matching dietary/carrier preferences, automating loyalty points logging, and building real-time mobile travel binders.",
      results: "Door-to-door flight, accommodation, and dinner booking ease.",
      iconName: "MapPin"
    }
  ],
  CLIENTS: [
    {
      clientLogo: "Vanguard Design",
      industry: "Luxury Architecture Studio",
      partnershipDuration: "2+ Years",
      metricLabel: "Tasks Completed",
      metricValue: "1,200+"
    },
    {
      clientLogo: "Scribe Editorial",
      industry: "Boutique Literary Publisher",
      partnershipDuration: "3+ Years",
      metricLabel: "Meetings Managed",
      metricValue: "850+"
    },
    {
      clientLogo: "Ethereal Agency",
      industry: "Feminine Luxury Brand Design",
      partnershipDuration: "1 Year",
      metricLabel: "Inboxes Saved",
      metricValue: "4"
    },
    {
      clientLogo: "Apex Ventures",
      industry: "Strategic VC Group",
      partnershipDuration: "4+ Years",
      metricLabel: "Flight Bookings",
      metricValue: "120+"
    }
  ],
  SKILLS: [
    { skillName: "Inbox Zero Mastery", category: "Administrative", expertiseSize: 95 },
    { skillName: "Calendar Logistics", category: "Administrative", expertiseSize: 90 },
    { skillName: "Bespoke Travel Engineering", category: "Administrative", expertiseSize: 85 },
    { skillName: "Later & Buffer Grids", category: "Marketing", expertiseSize: 75 },
    { skillName: "Pinterest Strategy", category: "Marketing", expertiseSize: 85 },
    { skillName: "Canva Layouts", category: "Marketing", expertiseSize: 80 },
    { skillName: "VIP Concierge Tone", category: "Communication", expertiseSize: 95 },
    { skillName: "Collaborator Seeding", category: "Communication", expertiseSize: 80 },
    { skillName: "HubSpot Automation", category: "Technical", expertiseSize: 85 },
    { skillName: "Notion Architecture", category: "Technical", expertiseSize: 95 },
    { skillName: "Zapier Flowcharts", category: "Technical", expertiseSize: 80 },
    { skillName: "Google Workspace Admin", category: "Technical", expertiseSize: 90 },
    { skillName: "Asana & ClickUp Boards", category: "Project Management", expertiseSize: 90 },
    { skillName: "SOP Document Writing", category: "Project Management", expertiseSize: 85 },
    { skillName: "Project Progress Auditing", category: "Project Management", expertiseSize: 85 }
  ],
  TESTIMONIALS: [
    {
      clientPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
      name: "Olivia Sterling",
      position: "Founder, Ethereal Agency",
      testimonial: "Cecilia has been an absolute godsend. She streamlined our HubSpot CRM and converted our messy files into a unified Notion database. I gained 12 hours back every single week to pitch and secure new contracts.",
      rotation: -3
    },
    {
      clientPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300",
      name: "Harrison Finch",
      position: "Managing Partner, Finch Partners",
      testimonial: "Discretion, hyper-precision, and proactive mindset. Cecilia coordinates travel schedules across three continents and sorts multi-million dollar business mailboxes efficiently. Indispensable.",
      rotation: 2
    },
    {
      clientPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      name: "Gabriella Rosales",
      position: "Creative Director, Rosales Editorial",
      testimonial: "Cecilia didn't just clear my inbox clutter—she built custom agency SOPs that allowed me to delegate operations seamlessly. Her design-focused taste and warm professionalism are unmatched.",
      rotation: -1
    }
  ],
  PORTFOLIO: [
    {
      title: "System Overhaul & Client Onboarding Suite",
      coverImage: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200",
      challenge: "A boutique luxury architecture firm was leaking prospective contacts because of laggy email responses and disorganized customer spreadsheets.",
      solution: "Engineered a client portal in Notion, connected structured intake forms using Zapier, and designed canned responsive sequence templates.",
      outcome: "Cut onboarding delay time from 6 days down to 1 hour, achieved 100% inquiry tracking accuracy, and secured 3 high-value retainer clients automatically.",
      metrics: "↑ 50% productivity | ↓ 75% client lag | 100% records saved"
    },
    {
      title: "Global Summit Schedule & Multi-Zone Travel Engine",
      coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200",
      challenge: "An active venture group with three senior directors was experiencing overlapping schedules, flight cancellations, and misallocated loyalty tier systems prior to key launch meetings.",
      solution: "Re-engineered executive agendas with overlapping filters and integrated active travel updates. Prepared detailed mobile trip schedules with offline transit assets.",
      outcome: "Zero missed connections, 32 flights booked with pristine timeline logs, and automated baggage expense claim processes.",
      metrics: "↑ 3x response speed | ↓ 100% calendar duplication | $12k+ mileage saved"
    }
  ],
  BLOGS: [
    {
      title: "The Elegant Art of Inbox Zero: Frameworks for Founders",
      category: "Digital Workspace",
      readingTime: "4 Min Read",
      publishDate: "June 14, 2026",
      content: "Many founders believe that keeping up with emails is an impossible chore. In reality, it is a structure problem. Learn how to configure simple, eye-safe labels, auto-archive settings, and rapid-response shortcuts that regain your precious sanity.",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Notion Architecture: Creating a Central Hub That Works",
      category: "Systems & Ops",
      readingTime: "6 Min Read",
      publishDate: "May 29, 2026",
      content: "A messy workstation breeds a messy mindset. Discover how building a minimalist, structured CRM dashboard and a clear SOP directory inside Notion can elevate your agency's delivery timeline and contractor accountability.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600"
    }
  ],
  RESUME: [
    {
      title: "Senior Executive Assistant & Lead CRM Strategist",
      role: "Operations Manager",
      company: "Vanguard Creative Partners",
      duration: "2023 - Present",
      description: "Managing executive agendas, optimizing HubSpot structures, crafting luxury welcome sequences, and supervising freelance contractors for high-growth aesthetic brands.",
      category: "Experience"
    },
    {
      title: "Lead Digital Operations & Administrative Concierge",
      role: "Business Specialist",
      company: "Thorne Asset Management",
      duration: "2020 - 2023",
      description: "Created customized organizational files across three global offices, designed automated invoice templates, and maintained zero travel scheduling discrepancies.",
      category: "Experience"
    },
    {
      title: "Certified Virtual Assistant & Operations Professional",
      role: "Global Secretariat Academy",
      company: "Executive Assistant VA Credential",
      duration: "2019",
      description: "Specialized training in high-priority inbox management, HubSpot architectures, advanced travel logistical modeling, and client discretion policies.",
      category: "Certification"
    }
  ],
  CONTACT: [
    {
      email: "cecilia@valuxeassistant.com",
      whatsApp: "+1 (555) 389-9234",
      linkedIn: "linkedin.com/in/cecilia-vance",
      facebook: "facebook.com/valuxe.assistant",
      description: "Let's bring structure and peaceful operation to your creative ecosystem. Fill out the intake inquiry below, or send a direct text on WhatsApp to chat scheduler retainer scopes."
    }
  ]
};

function camelCase(str: string): string {
  const cleaned = str
    .replace(/[^a-zA-Z0-9\s-_]+/g, '')
    .trim();
  
  if (!cleaned) {
    const fallback = str.replace(/[^a-zA-Z0-9]/g, '');
    return fallback ? fallback.toLowerCase() : 'field';
  }

  return cleaned
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}

/**
 * Custom parser for Google Sheet gviz JSON responses
 */
export function parseGvizResponse(rawText: string): SheetRow[] {
  try {
    const start = rawText.indexOf('google.visualization.Query.setResponse(');
    if (start === -1) {
      throw new Error('Invalid gviz format: missing setResponse prefix');
    }
    const jsonStart = start + 'google.visualization.Query.setResponse('.length;
    const end = rawText.lastIndexOf(');');
    if (end === -1) {
      throw new Error('Invalid gviz format: missing suffix');
    }
    const jsonStr = rawText.substring(jsonStart, end);
    const data = JSON.parse(jsonStr);

    if (!data.table || !data.table.cols || !data.table.rows) {
      throw new Error('Table structure is missing in spreadsheet response');
    }

    const { cols, rows } = data.table;

    // Map columns dynamically
    const headers = cols.map((col: any, index: number) => {
      let label = col.label ? col.label.trim() : '';
      if (!label && col.id) {
        label = col.id;
      }
      if (!label) {
        label = `col_${index}`;
      }
      return {
        label,
        key: camelCase(label),
        index,
      };
    });

    return rows.map((row: any) => {
      const obj: SheetRow = {};
      headers.forEach((header: any) => {
        if (!row.c) return;
        const cell = row.c[header.index];
        let val = '';
        if (cell) {
          if (cell.v !== null && cell.v !== undefined) {
            val = cell.v;
          } else if (cell.f !== null && cell.f !== undefined) {
            // Formatted values like currency/dates
            val = cell.f;
          }
        }
        obj[header.key] = val;
      });
      return obj;
    });
  } catch (error) {
    console.error('Failed to parse Google Sheet subtable response:', error);
    return [];
  }
}

/**
 * Reusable hook to fetch a Google Sheet tab
 */
export function useGoogleSheet(sheetName: string) {
  const [data, setData] = useState<SheetRow[]>(FALLBACK_DATA[sheetName] || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching from user's Google Sheet URL with query parameters
      const baseUrl = 'https://docs.google.com/spreadsheets/d/1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU/gviz/tq';
      const url = `${baseUrl}?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP network error code ${res.status}`);
      }
      const rawText = await res.text();
      const parsed = parseGvizResponse(rawText);

      if (parsed && parsed.length > 0) {
        const validatedData = parsed.map((item, index) => {
          // Merge with fallback data items to preserve required keys
          const fallbackArr = FALLBACK_DATA[sheetName] || [];
          const matchedFallback = fallbackArr[index % fallbackArr.length] || {};
          return {
            ...matchedFallback,
            ...item
          };
        });
        setData(validatedData);
        setIsFallback(false);
      } else {
        throw new Error('Google Sheet parsed successfully but returned zero rows.');
      }
    } catch (err: any) {
      console.warn(`Could not load sheet [${sheetName}]:`, err.message, '- rendering beautiful local portfolio fallback.');
      setIsFallback(true);
      // Use fallback
      setData(FALLBACK_DATA[sheetName] || []);
      setError(err.message || 'Sheet API error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [sheetName]);

  return { data, loading, error, isFallback, refresh };
}
