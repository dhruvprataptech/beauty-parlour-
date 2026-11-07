export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  priceFrom: string;
  duration: string;
  description: string;
  image: string;
  galleryImages: string[];
  highlights: string[];
  items: ServiceItem[];
  // Coordinates in percentage on 576x1024 poster
  coords: {
    cx: number;
    cy: number;
    r: number;
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'hair-makeup',
    title: 'Hair & Makeup',
    tagline: 'Signature Styling, Velvet Glamour & HD Airbrush Artistry',
    priceFrom: '₹1,499',
    duration: '45 - 90 min',
    image: '/assets/salon/circle_hair_makeup.png',
    galleryImages: [
      '/assets/aistudio/image_c737f2cc.png',
      '/assets/aistudio/image_194de363.png',
      '/assets/aistudio/image_8a002fca.png',
      '/assets/aistudio/image_2848cb96.png',
      '/assets/aistudio/image_656b22dd.png',
    ],
    description: 'Transformative beauty tailored for everyday sophistication or special events. Our master artists use luxury foundation formulas, custom contouring, and thermal hair styling.',
    highlights: [
      'Skin prep with hyaluronic booster & peptide serum',
      'Individual featherweight mink lash application',
      'Thermal blowout & Hollywood glam waves',
      'All-day humidity-resistant setting finish'
    ],
    items: [
      { id: 'hm-1', name: 'Signature Silk Blowout & Soft Waves', price: '₹999', duration: '45 min', description: 'Volumizing wash, scalp massage, and custom brush blowout.' },
      { id: 'hm-2', name: 'Evening Velvet Glam Makeup', price: '₹2,499', duration: '60 min', description: 'Radiant full-face makeup with smoky or nude rose eye artistry.' },
      { id: 'hm-3', name: 'Red Carpet Editorial Styling & Lashes', price: '₹3,999', duration: '75 min', description: 'High-definition camera-ready makeup with bespoke lashes.' },
      { id: 'hm-4', name: 'Full Glam Combo (Hair & Makeup)', price: '₹4,999', duration: '90 min', description: 'The complete transformation package for parties and galas.' },
    ],
    coords: {
      cx: 14.2,
      cy: 61.0,
      r: 11.8,
      top: 54.4,
      left: 2.4,
      width: 23.6,
      height: 13.3,
    },
  },
  {
    id: 'facial',
    title: 'Facial',
    tagline: 'Radiant Glow, Deep Hydra-Infusion & 24K Gold Rejuvenation',
    priceFrom: '₹1,299',
    duration: '60 - 75 min',
    image: '/assets/salon/circle_facial.png',
    galleryImages: [
      '/assets/aistudio/image_e0195dc5.png',
      '/assets/aistudio/image_616814bb.png',
      '/assets/aistudio/image_eb4d80b9.png',
      '/assets/aistudio/image_a77632b3.png',
      '/assets/aistudio/image_ee0a9481.png',
      '/assets/aistudio/image_150e0b70.png',
      '/assets/aistudio/image_420e7079.png',
      '/assets/aistudio/image_5811c128.png',
    ],
    description: 'Indulgent facial therapies designed to purify pores, restore moisture barriers, and impart a glass-like luminescence using cold-pressed rose extracts.',
    highlights: [
      'Ultrasonic pore exfoliation & gentle steam extraction',
      'Cryo ice-globe lymphatic drainage massage',
      'Pure Bulgarian rose mist & peptide hydration veil',
      '24K colloidal gold collagen tightening mask'
    ],
    items: [
      { id: 'fc-1', name: 'Hydra-Dew Radiance Glow Facial', price: '₹1,299', duration: '60 min', description: 'Deep cleansing, gentle enzymatic peel, and botanical hydration.' },
      { id: 'fc-2', name: '24K Royal Gold Anti-Aging Facial', price: '₹2,999', duration: '75 min', description: 'Luxurious gold leaf therapy for firming, lifting, and luminosity.' },
      { id: 'fc-3', name: 'Korean Glass-Skin Infusion Facial', price: '₹3,499', duration: '75 min', description: 'Multi-layer essence infusion and cryo-sculpting for poreless glow.' },
      { id: 'fc-4', name: 'Diamond Microdermabrasion & Oxygen', price: '₹3,999', duration: '75 min', description: 'Exfoliation followed by pure oxygen serum delivery.' },
    ],
    coords: {
      cx: 39.9,
      cy: 63.3,
      r: 11.6,
      top: 56.7,
      left: 28.3,
      width: 23.3,
      height: 13.1,
    },
  },
  {
    id: 'hair-treatment',
    title: 'Hair Treatment',
    tagline: 'Deep Moisture Hair Spa, Keratin Polish & Scalp Therapy',
    priceFrom: '₹1,499',
    duration: '50 - 90 min',
    image: '/assets/salon/circle_hair_treatment.png',
    galleryImages: [
      '/assets/aistudio/image_8a002fca.png',
      '/assets/aistudio/image_3617284a.png',
      '/assets/salon/circle_hair_treatment.png',
      '/assets/aistudio/image_2848cb96.png',
    ],
    description: 'Intensive restorative care formulated to repair heat and color damage, stimulate scalp circulation, and seal hair cuticles with diamond-like shine.',
    highlights: [
      'Moroccan argan oil and botanical butter nourishment',
      'Hot towel aromatherapy steam infusion',
      'Stimulating acupressure scalp massage',
      'Olaplex molecular bond reinforcement'
    ],
    items: [
      { id: 'ht-1', name: 'Botanical Argan Oil Hair Spa', price: '₹1,499', duration: '50 min', description: 'Deep conditioning cream mask with hot steam and head massage.' },
      { id: 'ht-2', name: 'Olaplex No. 1 & 2 Molecular Bond Repair', price: '₹2,999', duration: '60 min', description: 'Restores broken disulfide bonds in bleached and heat-damaged hair.' },
      { id: 'ht-3', name: 'Brazilian Liquid Keratin Gloss Treatment', price: '₹5,999', duration: '90 min', description: 'Frizz-free silky straight finish lasting up to 12 weeks.' },
      { id: 'ht-4', name: 'Ayurvedic Scalp Detox & Hair Growth Therapy', price: '₹1,999', duration: '60 min', description: 'Warm herbal oils and gentle scalp exfoliation.' },
    ],
    coords: {
      cx: 66.8,
      cy: 64.5,
      r: 11.6,
      top: 57.9,
      left: 55.2,
      width: 23.3,
      height: 13.1,
    },
  },
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    tagline: 'Timeless Royal Indian & Western Bridal Couture Artistry',
    priceFrom: '₹11,999',
    duration: '120 - 180 min',
    image: '/assets/salon/circle_bridal_makeup.png',
    galleryImages: [
      '/assets/aistudio/image_a72a212f.png',
      '/assets/aistudio/image_d73cdfb4.png',
      '/assets/salon/circle_bridal_makeup.png',
    ],
    description: 'A bespoke regal bridal experience. Flawless waterproof HD base, intricate eye artistry, precision jewelry placement, and traditional dupatta/veil draping.',
    highlights: [
      '24-hour tearproof & sweat-resistant HD foundation base',
      'Intricate glitter & smoky eye makeup with premium 3D lashes',
      'Maang tikka, matha patti, and heavy bridal jewelry setting',
      'Dupatta, saree or veil pleating and pinning',
      'Complimentary bridal luxury touch-up bag'
    ],
    items: [
      { id: 'bm-1', name: 'Sangeet & Cocktail Evening Bridal Glam', price: '₹8,999', duration: '120 min', description: 'Modern shimmering look with romantic textured updo.' },
      { id: 'bm-2', name: 'Royal Wedding Day Bridal Couture', price: '₹18,999', duration: '180 min', description: 'Full traditional bridal artistry, jewelry pinning, and veil draping.' },
      { id: 'bm-3', name: 'Reception Gala Haute Makeup & Hair', price: '₹12,999', duration: '120 min', description: 'Sleek, regal evening aesthetic with sculptured hairstyles.' },
      { id: 'bm-4', name: 'The Empress Grand Package (Trial + Wedding Day)', price: '₹24,999', duration: 'Full Day', description: 'Complete bridal consultation, pre-wedding trial, and wedding day care.' },
    ],
    coords: {
      cx: 94.1,
      cy: 64.1,
      r: 11.6,
      top: 57.5,
      left: 82.5,
      width: 23.3,
      height: 13.1,
    },
  },
  {
    id: 'nail-art',
    title: 'Nail Art',
    tagline: 'Gel Sculpting, Swarovski Crystal Art & Chrome Finishes',
    priceFrom: '₹799',
    duration: '45 - 75 min',
    image: '/assets/salon/circle_nail_art.png',
    galleryImages: [
      '/assets/aistudio/image_6b50e71e.png',
      '/assets/aistudio/image_ea475598.png',
      '/assets/aistudio/image_bfcf177a.png',
      '/assets/aistudio/image_66791fc2.png',
      '/assets/aistudio/image_f3dc9f05.png',
      '/assets/salon/circle_nail_art.png',
    ],
    description: 'Master hand-crafted nail aesthetics from minimalist glazed chrome to opulent 3D jewelry embellishments on natural nails or builder gel extensions.',
    highlights: [
      'Russian cuticle prep & non-toxic luxury gel polishes',
      'Hand-painted miniature florals, swirls, and French tips',
      'Real Swarovski crystal & micro-pearl embellishments',
      'Nourishing almond cuticle oil treatment'
    ],
    items: [
      { id: 'na-1', name: 'Classic Haute French & Sheer Pink Gel', price: '₹799', duration: '45 min', description: 'Clean cuticle care with timeless rosy French tips.' },
      { id: 'na-2', name: 'Glazed Pearl & Holographic Chrome Nails', price: '₹1,299', duration: '60 min', description: 'High-shine iridescent mirror powder over soft pastel nude.' },
      { id: 'na-3', name: 'Bespoke Hand-Painted & Gem Embellishments', price: '₹1,899', duration: '75 min', description: 'Custom artistic designs, gold foil leaf, and crystals.' },
      { id: 'na-4', name: 'Full Sculpted Builder Gel Extensions Set', price: '₹2,499', duration: '90 min', description: 'Flawless length and shape with high-gloss protective topcoat.' },
    ],
    coords: {
      cx: 89.9,
      cy: 83.2,
      r: 12.5,
      top: 76.2,
      left: 77.4,
      width: 25.0,
      height: 14.1,
    },
  },
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'facial' | 'bridal' | 'hair' | 'nails';
  tag: string;
  image: string;
  description: string;
  serviceId: string;
}

