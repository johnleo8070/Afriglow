export type HairstyleCategory =
  | 'Knotless Braids'
  | 'Box Braids'
  | 'Cornrows & Feed-In Styles'
  | 'Boho & Hybrid Braids'
  | 'Fulani & Tribal Braids'
  | 'Twists'
  | 'Locs & Crochet'
  | 'Micro Braids & Extended Lengths'
  | 'Kids Styles'
  | 'Custom & Specialty Styles'
  | string;

export interface Hairstyle {
  id: string;
  slug: string;
  name: string;
  category: HairstyleCategory;
  shortDescription: string;
  description: string;
  priceFrom: number; // in AUD
  depositAmount: number; // in AUD (booking fee)
  durationHours: number;
  durationLabel: string;
  hairIncluded: boolean;
  hairIncludedNote: string;
  lengthOptions: string[];
  maintenanceLevel: 'Low' | 'Medium' | 'High';
  recommendedWearTime: string;
  images: string[];
  featured: boolean;
  popular: boolean;
  rating: number;
  reviewCount: number;
  whatsIncluded: string[];
  prepInstructions: string[];
}

export const HAIRSTYLES_DATA: Hairstyle[] = [
  {
    id: 'hs-1',
    slug: 'medium-knotless-braids',
    name: 'Medium Knotless Braids',
    category: 'Knotless Braids',
    shortDescription: 'Lightweight, versatile and effortlessly beautiful with a seamless, tension-free scalp finish.',
    description: 'Medium Knotless Braids are our signature client-favourite style. Created using the feed-in technique, they start flat at your scalp with zero tension and minimal weight, ensuring your natural hair is protected while giving you maximum styling flexibility for buns, ponytails, or flowing locks.',
    priceFrom: 220,
    depositAmount: 50,
    durationHours: 4.5,
    durationLabel: 'Approx. 4 – 5 hours',
    hairIncluded: false,
    hairIncludedNote: 'Clients can bring 3-4 packs of pre-stretched X-Pression braiding hair (or purchase in-salon).',
    lengthOptions: ['Mid-Back (24")', 'Waist Length (30")', 'Butt Length (36")', 'Extra Long (42")'],
    maintenanceLevel: 'Low',
    recommendedWearTime: '6 – 8 Weeks',
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: true,
    rating: 5.0,
    reviewCount: 48,
    whatsIncluded: [
      'Precision scalp sectioning & parting',
      'Tension-free feed-in braiding technique',
      'Scalp hydration & organic edge control application',
      'Hot water setting with silky soft ends treatment',
      'Mousse setting & finishing oil sheen'
    ],
    prepInstructions: [
      'Arrive with your natural hair freshly washed, clean, and completely dry.',
      'Hair must be thoroughly detangled and blown out straight from roots to ends.',
      'Do not apply heavy oils or butters immediately before your appointment; we provide proper salon-grade scalp hydration.'
    ]
  },
  {
    id: 'hs-2',
    slug: 'bohemian-goddess-knotless',
    name: 'Bohemian Goddess Knotless Braids',
    category: 'Knotless Braids',
    shortDescription: 'Romantic knotless braids adorned with luscious flowing curls and wispy texture.',
    description: 'Elevate your braiding look with Bohemian Goddess Knotless Braids. Combining smooth, seamless knotless base braids with gorgeous synthetic or human hair curls incorporated throughout, this style radiates vacation vibes, glamour, and effortless chic.',
    priceFrom: 280,
    depositAmount: 60,
    durationHours: 5.5,
    durationLabel: 'Approx. 5 – 6 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 4 packs pre-stretched braiding hair + 2 packs of deep wave / water wave braiding curls.',
    lengthOptions: ['Mid-Back (24")', 'Waist Length (30")', 'Butt Length (36")'],
    maintenanceLevel: 'Medium',
    recommendedWearTime: '6 – 8 Weeks',
    images: [
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: true,
    rating: 4.9,
    reviewCount: 36,
    whatsIncluded: [
      'Custom curl placement along the length of braids',
      'Tensionless knotless base construction',
      'Anti-frizz braid mousse and curl defining treatment',
      'Hot water seal and edge finishing styling'
    ],
    prepInstructions: [
      'Arrive with clean, detangled, and stretched hair.',
      'Bring recommended curl extensions (human hair curl bundles recommended for longest lasting results).'
    ]
  },
  {
    id: 'hs-3',
    slug: 'classic-box-braids',
    name: 'Classic Square Box Braids',
    category: 'Box Braids',
    shortDescription: 'Timeless, neat square-parted box braids with enduring durability and versatility.',
    description: 'The quintessential protective hairstyle. Our classic box braids feature sharp, clean square parting with full density and a neat finish. Built to protect your natural locks during busy workweeks or workouts while looking polished 24/7.',
    priceFrom: 190,
    depositAmount: 50,
    durationHours: 4,
    durationLabel: 'Approx. 4 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 3-4 packs of pre-stretched braiding hair.',
    lengthOptions: ['Shoulder Length (16")', 'Mid-Back (24")', 'Waist Length (30")'],
    maintenanceLevel: 'Low',
    recommendedWearTime: '8 – 10 Weeks',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: false,
    rating: 4.8,
    reviewCount: 29,
    whatsIncluded: [
      'Crisp square grid parting',
      'Full protective braiding down to ends',
      'Boiling water dipped ends for clean taper',
      'Scalp oil soothing & baby hair styling'
    ],
    prepInstructions: [
      'Wash and deep condition hair 24-48 hours before.',
      'Ensure hair is detangled and free of heavy grease.'
    ]
  },
  {
    id: 'hs-4',
    slug: 'straight-back-stitch-cornrows',
    name: 'Stitch Cornrows (Straight Backs)',
    category: 'Cornrows',
    shortDescription: 'Razor-sharp precision stitch cornrows with sleek lines and clean scalp design.',
    description: 'Precision stitch cornrows crafted with surgical parting and flawless symmetry. Whether you want 4, 6, 8, or 10 stitch braids going straight back, this style delivers an ultra-clean, modern aesthetic that turns heads wherever you go.',
    priceFrom: 120,
    depositAmount: 30,
    durationHours: 2.5,
    durationLabel: 'Approx. 2 – 3 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 2 packs of pre-stretched braiding hair (or natural hair only).',
    lengthOptions: ['Classic End Length', 'Waist Extended'],
    maintenanceLevel: 'Low',
    recommendedWearTime: '3 – 5 Weeks',
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: true,
    rating: 5.0,
    reviewCount: 42,
    whatsIncluded: [
      'Precision stitch line technique',
      'Feed-in extension tapering',
      'Anti-itch scalp soothing oil treatment',
      'Laid edge styling'
    ],
    prepInstructions: [
      'Arrive with clean, blow-dried hair for razor-sharp stitch definition.'
    ]
  },
  {
    id: 'hs-5',
    slug: 'butterfly-soft-locs',
    name: 'Butterfly Soft Locs',
    category: 'Protective Styles',
    shortDescription: 'Textured, bohemian distressed locs with soft loops and effortless fullness.',
    description: 'Butterfly Locs give you that sought-after textured, carefree bohemian look. Hand-wrapped with distressed loops along the shaft, they are lightweight, flexible, and have incredible character from day one without any heavy tension on your follicles.',
    priceFrom: 240,
    depositAmount: 50,
    durationHours: 4.5,
    durationLabel: 'Approx. 4 – 5 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring crochet base locs + water wave wrapping hair.',
    lengthOptions: ['Shoulder Bob (14")', 'Mid-Back (20")', 'Long (26")'],
    maintenanceLevel: 'Low',
    recommendedWearTime: '6 – 8 Weeks',
    images: [
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: true,
    rating: 4.9,
    reviewCount: 31,
    whatsIncluded: [
      'Painless base braiding / individual crochet anchor',
      'Artisanal hand-distressed butterfly looping',
      'Loc shine spray & mousse treatment'
    ],
    prepInstructions: [
      'Cleanse scalp thoroughly. Ensure hair is detangled and stretched.'
    ]
  },
  {
    id: 'hs-6',
    slug: 'senegalese-passion-twists',
    name: 'Passion Twists (Water Wave)',
    category: 'Protective Styles',
    shortDescription: 'Bouncy, curly two-strand twists that are silky, full, and easy to maintain.',
    description: 'Passion Twists combine the elegance of two-strand twists with the whimsical bounce of water wave curls. Super lightweight, bouncy, and protective, they are perfect for everyday glam, gym workouts, or weekend outings.',
    priceFrom: 210,
    depositAmount: 50,
    durationHours: 3.5,
    durationLabel: 'Approx. 3.5 – 4 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 4-5 packs of Water Wave / Passion Twist synthetic or human blend hair.',
    lengthOptions: ['18 Inches', '22 Inches', '28 Inches'],
    maintenanceLevel: 'Medium',
    recommendedWearTime: '6 – 8 Weeks',
    images: [
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: false,
    rating: 4.9,
    reviewCount: 22,
    whatsIncluded: [
      'Square or triangle parting',
      'Two-strand curly twist installation',
      'Scalp moisturising treatment'
    ],
    prepInstructions: [
      'Arrive washed, dried, and blow-dried without heavy oils.'
    ]
  },
  {
    id: 'hs-7',
    slug: 'tribal-fulani-braids',
    name: 'Fulani Tribal Braids',
    category: 'Cornrows',
    shortDescription: 'Stunning cultural cornrow patterns with box braids at the back and decorative accents.',
    description: 'Inspired by the beauty traditions of the Fulani people, this style pairs intricate cornrows parted down the center or sides with flowing knotless or box braids in the back. Option to add gold cuffs, beads, or cowrie shells for a regal aesthetic.',
    priceFrom: 250,
    depositAmount: 50,
    durationHours: 4.5,
    durationLabel: 'Approx. 4.5 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 3-4 packs of pre-stretched braiding hair + decorative cuffs/beads if desired.',
    lengthOptions: ['Mid-Back', 'Waist Length'],
    maintenanceLevel: 'Medium',
    recommendedWearTime: '5 – 7 Weeks',
    images: [
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: false,
    popular: true,
    rating: 5.0,
    reviewCount: 27,
    whatsIncluded: [
      'Geometric tribal cornrow pattern',
      'Back knotless/box braids',
      'Accessory placement (gold beads/cuffs)',
      'Finishing shine & edge design'
    ],
    prepInstructions: [
      'Arrive washed and blown dry. Bring any custom accessories you would like incorporated.'
    ]
  },
  {
    id: 'hs-8',
    slug: 'kids-gentle-protective-braids',
    name: 'Kids Gentle Protective Braids & Beads',
    category: 'Kids Styles',
    shortDescription: 'Tension-free, comfortable, gentle braiding designed specifically for young scalps.',
    description: 'We love styling our youngest clients! Our gentle kids braiding appointments are conducted with maximum patience, delicate tension control, and fun bead/accessory styling. Keeps children’s hair neat, protected, and tangle-free for school and play.',
    priceFrom: 110,
    depositAmount: 30,
    durationHours: 2,
    durationLabel: 'Approx. 2 – 2.5 hours',
    hairIncluded: false,
    hairIncludedNote: 'Bring 1-2 packs kid-friendly braiding hair and colourful beads of choice.',
    lengthOptions: ['Shoulder Length', 'Bob with Beads'],
    maintenanceLevel: 'Low',
    recommendedWearTime: '3 – 4 Weeks',
    images: [
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1000&q=80'
    ],
    featured: true,
    popular: false,
    rating: 5.0,
    reviewCount: 19,
    whatsIncluded: [
      'Gentle detangling with child-safe leave-in conditioner',
      'Tension-free soft cornrow or box braid design',
      'Bead threading & secure elastic bands',
      'Scalp spray'
    ],
    prepInstructions: [
      'Please ensure child’s hair is washed, conditioned, and detangled prior to arriving.'
    ]
  }
];

export const SALON_INFO = {
  name: 'Afriglow',
  tagline: 'Expert hair braiding with care, creativity and style.',
  address: '7–9 Corrimal Street, Wollongong NSW 2500',
  shortAddress: 'Wollongong NSW 2500',
  phone: '0451 211 170',
  phoneClean: '0451211170',
  email: 'rosebavong@gmail.com',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
    { day: 'Saturday', time: '8:30 AM – 6:30 PM' },
    { day: 'Sunday', time: '10:00 AM – 4:00 PM (By Appointment)' }
  ],
  googleMapsUrl: 'https://maps.google.com/?q=7-9+Corrimal+Street,+Wollongong+NSW+2500',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.2818985141097!2d150.90226467651036!3d-34.424169548483484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b131979b940989f%3A0xb304d2325ccecf9b!2s7-9%20Corrimal%20St%2C%20Wollongong%20NSW%202500%2C%20Australia!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau'
};

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM'
];

export const HAIRSTYLE_CATEGORIES = [
  'Knotless Braids',
  'Box Braids',
  'Cornrows & Feed-In Styles',
  'Boho & Hybrid Braids',
  'Fulani & Tribal Braids',
  'Twists',
  'Locs & Crochet',
  'Micro Braids & Extended Lengths',
  'Kids Styles',
  'Custom & Specialty Styles',
] as const;

export const CATEGORIES_LIST = [
  'All Styles',
  'Knotless Braids',
  'Box Braids',
  'Cornrows & Feed-In Styles',
  'Boho & Hybrid Braids',
  'Fulani & Tribal Braids',
  'Twists',
  'Locs & Crochet',
  'Micro Braids & Extended Lengths',
  'Kids Styles',
  'Custom & Specialty Styles',
];

