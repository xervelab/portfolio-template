import { ServicePackage, Skill, Project, Testimonial } from "./types";

export const SERVICES: ServicePackage[] = [
  {
    id: "admin-calm",
    name: "Administrative Calm",
    description: "Remove the friction of day-to-day coordination. Perfect for overwhelmed leaders who need email containment and seamless travel or meeting logistics.",
    rate: 35,
    priceInfo: "$35 per hour",
    iconName: "Inbox",
    colorAccent: "brand-sage-500",
    features: [
      "Full priority email triage & response drafting",
      "Comprehensive calendar restructuring & gatekeeping",
      "Travel coordinates & local accommodation mapping",
      "Executive copyediting & elegant layout formatting",
      "Structured digital filing & document audits"
    ],
    badgeText: "Core Ops"
  },
  {
    id: "creative-support",
    name: "Creative Brand Support",
    description: "Translate your concepts into polished, on-brand digital materials. I design cohesive, reusable layouts and curate templates that expand your message.",
    rate: 45,
    priceInfo: "$45 per hour",
    iconName: "Sparkles",
    colorAccent: "brand-clay-500",
    features: [
      "Canva Pro asset layout curating (IG/LinkedIn/YouTube)",
      "Premium newsletter production (ConvertKit, Substack)",
      "Cohesive presenter slide decks & client onboarding PDFs",
      "Form audits & branded custom digital collateral",
      "Creative asset filing & brand style consistency maintenance"
    ],
    badgeText: "Most Popular"
  },
  {
    id: "tech-integration",
    name: "Systems & Tool Integration",
    description: "Stop wrestling with software. I build frictionless, automated workspaces that connect your tools so your business practically runs itself.",
    rate: 50,
    priceInfo: "$50 per hour",
    iconName: "Cpu",
    colorAccent: "brand-charcoal-800",
    features: [
      "Custom Notion Operating Dashboard & workspace build",
      "Zapier / Make.com custom workflows and automation",
      "CRM Onboarding (Honeybook, Dubsado, Notion CRM)",
      "Platform maintainance (Squarespace, Shopify, Webflow)",
      "Email newsletter listing clean-up & migrations"
    ],
    badgeText: "Tech Savvy"
  },
  {
    id: "daily-executive",
    name: "Daily Executive Retainer",
    description: "The ultimate premium partnership. Daily, proactive virtual management where I operate as your dedicated right-hand coordinator.",
    rate: 60,
    priceInfo: "Starts at $1,200/mo",
    iconName: "Shield",
    colorAccent: "brand-clay-600",
    features: [
      "Daily inbox monitoring & active gatekeeping",
      "Proactive task execution & deadline reminders",
      "Meeting agendas briefing & brief summary notes prep",
      "Direct representing for partner/client communications",
      "Priority messaging channel & 24-hr emergency response"
    ],
    badgeText: "Elite Care"
  }
];

