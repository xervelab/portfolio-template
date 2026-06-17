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

export const fallbackHero: HeroData = {
  name: "Sarah Jenkins",
  jobTitle: "Elite Executive Virtual Assistant",
  intro: "Helping remote founders, scaling agencies, and business owners reclaim 20+ hours a week by managing executive operations, inbox flow, and digital workflows.",
  imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  resumeUrl: "https://docs.google.com/document/d/1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU/edit?usp=sharing",
  skills: ["Inbox Management", "Executive Scheduling", "Operations & Systems", "Social Media Strategy", "CRM Automation"]
};

export const fallbackAbout: AboutData = {
  summary: "With over 7 years of professional administrative experience, I specialize in streamlining operations, freeing up mental bandwidth, and implementing high-efficiency administrative engines. I've partnered with venture-backed SaaS startups, boutique consulting firms, and busy creative agencies to bring structure and scalability to their daily operations.",
  yearsOfExperience: 7,
  industriesServed: ["SaaS & Biotech", "E-commerce Brands", "Digital Agencies", "Professional Consulting", "Real Estate Brokers"],
  projectsCompleted: 142,
  happyClients: 54,
  responseRate: "100% within 1 hour"
};

export const fallbackServices: ServiceData[] = [
  {
    id: "s1",
    title: "Executive Assistance",
    description: "Proactive, high-level administrative partnership including travel planning, dynamic scheduling, and priority meeting preparation.",
    startingPrice: "$35 / hr",
    icon: "briefcase"
  },
  {
    id: "s2",
    title: "Inbox & Email Management",
    description: "Achieve and maintain Inbox Zero. Filtering spam, triage labeling, drafting high-priority responses, and managing daily follow-ups.",
    startingPrice: "$250 / mo",
    icon: "mail"
  },
  {
    id: "s3",
    title: "Calendar & Scheduling",
    description: "Intelligent time blocking, appointment coordinating, buffer times matching, and conflict resolution across multiple time zones.",
    startingPrice: "$180 / mo",
    icon: "calendar"
  },
  {
    id: "s4",
    title: "Social Media Coordination",
    description: "Scheduling posts, copywriting captions, engaging with comments, managing campaign assets, and preparing performance analytics.",
    startingPrice: "$450 / mo",
    icon: "share-2"
  },
  {
    id: "s5",
    title: "Technical Admin & CRM",
    description: "Setting up workflows, CRM integrations, sales funnel administration, managing automated emails in HubSpot, ActiveCampaign, etc.",
    startingPrice: "$45 / hr",
    icon: "cpu"
  },
  {
    id: "s6",
    title: "Project Management Support",
    description: "Keeping boards (Asana, Notion, ClickUp) updated, assigning action items, following up on milestones, and compiling weekly summaries.",
    startingPrice: "$40 / hr",
    icon: "list-todo"
  },
  {
    id: "s7",
    title: "Custom Air-Tight Research",
    description: "Competitive analysis matrices, vendor shortlists, property reports, podcast guest vetting, or executive brief write-ups.",
    startingPrice: "$30 / hr",
    icon: "search"
  },
  {
    id: "s8",
    title: "Data Entry & Auditing",
    description: "High-accuracy sheet formatting, contact cleaning, CRM validation, document transcription, and manual invoice tracking.",
    startingPrice: "$25 / hr",
    icon: "database"
  }
];

