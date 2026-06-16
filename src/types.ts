export interface Artwork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: number;
  medium: string;
  dimensions: string;
  price?: string;
  status: 'available' | 'sold' | 'reserved';
  category: 'Abstract Oil' | 'Watercolor' | 'Contemporary';
  featured: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  year: number;
  type: 'Solo' | 'Group';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType: 'purchase' | 'commission' | 'exhibition' | 'general';
  message: string;
  artworkInterest?: string;
}
