import { ArtistProfile, Artwork, Exhibition, JournalPost } from "./types";

export const artistProfile: ArtistProfile = {
  name: "Elena Rostova",
  username: "elena.rostova.studio",
  avatarUrl: "/src/assets/images/artist_profile_1781577268845.jpg",
  tagline: "Contemporary Impressionist & Neo-Expressionist Painter",
  bio: "🎨 Exploring the boundary between sensory reality and mental expressionism. Capturing fleeting light, intense human emotion, and fluid ocean cadences. Represented by Galerie de l'Élysée & Nova Contemporary.\n📍 Based in Paris, France.\n✉️ Open for selective commissions.",
  categories: ["Impressionism", "Expressionism", "Abstract Art", "Watercolor"],
  followersCount: 14820,
  followingCount: 382,
  location: "Paris, France",
  availableForCommissions: true,
  website: "www.elenarostova.studio"
};

export const initialArtworks: Artwork[] = [
  {
    id: "art-1",
    title: "Whispers of the Gilded Forest",
    medium: "Oil on Canvas",
    category: "Landscape",
    year: "2026",
    dimensions: "120 × 120 cm",
    description: "An immersive, contemporary impressionist landscape of an ancient woodland during mid-autumn. Thick, deliberate palette knife strokes construct a canopy of gold, copper, and teal leaves. The filtering golden light aims to create an enveloping feeling of warmth and quiet reflection, focusing heavily on tactile impasto texture.",
    imageUrl: "/src/assets/images/artwork_woodlands_1781577205679.jpg",
    likes: 1240,
    hasLiked: false,
    comments: [
      {
        id: "c1-1",
        username: "clara_gallery",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
        text: "The surface texture is absolutely incredible! The way light filters through is pure magic. ✨",
        timestamp: "2 hours ago"
      },
      {
        id: "c1-2",
        username: "art_collector_99",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        text: "Is this piece currently held in exhibition or available for private collection acquisition?",
        timestamp: "5 hours ago"
      }
    ],
    price: 4800,
    isSold: false,
    tags: ["Impressionism", "Forest", "OilPainting", "Impasto", "Autumn"],
    views: 4520,
    featured: true
  },
  {
    id: "art-2",
    title: "The Mind's Labyrinth",
    medium: "Oil on Canvas",
    category: "Portrait",
    year: "2026",
    dimensions: "90 × 110 cm",
    description: "A rich neo-expressionist exploration of human contemplation. Expressive, dramatic strokes of bold indigo, deep maroon, and warm ochre shape the silhouette of a thoughtful figure. Designed to capture complex internal emotion rather than structural anatomy, painted on custom-primed coarse canvas.",
    imageUrl: "/src/assets/images/artwork_portrait_1781577221411.jpg",
    likes: 985,
    hasLiked: false,
    comments: [
      {
        id: "c2-1",
        username: "marcus_neo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
        text: "Reminds me of a modern-day Egon Schiele but with a highly sophisticated contemporary palette.",
        timestamp: "1 day ago"
      }
    ],
    price: 3900,
    isSold: false,
    tags: ["NeoExpressionism", "Portrait", "Indigo", "FineArt", "Emotion"],
    views: 2980,
    featured: true
  },
  {
    id: "art-3",
    title: "Chords of Azure Dust",
    medium: "Abstract Acrylic",
    category: "Abstract",
    year: "2025",
    dimensions: "150 × 100 cm",
    description: "An expansively calm abstract landscape conveying the fluid meeting of oceanic waves and seaside mist. This piece utilizes gentle gradient flows of high-grade ultramarine pigment contrasted with embedded flakes of 24k gold leaf. The composition balances vast negative spaces with highly intense metallic points.",
    imageUrl: "/src/assets/images/artwork_ocean_1781577235627.jpg",
    likes: 1532,
    hasLiked: false,
    comments: [
      {
        id: "c3-1",
        username: "minimal_interior",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
        text: "The gold leaf accents shimmering against that raw ultramarine is breathtaking. Perfect statement piece.",
        timestamp: "3 days ago"
      }
    ],
    price: 5200,
    isSold: true,
    tags: ["AbstractArt", "Ocean", "GoldLeaf", "Minimalist", "Calm"],
    views: 6100,
    featured: true
  },
  {
    id: "art-4",
    title: "Rebirth of Poppies",
    medium: "Watercolor",
    category: "Floral",
    year: "2026",
    dimensions: "56 × 76 cm",
    description: "Created using delicate watercolor washes on heavy 640g rough Arches cotton paper. This minimalist illustration outlines wild grassland and white translucent poppies. The soft pigment bleed highlights natural dispersion, capturing the fragile yet resilient essence of spring flora.",
    imageUrl: "/src/assets/images/artwork_floral_1781577250158.jpg",
    likes: 742,
    hasLiked: false,
    comments: [],
    price: 1800,
    isSold: false,
    tags: ["Watercolor", "Poppies", "Floral", "Minimalist", "PaperArt"],
    views: 1820,
    featured: false
  },
  {
    id: "art-5",
    title: "Amaryllis Nocturne",
    medium: "Mixed Media",
    category: "Floral",
    year: "2025",
    dimensions: "80 × 100 cm",
    description: "A striking contemporary representation of botanical form contrasting with dark negative space. Fluid glazes of oil paint are superimposed with energetic acrylic markers and charcoal sketches, depicting full-bloomed crimson lilies emerging from moody, atmospheric shadows.",
    imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    likes: 2120,
    hasLiked: false,
    comments: [
      {
        id: "c5-1",
        username: "parisian_design",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
        text: "A hauntingly beautiful floral scene. The dark canvas elevates the vibrant botanical red.",
        timestamp: "1 week ago"
      }
    ],
    price: 3200,
    isSold: false,
    tags: ["Botanical", "MixedMedia", "DarkAesthetic", "Floral", "Vivid"],
    views: 8400,
    featured: true
  },
  {
    id: "art-6",
    title: "Vortices of Neon Essence",
    medium: "Abstract Acrylic",
    category: "Abstract",
    year: "2025",
    dimensions: "140 × 140 cm",
    description: "A high-octane celebration of color and motion. Layers of neon paint are splattered and scraped across the structural layers of a heavy wooden panel. The resulting chaotic harmony acts as a sensory landscape of the modern neon lit cityscapes.",
    imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
    likes: 1840,
    hasLiked: false,
    comments: [],
    price: 5900,
    isSold: true,
    tags: ["Abstract", "Acrylic", "Vibrant", "ActionPainting", "CityLife"],
    views: 5210,
    featured: false
  },
  {
    id: "art-7",
    title: "Midnight Cadence",
    medium: "Oil on Canvas",
    category: "Landscape",
    year: "2025",
    dimensions: "120 × 90 cm",
    description: "An evocative study of low-light coastal atmospheres. Using deep prussian blue, emerald, and dramatic slashes of pure titanium white, this landscape channels the raw power of night water crashing on rocky shoreline. Highly textural and atmospheric.",
    imageUrl: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=800",
    likes: 1405,
    hasLiked: false,
    comments: [
      {
        id: "c7-1",
        username: "ocean_lover_2",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150",
        text: "I can almost hear the roar of the waves! The brushwork on the surf is masterly.",
        timestamp: "2 weeks ago"
      }
    ],
    price: 4500,
    isSold: false,
    tags: ["Seascape", "NightLandscape", "OilOnCanvas", "PrussianBlue"],
    views: 3890,
    featured: false
  },
  {
    id: "art-8",
    title: "The Creative Studio's Pulse",
    medium: "Mixed Media",
    category: "Abstract",
    year: "2026",
    dimensions: "110 × 110 cm",
    description: "A meta-painting representing the chaotic yet systematic nature of an active studio workshop. It integrates raw paint spill patterns, overlapping brush cleanings, and structured charcoal geometric gridlines. A vibrant, sensory record of hours spent in creative friction.",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    likes: 1120,
    hasLiked: false,
    comments: [],
    price: 3600,
    isSold: false,
    tags: ["StudioLife", "AbstractExpressionism", "Textured", "ModernArt"],
    views: 2470,
    featured: false
  },
  {
    id: "art-9",
    title: "The Silent Muse",
    medium: "Charcoal Sketch",
    category: "Portrait",
    year: "2026",
    dimensions: "65 × 85 cm",
    description: "An understated charcoal and watercolor wash portrait highlighting structural simplicity. Hand-kneaded charcoal pigments create the soft gradient contours of the contemplative face, while a single striking wash of teal watercolor anchors the shoulder structure elegantly on premium archival rag paper.",
    imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=800",
    likes: 859,
    hasLiked: false,
    comments: [
      {
        id: "c9-1",
        username: "poetic_sketch",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150",
        text: "This balances softness and strength so masterfully. Amazing work with charcoal bleeding.",
        timestamp: "3 weeks ago"
      }
    ],
    price: 1500,
    isSold: false,
    tags: ["Charcoal", "Portrait", "Sketch", "Minimalist", "Monochrome"],
    views: 2110,
    featured: false
  }
];

