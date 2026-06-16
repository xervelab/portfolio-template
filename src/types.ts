export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export type ArtMedium = "Oil on Canvas" | "Watercolor" | "Abstract Acrylic" | "Mixed Media" | "Charcoal Sketch";

export type ArtCategory = "Landscape" | "Portrait" | "Abstract" | "Floral" | "Minimalist";

export interface Artwork {
  id: string;
  title: string;
  medium: ArtMedium;
  category: ArtCategory;
  year: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  likes: number;
  hasLiked?: boolean;
  comments: Comment[];
  price?: number; // Representing if it's available or sold (undefined or 0 means Sold/NFS)
  isSold: boolean;
  tags: string[];
  views: number;
  featured?: boolean;
}

export interface Exhibition {
  id: string;
  title: string;
  gallery: string;
  location: string;
  dates: string;
  status: "Upcoming" | "Live Now" | "Past";
  link?: string;
}

export interface JournalPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  likes: number;
  readTime: string;
}

export interface ArtistProfile {
  name: string;
  username: string;
  avatarUrl: string;
  tagline: string;
  bio: string;
  categories: string[];
  followersCount: number;
  followingCount: number;
  location: string;
  availableForCommissions: boolean;
  website: string;
}