export const SKILLS: Skill[] = [
  {
    name: "Canva Pro & Brand Asset Layout",
    category: "Design & Content",
    description: "Architecting editable Canva templates, stunning presentations, and visual social tiles optimized for active reach and brand integrity.",
    level: 95,
    tools: ["Canva Pro", "Figma", "Pinterest", "Adobe Express"]
  },
  {
    name: "Newsletter Production & Editorial",
    category: "Design & Content",
    description: "Designing, copyediting, and queuing high-engagement broadcasts with robust subscription list segmentations.",
    level: 90,
    tools: ["ConvertKit", "Substack", "Mailchimp", "Brevo"]
  },
  {
    name: "Zapier & Make.com Automation",
    category: "Systems & Tech",
    description: "Creating zero-stress data paths between CRMs, email lists, calendars, and file folders to automate repetitive actions.",
    level: 88,
    tools: ["Zapier", "Make.com (Integromat)", "Slack Webhooks", "IFTTT"]
  },
  {
    name: "Notion Workspace Architecture",
    category: "Systems & Tech",
    description: "Building relational databases, client portals, and task tracking matrices for comprehensive internal organizational clarity.",
    level: 92,
    tools: ["Notion", "ClickUp", "Asana", "Trello"]
  },
  {
    name: "Inbox Triage & System Clean-ups",
    category: "Admin & Ops",
    description: "Restructuring chaotic digital mailboxes using smart filters, folders, labelling protocols, and pre-written draft templates.",
    level: 96,
    tools: ["Google Workspace", "Outlook", "Superhuman", "Front"]
  },
  {
    name: "Creative Business Strategy",
    category: "Strategy & Growth",
    description: "Mapping customer journeys, designing onboarding client operations, and auditing tech stacks to identify cost savings.",
    level: 85,
    tools: ["Miro", "Loom", "Google Analytics", "Honeybook"]
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Eco-Aesthetic Brand Content Launch",
    category: "Social Design & Substack Setup",
    client: "Flora & Soil Design Studio",
    description: "Created a comprehensive launch content grid, featuring customized newsletter formats and elegant social graphics matching a natural color palette.",
    challenge: "The client was manually writing newsletter emails and had visual inconsistency on social platforms, resulting in high effort for low click-throughs.",
    solution: "I designed a reusable Canva style kit of 25 templates and moved their mailing list from safe-list format to Substack with customized header banners and a stylized sign-up landing experience.",
    outcome: "Achieved a 45% increase in newsletter initial signups and reduced client content formatting workload from 8 hours per week to under 1.5 hours.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    toolsUsed: ["Canva Pro", "Substack", "Lightroom Mobile"],
    statsHighlight: "Saved 6.5 hrs/week"
  },
  {
    id: "p2",
    title: "Syllabus, CRM, & Notion Infrastructure",
    category: "Systems Workspace Build",
    client: "Nolan Heights Coaching & Advisory",
    description: "Architected a custom digital Command Center in Notion, standardizing internal projects, tasks scheduling, client onboarding files, and CRM tracking.",
    challenge: "Advisors were losing track of client contract milestones and onboarding files across multiple scattered Google Docs.",
    solution: "I built an integrated Notion Hub with structured relational tables for Sessions, Clients, and Resources, automated via Zapier to sync with their intake form.",
    outcome: "Consolidated all communications, created frictionless onboarding for 12 new high-ticket advisory clients, and eliminated scattered back-and-forth emails.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
    toolsUsed: ["Notion", "Zapier", "Typeform", "Google Calendar"],
    statsHighlight: "100% Client Sync"
  },
  {
    id: "p3",
    title: "Signature Onboarding Automation Flow",
    category: "CRM & Automation Setup",
    client: "Atelier Arch-Modern (Interior Design Firm)",
    description: "Designed a smooth, high-fidelity contract-signing and onboarding sequence that triggers upon positive leads interest.",
    challenge: "Lead response times were taking up to 72 hours, resulting in warm prospects cooling off before contracts could be physically customized and dispatched.",
    solution: "Linked Honeybook to active design forms using custom Zapier pipelines. The system triggers a contract drafting sequence, notifications on Slack, and pre-formatted mood board links automatically.",
    outcome: "Reduced manual client onboarding processing to less than 5 minutes. Leads response time went from 3 days down to instantaneous confirmation email.",
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f799d5a4f?auto=format&fit=crop&q=80&w=800",
    toolsUsed: ["Honeybook", "Zapier", "Slack", "Asana"],
    statsHighlight: "Response Time -95%"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Eleanor Vance",
    role: "Founding Architect",
    company: "Flora & Soil Design Studio",
    feedback: "Celeste is an absolute lifesaver. She didn't just organize my emails; she completely reimagined how my design studio publishes brand content. I can finally focus on architectural concepts while the operational engine runs flawlessly in the background.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t2",
    name: "Dr. Arthur Nolan",
    role: "Executive Performance Advisor",
    company: "Nolan Heights Advisory",
    feedback: "The Notion Workspace Celeste built for my practice has become our core nervous system. Everything is hyper-linked, visually clear, and integrated perfectly with our intake tools. Highly professional, aesthetically meticulous, and extremely fast.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: "t3",
    name: "Siena Russo",
    role: "Director of Brand",
    company: "Atelier Arch-Modern",
    feedback: "I am amazed by Celeste's technical capability. She connected our CRM, Slack, and task manager so seamlessly that we saved hours of admin work. Beyond that, her visual designs for our private newsletters are gorgeous.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
  }
];

export const TIME_SLOTS: string[] = [
  "09:30 AM - 10:00 AM",
  "10:15 AM - 10:45 AM",
  "11:00 AM - 11:30 AM",
  "01:30 PM - 02:00 PM",
  "02:15 PM - 02:45 PM",
  "03:30 PM - 04:00 PM",
  "04:15 PM - 04:45 PM"
];
