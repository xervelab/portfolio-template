/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeroData {
  name: string;
  jobTitle: string;
  intro: string;
  imageUrl: string;
  resumeUrl: string;
  skills: string[];
}

export interface AboutData {
  summary: string;
  yearsOfExperience: number;
  industriesServed: string[];
  projectsCompleted: number;
  happyClients: number;
  responseRate: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  startingPrice?: string;
  icon?: string;
}

export interface SkillData {
  name: string;
  category: string;
  progress: number; // 0-100
  yearsOfExperience: string;
}

export interface ClientData {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  servicesProvided: string;
  testimonial: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  toolsUsed: string[];
  resultsAchieved: string;
  imageUrl: string;
}

export interface TestimonialData {
  id: string;
  clientName: string;
  position: string;
  feedback: string;
  imageUrl?: string;
}

export interface BlogData {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  imageUrl: string;
  readMoreUrl: string;
}

export interface ResumeItem {
  id: string;
  type: 'experience' | 'education' | 'certification';
  title: string;
  organization: string;
  dateRange: string;
  description?: string;
}

export interface ContactData {
  email: string;
  phone: string;
  whatsApp: string;
  whatsAppUrl: string;
  linkedIn: string;
  facebook?: string;
}
