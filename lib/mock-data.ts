// Mock data for products, reviews, and other ecommerce functionality
export interface Product {
  id: number;
  name: string;
  weight: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  images: string[];
  badge: string | null;
  inStock: boolean;
  type: string;
  description: string;
  benefits: string[];
  nutritionalInfo: {
    calories: string;
    carbohydrates: string;
    sugars: string;
    protein: string;
    fat: string;
    sodium: string;
  };
}

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// Mock products data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wildflower Honey",
    weight: "500g",
    price: 850,
    originalPrice: 950,
    rating: 4.8,
    reviews: 127,
    images: [
      "/wildflower-honey-jar-500g.jpg",
      "/honey-jar-side-view.jpg",
      "/honey-jar-top-view.jpg",
    ],
    badge: "Bestseller",
    inStock: true,
    type: "Wildflower",
    description:
      "Our premium wildflower honey is sourced from pristine meadows across Bangladesh. This raw, unprocessed honey retains all its natural enzymes, vitamins, and minerals.",
    benefits: [
      "Rich in antioxidants and natural enzymes",
      "Supports immune system health",
      "Natural energy booster",
      "Aids in digestion and gut health",
      "Contains antibacterial properties",
      "Helps with seasonal allergies",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82.1g",
      protein: "0.3g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 2,
    name: "Pure Acacia Honey",
    weight: "250g",
    price: 450,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    images: ["/acacia-honey-jar-250g.jpg"],
    badge: "Premium",
    inStock: true,
    type: "Acacia",
    description:
      "Light colored honey with delicate floral taste from acacia flowers.",
    benefits: [
      "Mild and delicate flavor",
      "Rich in antioxidants",
      "Natural sweetener",
      "Supports digestive health",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82.1g",
      protein: "0.3g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 3,
    name: "Sundarban Mangrove Honey",
    weight: "1kg",
    price: 1650,
    originalPrice: 1800,
    rating: 4.7,
    reviews: 56,
    images: ["/sundarban-honey-jar-1kg.jpg"],
    badge: "Limited",
    inStock: true,
    type: "Sundarban",
    description: "Rare honey from the world's largest mangrove forest.",
    benefits: [
      "Boosts immunity",
      "Supports respiratory health",
      "Rich in minerals",
      "Natural antibacterial properties",
    ],
    nutritionalInfo: {
      calories: "306 per 100g",
      carbohydrates: "82g",
      sugars: "81.5g",
      protein: "0.2g",
      fat: "0g",
      sodium: "5mg",
    },
  },
  {
    id: 4,
    name: "Mustard Flower Honey",
    weight: "500g",
    price: 750,
    originalPrice: null,
    rating: 4.6,
    reviews: 73,
    images: ["/mustard-honey-jar-500g.jpg"],
    badge: null,
    inStock: true,
    type: "Mustard",
    description: "Golden honey with distinctive mustard flower essence.",
    benefits: [
      "Improves digestion",
      "Boosts energy levels",
      "Supports skin health",
      "Rich in natural enzymes",
    ],
    nutritionalInfo: {
      calories: "302 per 100g",
      carbohydrates: "81.8g",
      sugars: "81.2g",
      protein: "0.3g",
      fat: "0g",
      sodium: "3mg",
    },
  },
  {
    id: 5,
    name: "Litchi Blossom Honey",
    weight: "250g",
    price: 550,
    originalPrice: 600,
    rating: 4.8,
    reviews: 42,
    images: ["/litchi-honey-jar-250g.jpg"],
    badge: "New",
    inStock: false,
    type: "Litchi",
    description: "Sweet honey with subtle litchi fruit notes.",
    benefits: [
      "Delicate fruity flavor",
      "Rich in antioxidants",
      "Good for heart health",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82g",
      protein: "0.2g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 6,
    name: "Raw Forest Honey",
    weight: "2kg",
    price: 2800,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 31,
    images: ["/forest-honey-jar-2kg.jpg"],
    badge: "Premium",
    inStock: true,
    type: "Forest",
    description: "Unprocessed honey from deep forest sources.",
    benefits: [
      "Strengthens immunity",
      "Natural cough suppressant",
      "Rich earthy flavor",
    ],
    nutritionalInfo: {
      calories: "305 per 100g",
      carbohydrates: "82g",
      sugars: "81.9g",
      protein: "0.4g",
      fat: "0g",
      sodium: "6mg",
    },
  },
  {
    id: 7,
    name: "Clover Honey",
    weight: "500g",
    price: 720,
    originalPrice: null,
    rating: 4.5,
    reviews: 95,
    images: ["/clover-honey-jar-500g.jpg"],
    badge: null,
    inStock: true,
    type: "Clover",
    description: "Mild and sweet honey from clover fields.",
    benefits: [
      "Balanced sweetness",
      "Great natural sweetener",
      "Helps soothe sore throat",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82.1g",
      protein: "0.3g",
      fat: "0g",
      sodium: "3mg",
    },
  },
  {
    id: 8,
    name: "Eucalyptus Honey",
    weight: "250g",
    price: 480,
    originalPrice: 520,
    rating: 4.4,
    reviews: 67,
    images: ["/eucalyptus-honey-jar-250g.jpg"],
    badge: null,
    inStock: true,
    type: "Eucalyptus",
    description: "Distinctive honey with herbal eucalyptus notes.",
    benefits: [
      "Supports respiratory health",
      "Boosts immunity",
      "Strong antibacterial properties",
    ],
    nutritionalInfo: {
      calories: "305 per 100g",
      carbohydrates: "82g",
      sugars: "81.8g",
      protein: "0.2g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 9,
    name: "Ajwain Honey",
    weight: "500g",
    price: 880,
    originalPrice: 950,
    rating: 4.7,
    reviews: 54,
    images: ["/ajwain-honey-jar-500g.jpg"],
    badge: "Medicinal",
    inStock: true,
    type: "Ajwain",
    description: "Strong flavored honey with digestive benefits.",
    benefits: [
      "Aids digestion",
      "Natural remedy for acidity",
      "Boosts metabolism",
    ],
    nutritionalInfo: {
      calories: "303 per 100g",
      carbohydrates: "81.9g",
      sugars: "81.6g",
      protein: "0.3g",
      fat: "0g",
      sodium: "5mg",
    },
  },
  {
    id: 10,
    name: "Neem Honey",
    weight: "250g",
    price: 560,
    originalPrice: 600,
    rating: 4.6,
    reviews: 40,
    images: ["/neem-honey-jar-250g.jpg"],
    badge: "Ayurvedic",
    inStock: true,
    type: "Neem",
    description: "Dark honey with medicinal neem properties.",
    benefits: [
      "Supports liver health",
      "Improves skin condition",
      "Strong antibacterial benefits",
    ],
    nutritionalInfo: {
      calories: "305 per 100g",
      carbohydrates: "82g",
      sugars: "81.7g",
      protein: "0.3g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 11,
    name: "Jamun Honey",
    weight: "500g",
    price: 890,
    originalPrice: null,
    rating: 4.8,
    reviews: 62,
    images: ["/jamun-honey-jar-500g.jpg"],
    badge: "Diabetic-Friendly",
    inStock: true,
    type: "Jamun",
    description: "Low glycemic honey from jamun blossoms.",
    benefits: [
      "Helps regulate blood sugar",
      "Rich in iron",
      "Improves digestion",
    ],
    nutritionalInfo: {
      calories: "302 per 100g",
      carbohydrates: "81.5g",
      sugars: "81g",
      protein: "0.2g",
      fat: "0g",
      sodium: "3mg",
    },
  },
  {
    id: 12,
    name: "Tulsi Honey",
    weight: "250g",
    price: 500,
    originalPrice: 550,
    rating: 4.7,
    reviews: 38,
    images: ["/tulsi-honey-jar-250g.jpg"],
    badge: null,
    inStock: true,
    type: "Tulsi",
    description: "Herbal honey infused with sacred basil (tulsi).",
    benefits: [
      "Boosts immunity",
      "Reduces stress",
      "Supports respiratory health",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.3g",
      sugars: "82g",
      protein: "0.3g",
      fat: "0g",
      sodium: "3mg",
    },
  },
  {
    id: 13,
    name: "Orange Blossom Honey",
    weight: "500g",
    price: 780,
    originalPrice: 820,
    rating: 4.9,
    reviews: 51,
    images: ["/orange-honey-jar-500g.jpg"],
    badge: "Citrus",
    inStock: true,
    type: "Orange",
    description: "Citrusy honey with refreshing orange blossom flavor.",
    benefits: [
      "Mood uplifting flavor",
      "Supports skin glow",
      "Natural energy booster",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82.2g",
      protein: "0.2g",
      fat: "0g",
      sodium: "3mg",
    },
  },
  {
    id: 14,
    name: "Rosewood Honey",
    weight: "1kg",
    price: 1700,
    originalPrice: 1850,
    rating: 4.7,
    reviews: 33,
    images: ["/rosewood-honey-jar-1kg.jpg"],
    badge: "Exotic",
    inStock: true,
    type: "Rosewood",
    description: "Rare honey with woody floral notes from rosewood trees.",
    benefits: [
      "Supports bone strength",
      "Rich in natural antioxidants",
      "Boosts overall vitality",
    ],
    nutritionalInfo: {
      calories: "306 per 100g",
      carbohydrates: "82.1g",
      sugars: "81.8g",
      protein: "0.3g",
      fat: "0g",
      sodium: "4mg",
    },
  },
  {
    id: 15,
    name: "Black Seed Honey",
    weight: "250g",
    price: 620,
    originalPrice: 680,
    rating: 4.8,
    reviews: 47,
    images: ["/blackseed-honey-jar-250g.jpg"],
    badge: "Medicinal",
    inStock: true,
    type: "Black Seed",
    description: "Powerful honey infused with black seed benefits.",
    benefits: [
      "Boosts immunity",
      "Helps fight infections",
      "Supports respiratory health",
    ],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.2g",
      sugars: "81.9g",
      protein: "0.4g",
      fat: "0g",
      sodium: "4mg",
    },
  },
];

// Mock reviews data
export const mockReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    userName: "Fatima Rahman",
    userAvatar: "/woman-profile.png",
    rating: 5,
    title: "Excellent quality honey!",
    comment:
      "My family loves the taste and we use it daily. Fast delivery and great packaging. The honey is pure and natural as promised.",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    images: ["/review-honey-1.jpg"],
  },
  {
    id: 2,
    productId: 1,
    userId: 2,
    userName: "Ahmed Hassan",
    userAvatar: "/man-profile.png",
    rating: 5,
    title: "Pure and natural as promised",
    comment:
      "I can taste the difference compared to store-bought honey. Highly recommended! The texture and color are perfect.",
    date: "2024-01-10",
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    productId: 1,
    userId: 3,
    userName: "Rashida Begum",
    userAvatar: "/elderly-woman-profile-photo.jpg",
    rating: 4,
    title: "Good quality honey",
    comment:
      "My children love it and it's perfect for following Sunnah practices. Good value for money.",
    date: "2024-01-05",
    verified: true,
    helpful: 5,
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Fatima Rahman",
    email: "fatima@example.com",
    avatar: "/woman-profile.png",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    avatar: "/man-profile.png",
  },
  {
    id: 3,
    name: "Rashida Begum",
    email: "rashida@example.com",
    avatar: "/elderly-woman-profile-photo.jpg",
  },
];