export const fallbackSkills: SkillData[] = [
  // Administrative
  { name: "Inbox Auditing & Rules", category: "Administrative", progress: 98, yearsOfExperience: "7+ Years" },
  { name: "Advanced Time Zone Coordinating", category: "Administrative", progress: 95, yearsOfExperience: "6 Years" },
  { name: "Executive Minute Taking", category: "Administrative", progress: 90, yearsOfExperience: "5 Years" },
  // Communication
  { name: "Executive Ghostwriting", category: "Communication", progress: 92, yearsOfExperience: "4 Years" },
  { name: "Client Inbound Support", category: "Communication", progress: 96, yearsOfExperience: "5 Years" },
  { name: "Spanish Bilingual Support", category: "Communication", progress: 85, yearsOfExperience: "3 Years" },
  // Marketing
  { name: "Social Post Copywriting", category: "Marketing", progress: 88, yearsOfExperience: "4 Years" },
  { name: "Canva Pro Assets Design", category: "Marketing", progress: 90, yearsOfExperience: "5 Years" },
  { name: "Newsletter Campaign Sending", category: "Marketing", progress: 85, yearsOfExperience: "3 Years" },
  // CRM Tools
  { name: "HubSpot", category: "CRM Tools", progress: 92, yearsOfExperience: "4 Years" },
  { name: "ActiveCampaign", category: "CRM Tools", progress: 87, yearsOfExperience: "3 Years" },
  { name: "Salesforce Admin", category: "CRM Tools", progress: 78, yearsOfExperience: "2 Years" },
  // Project Management
  { name: "Notion Architecture", category: "Project Management", progress: 96, yearsOfExperience: "5 Years" },
  { name: "Asana & ClickUp Flow", category: "Project Management", progress: 94, yearsOfExperience: "5 Years" },
  { name: "Slack & Loom Workspace", category: "Project Management", progress: 96, yearsOfExperience: "6 Years" },
  // Technical Skills
  { name: "Zapier & Make Automations", category: "Technical Skills", progress: 90, yearsOfExperience: "3 Years" },
  { name: "Google Workspace & Office 365", category: "Technical Skills", progress: 98, yearsOfExperience: "7+ Years" },
  { name: "AI Prompt Optimization", category: "Technical Skills", progress: 85, yearsOfExperience: "2 Years" }
];

export const fallbackClients: ClientData[] = [
  {
    id: "c1",
    name: "Nexa E-commerce Labs",
    industry: "Direct-to-Consumer retail",
    servicesProvided: "Inbound support desk management & inventory auditing",
    testimonial: "Sarah completely revolutionized our customer ticket reply system. First-contact resolution rates went up by 40% and our customer satisfaction score is sitting at 98.6%. She handles everything autonomously.",
    logo: "N"
  },
  {
    id: "c2",
    name: "Greenwood Brokerage Office",
    industry: "Luxury Residential Real Estate",
    servicesProvided: "Client contract coordination & calendar blocking",
    testimonial: "I used to spend 3 hours a day sorting emails and adjusting double-bookings. With Sarah driving my schedule, I focus purely on closings and listings. She paid for herself in her first two weeks.",
    logo: "G"
  },
  {
    id: "c3",
    name: "Apex Consulting LLC",
    industry: "Tech Executive Advisory",
    servicesProvided: "Podcast scheduling, slide deck audits, agenda management",
    testimonial: "An absolute asset. Sarah attends executive alignments, takes high-fidelity minutes, updates our project backlogs in ClickUp, and keeps the entire consultant group running smoothly.",
    logo: "A"
  }
];

export const fallbackPortfolio: ProjectData[] = [
  {
    id: "p1",
    title: "SaaS Inbox Zero Protocol",
    description: "Engineered a custom labels, filters, and priority triggers system for a hyper-growth SaaS founder receiving 300+ emails per day. Transitioned the founder's email interactions from 4 hours a day down to 15 minutes.",
    toolsUsed: ["Gmail Rules", "Notion Workspace", "Superhuman Support", "Zapier Integrations"],
    resultsAchieved: "Reduced daily inbox review time from 240 mins to 15 mins. Zero missed client opportunities over 12 months.",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p2",
    title: "Agency Notion Architecture Reboot",
    description: "Designed and implemented an all-in-one Notion workflow engine for a 12-person digital branding agency. Integrated client onboarding pipelines, visual project timelines, SOP libraries, and billing trackers.",
    toolsUsed: ["Notion Custom DB", "Miro mapping", "Slack integration", "Loom walkthroughs"],
    resultsAchieved: "Unified 4 disconnected tools into a single platform. Trimmed administrative meeting loops by 35%.",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "p3",
    title: "Digital Summit Speaker Coordination",
    description: "Managed logistics, calendars, and digital collateral for 45 global guest speakers at the virtual 'Remote Horizons 2025' summit. Audited bio summaries, tech setups, slide links, and live schedule streams.",
    toolsUsed: ["Zoom Webinar", "Google Calendars", "Airtable Systems", "ActiveCampaign CRM"],
    resultsAchieved: "Successfully executed a 3-day summit with zero timezone scheduling conflicts. 100% speaker satisfaction rate.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
  }
];

