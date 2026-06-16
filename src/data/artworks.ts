import { Artwork, Exhibition } from '../types';

// Importing our high-quality generated images
import whisperImg from '../assets/images/oil_painting_whisper_1781582066153.jpg';
import solitudeImg from '../assets/images/oil_painting_solitude_1781582086392.jpg';
import serenadeImg from '../assets/images/watercolor_serenade_1781582100881.jpg';
import tempestImg from '../assets/images/mixed_media_tempest_1781582116109.jpg';
import studioImg from '../assets/images/artist_studio_1781582131664.jpg';

export const STUDIO_IMAGE = studioImg;

export const ARTIST_BIO = {
  name: "Clara Moreau",
  role: "Abstract Impressionist & Spatial Painter",
  location: "Based in Lyon, France & New York, USA",
  philosophies: [
    {
      title: "Tactility of Atmosphere",
      text: "I believe that light is not merely something to capture visually, but a thick, textural medium that can be layered on canvas using plasters, charcoal, and dense oils."
    },
    {
      title: "Raw Imperfection",
      text: "Leaving trace margins, unfinished charcoal lines, and dense canvas splatters exposes the performance of painting. The canvas is not a window, but a physical arena where time and touch collude."
    }
  ],
  narrative: "Clara Moreau transforms volatile landscapes into tactile abstract sanctuaries. Blending classical Parisian paint-layering techniques with raw industrial plaster scraping, her works evoke organic movement, twilight fog, and geological remnants. Moreau’s paintings possess an arresting presence, oscillating gently between fragile transparency and heavy, impasto earthliness."
};

export const ARTWORKS: Artwork[] = [
  {
    id: "art-1",
    title: "Vesper Whisper",
    year: 2026,
    medium: "Textured Oil & 24k Gold Leaf on Belgian Linen",
    dimensions: "160 x 140 cm",
    description: "An exploration of early morning quietude. This piece frames heavy, dark navy strokes against fragile cream underlays, interlaced with oxidized gold-leaf seams that shimmer selectively under glancing spotlight.",
    imageUrl: whisperImg,
    category: "Oil",
    status: "Inquire",
    price: "€8,400",
    featured: true
  },
  {
    id: "art-2",
    title: "Twilight Solitude",
    year: 2026,
    medium: "Heavy Impasto Oil on Canvas",
    dimensions: "180 x 120 cm",
    description: "Inspired by the salt marshes of Southern France during late November. Created entirely with a heavy steel palette knife, giving the sky line deep geological ridges that bounce natural room light.",
    imageUrl: solitudeImg,
    category: "Oil",
    status: "Private Collection",
    featured: true
  },
  {
    id: "art-3",
    title: "Sienna Serenade",
    year: 2025,
    medium: "Organic Watercolor & Charcoal on Raw Deckle-Edge Paper",
    dimensions: "110 x 85 cm",
    description: "Minimalist botanical forms washing together. Utilizing hand-ground terracotta and amber pigments. The raw hand-torn edges are floated beautifully on a museum-grade archival backing field.",
    imageUrl: serenadeImg,
    category: "Watercolor",
    status: "Inquire",
    price: "€3,200",
    featured: true
  },
  {
    id: "art-4",
    title: "Inner Tempest",
    year: 2025,
    medium: "Plaster Overlay, Charcoal & Indigo Acrylic on Raw Canvas",
    dimensions: "200 x 160 cm",
    description: "A monumental expressionist piece capturing emotional resonance. Incorporates thick marble powder plaster that was scored and scraped while drying, capturing deep, rhythmic shadows inside the pigment channels.",
    imageUrl: tempestImg,
    category: "Mixed Media",
    status: "Inquire",
    price: "€11,200",
    featured: true
  },
  {
    id: "art-5",
    title: "Luminous Rust No. 7",
    year: 2025,
    medium: "Mixed Media & Iron Oxidation on Panel",
    dimensions: "90 x 90 cm",
    description: "A study of natural slow-motion chemistry. Thick iron filings iron-passivated and intentionally oxidized with salt washes over a structured dark plaster ground, creating organic velvety ginger hues.",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1000",
    category: "Mixed Media",
    status: "Sold",
    featured: false
  },
  {
    id: "art-6",
    title: "Echo of the Ridge",
    year: 2026,
    medium: "Charcoal, Gesso & Carbon Infusions",
    dimensions: "120 x 100 cm",
    description: "A highly restrained black-and-white work illustrating tectonic lines. High contrast charcoal is dynamic and rough, framed with broad flat washes of dense chalk-gesso which lock in the volatile charcoal dust.",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80&w=1000",
    category: "Mixed Media",
    status: "Inquire",
    price: "€4,800",
    featured: false
  },
  {
    id: "art-7",
    title: "Silt & Saffron Study",
    year: 2025,
    medium: "Watercolor on Heavy Arches Paper",
    dimensions: "70 x 50 cm",
    description: "A delicate watercolor wash featuring natural mineral pigments. It captures the warm sediment flows of mountain creeks filtering down, utilizing pure white paper space as a breathing medium.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1000",
    category: "Watercolor",
    status: "Sold",
    featured: false
  },
  {
    id: "art-8",
    title: "Nocturne Canopy",
    year: 2026,
    medium: "Layered Glaze Oil on Board",
    dimensions: "100 x 100 cm",
    description: "Built up in over twenty translucent glazes of Prussian blue and bone-black. Under direct light, deep atmospheric textures and hidden under-drawings reveal themselves silently to the patient viewer.",
    imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=1000",
    category: "Oil",
    status: "Inquire",
    price: "€6,100",
    featured: false
  }
];

export const EXHIBITIONS: Exhibition[] = [
  {
    id: "ex-1",
    title: "The Density of Silence",
    venue: "Galerie L'Espace Contemporain",
    location: "Paris, France",
    dates: "May 10 – June 28, 2026",
    status: "Current",
    description: "A solo exhibition showcasing Clara Moreau's latest oil works exploring heavy textures, gold-seam inclusions, and early twilight transitions."
  },
  {
    id: "ex-2",
    title: "Organic Scoria",
    venue: "The Broadhurst Gallery",
    location: "New York, NY",
    dates: "September 14 – October 30, 2026",
    status: "Upcoming",
    description: "An exhibition focusing on Clara's large-format mixed-media plaster overlays and volcanic charcoal washes."
  },
  {
    id: "ex-3",
    title: "Grounded Flows: Joint Retrospective",
    venue: "Tokyo Art Institute",
    location: "Tokyo, Japan",
    dates: "Jan 15 – Feb 28, 2026",
    status: "Past",
    description: "A dynamic comparative retrospective focusing on European earth pigment watercolor methods alongside traditional Japanese stone grinding."
  }
];
