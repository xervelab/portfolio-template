import { Artwork, Exhibition } from './types';

export const ARTIST_INFO = {
  name: "Elena Rostova",
  title: "Contemporary Fine Artist",
  subtitle: "Abstract oil works, delicate watercolors, and expressionist acrylic portraits designed to evoke the silent landscapes of the human consciousness.",
  bio: "Born in Saint Petersburg and currently active in New York, Elena Rostova's creative realm occupies the intersection of nature's fluid geometry and internal memories. Her tactile oil works explore depth and movement through heavily textured paint layers, while her minimalist watercolor landscapes leverage silence and negative space. Moving gracefully between standard mediums, Elena uses light and tension to anchor visceral emotions.",
  statement: "I paint not what I see, but what is left behind in the mind's eye after the scene fade. My brushstrokes seek the silent thresholds between physical landscape and internal memory—capturing the weight of silent moments through color and texture.",
  portraitUrl: "/src/assets/images/painter_studio_portrait_1781587178644.jpg"
};

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: "echoes-of-autumn",
    title: "Echoes of Autumn",
    description: "An immersive exploration of changing seasons. Built with dynamic, thick impasto strokes of terracotta, raw ochre, and shimmering copper leaf over deep teal. The paint catches light dynamically, shifting character depending on the viewer's angle.",
    imageUrl: "/src/assets/images/artwork_abstract_oil_1781587120929.jpg",
    year: 2026,
    medium: "Oil on canvas, gold leaf accents",
    dimensions: "120 x 120 cm",
    price: "$3,800",
    status: "available",
    category: "Abstract Oil",
    featured: true
  },
  {
    id: "solitude-in-cobalt",
    title: "Solitude in Cobalt",
    description: "A masterful composition utilizing traditional Japanese sumi-e concepts. Mist-laden, ink-rich alpine ranges surrender slowly to soft watercolor indigo washes. This piece plays with silence, invoking a serene isolation with structured yet minimal brushwork.",
    imageUrl: "/src/assets/images/artwork_watercolor_landscape_1781587138174.jpg",
    year: 2025,
    medium: "Watercolor & Sumi Ink on handcrafted rice paper",
    dimensions: "75 x 100 cm",
    price: "$2,200",
    status: "available",
    category: "Watercolor",
    featured: true
  },
  {
    id: "weight-of-whispers",
    title: "The Weight of Whispers",
    description: "A large-scale contemporary expressionist portrait. Heavy charcoal lines meet energetic acrylic strokes. Bold orange highlights balance moody teals, forming a face that appears to transition between fading into and emerging from the dark canvas.",
    imageUrl: "/src/assets/images/artwork_contemporary_portrait_1781587159775.jpg",
    year: 2026,
    medium: "Acrylic, charcoal, and mixed media on canvas",
    dimensions: "150 x 120 cm",
    price: "$4,500",
    status: "reserved",
    category: "Contemporary",
    featured: true
  },
  {
    id: "transient-resonance",
    title: "Transient Resonance",
    description: "A dense, rich palette-knife abstract. Deep crimson and oxidized titanium whites form intricate crusts and folds over carbon black, hinting at urban decay and geographic strata.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    medium: "Oil on panel",
    dimensions: "80 x 80 cm",
    price: "$2,100",
    status: "available",
    category: "Abstract Oil",
    featured: false
  },
  {
    id: "silent-shoreline",
    title: "Silent Shoreline",
    description: "Delicate washes of warm grey and deep ultramarine capturing the absolute stillness of early morning at the ocean's edge. A lesson in quiet restraint.",
    imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
    year: 2024,
    medium: "Watercolor on archival cotton paper",
    dimensions: "50 x 70 cm",
    price: "$1,400",
    status: "sold",
    category: "Watercolor",
    featured: false
  },
  {
    id: "shadow-introspection",
    title: "Shadow Introspection",
    description: "An introspective exploration of fractured identities, utilizing overlapping profile strokes, graphite powder, and quick splashes of safety orange.",
    imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a6211?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    medium: "Mixed media, acrylic & graphite on birch board",
    dimensions: "90 x 90 cm",
    price: "$2,800",
    status: "sold",
    category: "Contemporary",
    featured: false
  },
  {
    id: "elements-in-motion",
    title: "Elements in Motion",
    description: "Representing natural turbulence. Swirling cobalt and raw umber fight for space, interspersed with clean negative fields. A highly dramatic and modern canvas.",
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    year: 2026,
    medium: "Heavy oil on unstretched canvas",
    dimensions: "140 x 180 cm",
    price: "$5,200",
    status: "available",
    category: "Abstract Oil",
    featured: false
  },
  {
    id: "misty-peak-summit",
    title: "Summit of Clouds",
    description: "A vertical landscapes painting focusing on altitude. Soft, feathered grey pigments capture clouds draping over hidden cliffs, invoking a sense of deep sanctuary.",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
    year: 2025,
    medium: "Chinese Ink & Watercolor on paper",
    dimensions: "60 x 120 cm",
    price: "$1,900",
    status: "available",
    category: "Watercolor",
    featured: false
  }
];

export const EXHIBITIONS_DATA: Exhibition[] = [
  {
    id: "ex-1",
    title: "Silent Geography",
    venue: "Metropolitan Contemporary Gallery",
    location: "New York, NY",
    year: 2026,
    type: "Solo"
  },
  {
    id: "ex-2",
    title: "Echoes & Whispers",
    venue: "Avenue fine Art Gallery",
    location: "Boston, MA",
    year: 2025,
    type: "Solo"
  },
  {
    id: "ex-3",
    title: "Transitions of Light",
    venue: "Sovereign Arts Center",
    location: "Seattle, WA",
    year: 2025,
    type: "Group"
  },
  {
    id: "ex-4",
    title: "The Modern Canvas Biennale",
    venue: "Contemporary Museum of Fine Art",
    location: "Chicago, IL",
    year: 2024,
    type: "Group"
  }
];

export const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com/elena_rostova_art", handle: "@elena_rostova_art" },
  { name: "Behance", url: "https://behance.net/elenarostova", handle: "elena_rostova" },
  { name: "ArtStation", url: "https://artstation.com/elenarostova", handle: "erostova_paintings" },
  { name: "Pinterest", url: "https://pinterest.com/elena_art", handle: "elena_rostova_fineart" }
];