export const fallbackTestimonials: TestimonialData[] = [
  {
    id: "t1",
    clientName: "David Vance",
    position: "Founder & CEO, Nexa E-commerce",
    feedback: "Sarah is not just a VA; she's an indispensable systems operator. She spots operational friction and designs elegant administrative frameworks before I even notice there's a problem. Her resourcefulness is unparalleled.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "t2",
    clientName: "Eleanor Vance-Greyson",
    position: "Principal, Greenwood Advisory Group",
    feedback: "Bringing Sarah into our real estate brokerage was the single biggest bottleneck-breaker of the fiscal year. Her responsiveness, meticulous attention to client files, and proactive CRM hygiene are exceptional.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "t3",
    clientName: "Marcus Sterling",
    position: "Managing Partner, Apex Tech Partners",
    feedback: "I've worked with virtual assistance firms before, but Sarah's individual standard of communication and operational intelligence is in a class of its own. She acts with the precision and professionalism of a high-end chief-of-staff.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  }
];

export const fallbackBlogs: BlogData[] = [
  {
    id: "b1",
    title: "The Inbox Zero Blueprint for Founders",
    excerpt: "Learn the exact system of automated triggers, triage labeling, and time-block scheduling I use to save active CEOs 15 hours a week in email management.",
    publishDate: "May 24, 2026",
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=400",
    readMoreUrl: "https://medium.com"
  },
  {
    id: "b2",
    title: "How to Build an Indestructible Notion Hub",
    excerpt: "Stop cluttering your workspace. Here is a step-by-step breakdown of database relations and page structures that can unify your team SOPs and client tasks.",
    publishDate: "June 02, 2026",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400",
    readMoreUrl: "https://medium.com"
  },
  {
    id: "b3",
    title: "5 Tasks You Must Delegate in 2026",
    excerpt: "Unpacking the high-friction, low-leverage activities that are draining your creative momentum. Reclaim your focus by designing delegation pipelines today.",
    publishDate: "June 12, 2026",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    readMoreUrl: "https://medium.com"
  }
];

export const fallbackResume: ResumeItem[] = [
  // Work Experience
  {
    id: "r1",
    type: "experience",
    title: "Elite Virtual Assistant & Operations Partner",
    organization: "Independent Freelance Brokerage",
    dateRange: "2021 - Present",
    description: "Manage complex administrative processes, high-triage executive calendaring, CRM structures, and Slack integration for up to 6 high-budget client accounts simultaneously. Handle delicate client billing workflows and system-level task management."
  },
  {
    id: "r2",
    type: "experience",
    title: "Senior Administrative Assistant",
    organization: "Prestige Venture Advisory",
    dateRange: "2019 - 2021",
    description: "Coordinated travel logistics, prepared quarterly board presentation packets, ran office inbox flows, and managed an 11-person administrative assistant roster."
  },
  // Education
  {
    id: "r3",
    type: "education",
    title: "B.S. in Business Administration & Management",
    organization: "University of Southern California",
    dateRange: "2015 - 2018",
    description: "Specialized in Operational Systems, Digital Marketing Frameworks, and Strategic Communication."
  },
  // Certifications
  {
    id: "r4",
    type: "certification",
    title: "Certified Executive Assistant (CEA)",
    organization: "Association of Executive Assistants",
    dateRange: "Earned 2022"
  },
  {
    id: "r5",
    type: "certification",
    title: "HubSpot Certified CRM Admin",
    organization: "HubSpot Academy",
    dateRange: "Earned 2023"
  }
];

export const fallbackContact: ContactData = {
  email: "sarah.jenkins.va@gmail.com",
  phone: "+1 (555) 324-9018",
  whatsApp: "+15553249018",
  whatsAppUrl: "https://wa.me/15553249018",
  linkedIn: "https://linkedin.com/in/sarah-jenkins-va-demo",
  facebook: "https://facebook.com/sarah-jenkins-va-demo"
};
