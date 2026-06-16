export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  category: 'Oil' | 'Watercolor' | 'Mixed Media';
  status: 'Inquire' | 'Sold' | 'Private Collection';
  price?: string;
  featured?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  dates: string;
  status: 'Current' | 'Upcoming' | 'Past';
  description: string;
}

export interface Inquiry {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  artworkId?: string; // Optional context, if querying about a specific artwork
  messageType: 'Acquisition' | 'Commission' | 'Studio Visit' | 'General';
  message: string;
  date: string;
}

export type LightingMode = 'gallery' | 'daylight' | 'golden' | 'spotlight';