export const GALLERY_SHOWCASE: GalleryItem[] = [
  {
    id: 'gal-1',
    title: '24K Royal Gold Leaf Facial',
    category: 'facial',
    tag: 'Signature Gold Mask',
    image: '/assets/aistudio/image_616814bb.png',
    description: 'Pure 24K colloidal gold leaf mask and collagen firming treatment with calming candlelight aromatherapy.',
    serviceId: 'facial',
  },
  {
    id: 'gal-2',
    title: 'Royal Indian Bridal Couture Glamour',
    category: 'bridal',
    tag: 'Bridal Masterpiece',
    image: '/assets/aistudio/image_d73cdfb4.png',
    description: 'Exquisite bridal look in pastel pink lehenga with emerald jewelry, maang tikka, and waterproof HD glow.',
    serviceId: 'bridal-makeup',
  },
  {
    id: 'gal-3',
    title: 'Rose Petal Copper Foot Spa & Pedicure',
    category: 'nails',
    tag: 'Luxury Pedicure',
    image: '/assets/aistudio/image_bfcf177a.png',
    description: 'Handcrafted copper tub soak with fresh Bulgarian rose petals, dead sea salts, and relaxing foot therapy.',
    serviceId: 'nail-art',
  },
  {
    id: 'gal-4',
    title: 'Hydra-Dew Botanical Radiance Facial',
    category: 'facial',
    tag: 'Deep Hydration',
    image: '/assets/aistudio/image_a77632b3.png',
    description: 'Gentle enzyme exfoliation with organic rose extract mist and ice-globe lymphatic drainage.',
    serviceId: 'facial',
  },
  {
    id: 'gal-5',
    title: 'Botanical Argan Restorative Hair Spa',
    category: 'hair',
    tag: 'Deep Hair Spa',
    image: '/assets/aistudio/image_3617284a.png',
    description: 'Wash basin deep nourishing butter therapy, warm steam treatment, and tension-relief scalp massage.',
    serviceId: 'hair-treatment',
  },
  {
    id: 'gal-6',
    title: 'HydraFacial Vortex Deep Pore Infusion',
    category: 'facial',
    tag: 'Advanced Skin Tech',
    image: '/assets/aistudio/image_150e0b70.png',
    description: 'Clinical hydra-dermabrasion technology delivering peptide infusion and antioxidant skin plumping.',
    serviceId: 'facial',
  },
  {
    id: 'gal-7',
    title: 'Diamond Microdermabrasion & LED Glow',
    category: 'facial',
    tag: 'Precision Exfoliation',
    image: '/assets/aistudio/image_420e7079.png',
    description: 'Non-invasive diamond crystal resurfacing paired with calming therapeutic light stimulation.',
    serviceId: 'facial',
  },
  {
    id: 'gal-8',
    title: 'Precision Artisanal Haircut & Blowout',
    category: 'hair',
    tag: 'Master Styling',
    image: '/assets/aistudio/image_2848cb96.png',
    description: 'Custom layered shaping, thermal blowout, and mirror-shine gloss tailored to facial contours.',
    serviceId: 'hair-makeup',
  },
  {
    id: 'gal-9',
    title: 'VIP Presidential Facial Sanctuary Suite',
    category: 'facial',
    tag: 'Private Suite',
    image: '/assets/aistudio/image_5811c128.png',
    description: 'Indulge in private royal treatment suites with classic navy-gold architecture and white orchid floral displays.',
    serviceId: 'facial',
  },
  {
    id: 'gal-10',
    title: 'Haute Gel Nail Art & Precision Polish',
    category: 'nails',
    tag: 'Nail Artistry',
    image: '/assets/aistudio/image_ea475598.png',
    description: 'Meticulous cuticle detailing, non-chip gel color application, and handcrafted crystal accents.',
    serviceId: 'nail-art',
  },
  {
    id: 'gal-11',
    title: 'Rejuvenating Clay & Pearl Facial Mask',
    category: 'facial',
    tag: 'Botanical Mask',
    image: '/assets/aistudio/image_ee0a9481.png',
    description: 'Smoothing kaolin clay and cold-pressed botanical oils for luminous skin clarity and pore tightening.',
    serviceId: 'facial',
  },
  {
    id: 'gal-12',
    title: 'Modern Nail & Pedicure Halo Studio',
    category: 'nails',
    tag: 'Sanctuary Lounge',
    image: '/assets/aistudio/image_66791fc2.png',
    description: 'Ultra-modern pedicure stations with circular halo LED mirrors, ergonomic seating, and sterilized tools.',
    serviceId: 'nail-art',
  },
  {
    id: 'gal-13',
    title: 'VIP Multi-Stylist Team Glam Transformation',
    category: 'hair',
    tag: 'Editorial Glam',
    image: '/assets/aistudio/image_656b22dd.png',
    description: 'Synchronized master styling team for red carpet galas, celebrity appearances, and high-fashion shoots.',
    serviceId: 'hair-makeup',
  },
  {
    id: 'gal-14',
    title: 'Luxe Botanical Pedicure Lounge',
    category: 'nails',
    tag: 'Foot Sanctuary',
    image: '/assets/aistudio/image_f3dc9f05.png',
    description: 'Warm natural wood ambiance, organic essential oil footbaths, and restorative leg therapies.',
    serviceId: 'nail-art',
  },
  {
    id: 'gal-15',
    title: 'Royal Ivory Bride & Floral Updo',
    category: 'bridal',
    tag: 'Bridal Updo',
    image: '/assets/aistudio/image_a72a212f.png',
    description: 'Regal ivory wedding look with handcrafted white rose floral hair bun, pearl maang tikka, kundan jhumkas, and soft-velvet bridal glam.',
    serviceId: 'bridal-makeup',
  },
  {
    id: 'gal-17',
    title: 'Damascena Fresh Rose Petal Mask',
    category: 'facial',
    tag: 'Rose Petal Facial',
    image: '/assets/aistudio/image_e0195dc5.png',
    description: 'Soothing organic pink rose petal cream infusion applied over bed of fresh roses for intense hydration, brightening, and dewy plumpness.',
    serviceId: 'facial',
  },
  {
    id: 'gal-18',
    title: 'Ayurvedic Herbal Detox & Cucumber Mask',
    category: 'facial',
    tag: 'Herbal Detox',
    image: '/assets/aistudio/image_eb4d80b9.png',
    description: 'Holistic green herbal paste rich in crushed neem, aloe, and fresh cucumber slices to cool inflammation and deeply clarify pores.',
    serviceId: 'facial',
  },
  {
    id: 'gal-19',
    title: 'Haute Butterfly & Pearl Ombre Nails',
    category: 'nails',
    tag: 'Sculpted Nails',
    image: '/assets/aistudio/image_6b50e71e.png',
    description: 'Stunning black ombre ballerina extensions featuring hand-painted fine-line butterflies, white blossoms, and luminous pearl drops.',
    serviceId: 'nail-art',
  },
  {
    id: 'gal-24',
    title: '9-Style Sculpted Rose Bun Collection',
    category: 'hair',
    tag: 'Rose Bun Catalog',
    image: '/assets/aistudio/image_c737f2cc.png',
    description: 'Our signature bridal hair lookbook featuring 9 distinct sculpted rose-petal buns, fishtail crowns, and delicate pearl spray hairpieces.',
    serviceId: 'hair-makeup',
  },
  {
    id: 'gal-25',
    title: '16-Design Half-Up Braid & Pearl Catalog',
    category: 'hair',
    tag: 'Hairstyle Lookbook',
    image: '/assets/aistudio/image_194de363.png',
    description: 'Comprehensive styling guide with 16 variations of heart-shaped plaits, gold floral brooches, and cascading pearl chains.',
    serviceId: 'hair-makeup',
  },
  {
    id: 'gal-26',
    title: 'Fairy-Tale Princess Heart-Weave Curls',
    category: 'hair',
    tag: 'Couture Waves',
    image: '/assets/aistudio/image_8a002fca.png',
    description: 'Intricately woven floral heart braid transitioning into cascading golden waves dotted with real baby’s breath and fresh rosebuds.',
    serviceId: 'hair-treatment',
  },
];

