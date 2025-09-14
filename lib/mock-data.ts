// Mock data for products, reviews, and other ecommerce functionality
export interface Product {
  id: number
  name: string
  weight: string
  price: number
  originalPrice: number | null
  rating: number
  reviews: number
  images: string[]
  badge: string | null
  inStock: boolean
  type: string
  description: string
  benefits: string[]
  nutritionalInfo: {
    calories: string
    carbohydrates: string
    sugars: string
    protein: string
    fat: string
    sodium: string
  }
}

export interface Review {
  id: number
  productId: number
  userId: number
  userName: string
  userAvatar: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

export interface User {
  id: number
  name: string
  email: string
  avatar: string
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
    images: ["/wildflower-honey-jar-500g.jpg", "/honey-jar-side-view.jpg", "/honey-jar-top-view.jpg"],
    badge: "Bestseller",
    inStock: true,
    type: "wildflower",
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
    type: "acacia",
    description: "Light colored honey with delicate floral taste from acacia flowers.",
    benefits: ["Mild and delicate flavor", "Rich in antioxidants", "Natural sweetener", "Supports digestive health"],
    nutritionalInfo: {
      calories: "304 per 100g",
      carbohydrates: "82.4g",
      sugars: "82.1g",
      protein: "0.3g",
      fat: "0g",
      sodium: "4mg",
    },
  },
]

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
    comment: "My children love it and it's perfect for following Sunnah practices. Good value for money.",
    date: "2024-01-05",
    verified: true,
    helpful: 5,
  },
]

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
]
