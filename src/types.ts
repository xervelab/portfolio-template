export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  rate: number;
  priceInfo: string;
  features: string[];
  iconName: string; // Used to select a Lucide icon dynamically
  colorAccent: string; // Tailwind color name for styling highlights
  badgeText?: string;
}

export interface Skill {
  name: string;
  category: "Design & Content" | "Systems & Tech" | "Admin & Ops" | "Strategy & Growth";
  description: string;
  level: number; // percentage confidence (e.g. 95)
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  outcome: string;
  imageUrl: string;
  toolsUsed: string[];
  statsHighlight?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number; // 1-5
  avatarUrl: string;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai" | "system";
  timestamp: Date;
}

export interface Booking {
  id: string;
  ref: string;
  name: string;
  email: string;
  serviceId: string;
  serviceName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 10:45 AM"
  notes?: string;
  status: "pending" | "confirmed";
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