export const initialExhibitions: Exhibition[] = [
  {
    id: "ex-1",
    title: "Vivid Contemplations (Solo Exhibition)",
    gallery: "Galerie de l'Élysée",
    location: "Rue du Faubourg Saint-Honoré, Paris",
    dates: "June 20 - July 15, 2026",
    status: "Upcoming"
  },
  {
    id: "ex-2",
    title: "Light & Liquid (Group Show)",
    gallery: "Nova Contemporary",
    location: "Pathum Wan, Bangkok",
    dates: "May 1 - June 10, 2026",
    status: "Live Now"
  },
  {
    id: "ex-3",
    title: "Echoes of Modernity",
    gallery: "Chelsea Art District Hall",
    location: "Manhattan, New York",
    dates: "March 5 - March 28, 2026",
    status: "Past"
  }
];

export const initialJournalPosts: JournalPost[] = [
  {
    id: "journal-1",
    title: "Behind the Impasto: Harnessing Thick Textures in Landscape Paintings",
    date: "June 10, 2026",
    excerpt: "Exploring the tactile nature of impasto and how I utilize custom wooden palette knives to shape shadows in 'Whispers of the Gilded Forest'.",
    content: "There's a specific kind of magic when oil paint is applied not just as pigment, but as a physical, dimensional form. In my latest series, I started experimenting with building thick layers using a mixture of stand-oil and heavy calcite powder to achieve high viscosity. Using thick, heavy, broad physical sweeps across the canvas lets me catch natural light of the gallery, making the painting change slightly depending on the hour of day you observe it. I focus strongly on creating dynamic shadows right on the canvas surface, mimicking actual tree barks and layers of autumn forest floor.",
    imageUrl: "/src/assets/images/artwork_woodlands_1781577205679.jpg",
    likes: 148,
    readTime: "4 min read"
  },
  {
    id: "journal-2",
    title: "Synthesizing Ultramarine: Capturing the Ocean's Transient Soul",
    date: "May 24, 2026",
    excerpt: "Reflecting on my three-week residency in Brittany, capturing dynamic wave crests using natural pigments and pure 24k gold leaf integration.",
    content: "The ocean is never the same color. It shifts continuously between deep prussian blues, turquoise, and misty grey. During my residency in Brittany, I decided to simplify my canvas structures, dedicating entire paintings to pure azure fields. I discovered that inserting delicate gold leaf directly into the high points of fluid acrylic mediums mirrors exactly the transient shimmer of sun rays on rolling waves. It feels deeply atmospheric, a silent chant of natural force and silent metal highlights.",
    imageUrl: "/src/assets/images/artwork_ocean_1781577235627.jpg",
    likes: 194,
    readTime: "6 min read"
  }
];