export const SALON_INFO = {
  name: 'Beauty Parlour',
  tagline: 'Haute Esthétique & Luxury Salon',
  phone: '+1 (800) 555-4526',
  displayPhone: '+1 (800) 555-GLAM',
  whatsappNumber: '18005554526',
  email: 'concierge@beautyparlour.luxury',
  address: '450 Luxury Avenue, Suite 200, Beverly Hills, CA 90210',
  instagram: '@beautyparlour.luxury',
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 8:00 PM' },
    { days: 'Saturday', time: '9:00 AM – 7:30 PM' },
    { days: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ],
  features: [
    'Private VIP Bridal Dressing Suites',
    'Hospital-Grade Sterilization Protocols',
    'Complimentary Rosé, Cappuccino & Herbal Tea',
    'Award-Winning Master Hair & Makeup Stylists',
  ],
  reviews: [
    {
      name: 'Sophia Montgomery',
      rating: 5,
      service: 'Bridal Makeup',
      comment: 'My wedding makeup stayed completely flawless from 9 AM until 2 AM! The jewelry pinning and dupatta draping were absolute perfection.',
    },
    {
      name: 'Elena Rostova',
      rating: 5,
      service: '24K Gold Facial',
      comment: 'The glow lasted for over two weeks! The ambiance is so peaceful and luxurious. Truly the finest parlour experience.',
    },
    {
      name: 'Priyanka Sharma',
      rating: 5,
      service: 'Hair Treatment & Spa',
      comment: 'My bleached hair was miraculously revived. Silky smooth, healthy, and smells divine.',
    },
    {
      name: 'Camille Laurent',
      rating: 5,
      service: 'Nail Art',
      comment: 'The Swarovski crystal details and glazed chrome finish get compliments every single day.',
    },
  ],
};
