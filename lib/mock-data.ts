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
  availability: string;
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

export const mockData: Record<string, any[]> = {
  users: [
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
  ],
  products: [
    {
      id: 1,
      name: "Premium Wildflower Honey",
      weight: "500g",
      price: 850,
      originalPrice: 950,
      rating: 4.8,
      reviews: 127,
      images: [
        "/products/wildflower-honey-jar-500g.webp",
        "/products/honey-jar-side-view.webp",
        "/products/honey-jar-top-view.webp",
      ],
      badge: "Bestseller",
      availability: "in-stock",
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
      originalPrice: 600,
      rating: 4.9,
      reviews: 89,
      images: ["/products/acacia-honey-jar-250g.webp"],
      badge: "Premium",
      availability: "out-of-stock",
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
      rating: 5,
      reviews: 56,
      images: [
        "/products/sundarban-honey-jar-1kg.webp",
        "/products/sundarban-honey-jar-top-view.webp",
      ],
      badge: "Limited",
      availability: "in-stock",
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
      rating: 3.6,
      reviews: 73,
      images: ["/products/mustard-honey-jar-500g.webp"],
      badge: null,
      availability: "in-stock",
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
      images: ["/products/litchi-honey-jar-250g.webp"],
      badge: "New",
      availability: "in-stock",
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
      images: ["/products/forest-honey-jar-2kg.jpg"],
      badge: "Premium",
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "out-of-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
      availability: "in-stock",
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
  ],
  blogs: [
    {
      id: 1,
      title: "10 Amazing Health Benefits of Raw Honey",
      excerpt:
        "Discover how raw honey can boost your immune system, improve digestion, and provide natural energy. Learn about the science behind honey's healing properties.",
      content: `Raw honey is one of nature's most powerful superfoods, packed with enzymes, antioxidants, and nutrients that can transform your health. Unlike processed honey, raw honey retains all its natural properties, making it a potent healing agent.

## Immune System Boost

Raw honey contains powerful antioxidants and antimicrobial properties that help strengthen your immune system. Regular consumption can help your body fight off infections and diseases more effectively.

## Digestive Health

The enzymes in raw honey aid digestion and can help soothe stomach issues. It's particularly effective for treating acid reflux and promoting healthy gut bacteria.

## Natural Energy Source

Unlike refined sugars, raw honey provides sustained energy without the crash. It's perfect for athletes and anyone needing natural energy throughout the day.

## Wound Healing

Raw honey has been used for centuries to treat wounds and burns. Its antibacterial properties help prevent infection while promoting faster healing.

## Cough and Throat Relief

A spoonful of raw honey can soothe sore throats and suppress coughs naturally, making it an excellent alternative to commercial cough syrups.`,
      image: "/blogs/honey-health-benefits-infographic.webp",
      category: "Health",
      author: "Dr. Fatima Ahmed",
      date: "March 15, 2024",
      readTime: "5 min read",
      featured: true,
      tags: ["health", "benefits", "immunity", "natural"],
    },
    {
      id: 2,
      title: "Honey in Islamic Tradition: Following the Sunnah",
      excerpt:
        "Explore the blessed tradition of honey consumption in Islam, including prophetic guidance and the spiritual significance of this natural remedy.",
      content: `Honey holds a special place in Islamic tradition, mentioned in the Quran and recommended by Prophet Muhammad (peace be upon him) as a healing remedy.

## Quranic References

The Quran mentions honey as a healing substance: "There comes forth from their bellies a drink of varying colors, wherein is healing for men" (16:69).

## Prophetic Guidance

The Prophet (PBUH) said: "Honey is a remedy for every illness and the Quran is a remedy for all illness of the mind, therefore I recommend to you both remedies, the Quran and honey."

## Spiritual Benefits

Consuming honey while remembering Allah and following the Sunnah brings both physical and spiritual benefits to believers.

## Traditional Uses

Islamic medicine has long recognized honey's healing properties for various ailments, from digestive issues to skin conditions.`,
      image: "/blogs/islamic-honey-tradition-quran-hadith.jpeg",
      category: "Sunnah",
      author: "Imam Abdullah Rahman",
      date: "March 10, 2024",
      readTime: "7 min read",
      featured: false,
      tags: ["sunnah", "islam", "tradition", "healing"],
    },
    {
      id: 3,
      title: "Natural Honey Recipes for Daily Wellness",
      excerpt:
        "Simple and delicious ways to incorporate honey into your daily routine. From morning tonics to evening remedies, discover the power of honey recipes.",
      content: `Transform your daily wellness routine with these simple yet powerful honey recipes that promote health and vitality.

## Morning Honey Lemon Water

Start your day with warm water, fresh lemon juice, and a tablespoon of raw honey. This combination boosts metabolism and aids detoxification.

## Golden Milk with Honey

Mix turmeric, ginger, cinnamon, and honey in warm milk for a powerful anti-inflammatory drink perfect for evening relaxation.

## Honey Ginger Tea

Combine fresh ginger, honey, and hot water for a soothing drink that aids digestion and boosts immunity.

## Energy Balls

Mix dates, nuts, seeds, and honey to create natural energy balls perfect for pre-workout fuel or healthy snacking.

## Honey Face Mask

Create a natural face mask with honey, oatmeal, and yogurt for glowing, healthy skin.`,
      image: "/honey-recipes-wellness-drinks.jpg",
      category: "Recipes",
      author: "Chef Rashida Begum",
      date: "March 5, 2024",
      readTime: "4 min read",
      featured: false,
      tags: ["recipes", "wellness", "drinks", "natural"],
    },
    {
      id: 4,
      title: "How to Identify Pure vs. Adulterated Honey",
      excerpt:
        "Learn the simple tests and signs to ensure you're getting genuine, pure honey. Protect yourself from fake honey with these expert tips.",
      content: `With the rise of adulterated honey in the market, it's crucial to know how to identify pure, genuine honey. Here are proven methods to test honey quality.

## The Water Test

Pure honey will settle at the bottom when dropped in water, while adulterated honey will dissolve or create a cloudy mixture.

## The Thumb Test

Place a drop of honey on your thumb. Pure honey will stay in place, while fake honey will spread or drip.

## The Fire Test

Pure honey is flammable and will burn when exposed to flame, while adulterated honey contains water and won't ignite easily.

## Crystallization

Pure honey crystallizes over time, especially in cold temperatures. This is a natural process and indicates authenticity.

## Taste and Texture

Pure honey has a distinct floral taste and smooth texture, while fake honey often tastes overly sweet with a syrupy consistency.

## Laboratory Testing

For complete certainty, professional laboratory testing can detect adulterants and confirm honey purity.`,
      image: "/pure-honey-identification-tests.jpg",
      category: "Health",
      author: "Dr. Mohammad Hassan",
      date: "February 28, 2024",
      readTime: "6 min read",
      featured: false,
      tags: ["quality", "testing", "pure", "authentic"],
    },
    {
      id: 5,
      title: "Seasonal Allergies: How Local Honey Can Help",
      excerpt:
        "Understand the science behind using local honey for seasonal allergy relief. Learn when and how to use honey as a natural antihistamine.",
      content: `Local honey has been used as a natural remedy for seasonal allergies for generations. Here's the science behind this traditional treatment.

## The Theory

Local honey contains small amounts of pollen from local plants. Regular consumption may help build tolerance to these allergens.

## Scientific Evidence

While studies show mixed results, many people report significant improvement in allergy symptoms when consuming local honey regularly.

## How to Use

Take 1-2 tablespoons of local honey daily, starting a few months before allergy season for best results.

## Choosing the Right Honey

Look for raw, unfiltered honey from local beekeepers within a 50-mile radius of your home for maximum effectiveness.

## Additional Benefits

Beyond allergy relief, local honey provides antioxidants, enzymes, and other nutrients that support overall health.

## Precautions

Consult with healthcare providers before using honey as allergy treatment, especially if you have severe allergies or take medications.`,
      image: "/local-honey-seasonal-allergies-relief.jpg",
      category: "Health",
      author: "Dr. Fatima Ahmed",
      date: "February 20, 2024",
      readTime: "5 min read",
      featured: false,
      tags: ["allergies", "local", "natural", "treatment"],
    },
    {
      id: 6,
      title: "The Art of Beekeeping in Bangladesh",
      excerpt:
        "Take a journey into traditional beekeeping practices in Bangladesh. Meet our local beekeepers and learn about sustainable honey production.",
      content: `Bangladesh has a rich tradition of beekeeping that combines ancient wisdom with modern sustainable practices.

## Traditional Methods

Local beekeepers use time-tested techniques passed down through generations, working in harmony with nature's cycles.

## Sustainable Practices

Modern Bangladeshi apiaries focus on bee welfare, environmental protection, and sustainable honey production methods.

## Seasonal Patterns

Beekeeping in Bangladesh follows distinct seasonal patterns, with different flowers blooming throughout the year providing varied honey flavors.

## Challenges and Solutions

Climate change and urbanization pose challenges, but innovative beekeepers are adapting with new techniques and technologies.

## Community Impact

Beekeeping provides livelihoods for rural communities while supporting biodiversity and agricultural pollination.

## Quality Standards

Bangladeshi honey producers maintain high quality standards, ensuring pure, natural honey reaches consumers.`,
      image: "/bangladesh-beekeeping-traditional-methods.jpg",
      category: "Beekeeping",
      author: "Karim Uddin",
      date: "February 15, 2024",
      readTime: "8 min read",
      featured: false,
      tags: ["beekeeping", "bangladesh", "traditional", "sustainable"],
    },
  ],
  reviews: [
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
  ],
};

import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  RefreshCw,
  Monitor,
  Laptop,
  Headphones,
} from "lucide-react";

export const statsData = {
  topStats: [
    {
      title: "Total Sales",
      value: "$847.2K",
      change: "+12.5% from last month",
      trend: "up" as const,
      icon: DollarSign,
      iconColor: "text-green-600",
      iconBg: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Total Orders",
      value: "2,847",
      change: "+8.2% from last month",
      trend: "up" as const,
      icon: ShoppingCart,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Customers",
      value: "1,247",
      change: "+16.3% from last month",
      trend: "up" as const,
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50 dark:bg-purple-950",
    },
  ],
  bottomStats: [
    {
      title: "Pending Orders",
      value: "47",
      change: "Needs attention",
      trend: "neutral" as const,
      icon: Package,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-50 dark:bg-yellow-950",
    },
    {
      title: "Returns",
      value: "23",
      change: "-2.1% from last month",
      trend: "down" as const,
      icon: RefreshCw,
      iconColor: "text-red-600",
      iconBg: "bg-red-50 dark:bg-red-950",
    },
  ],
};

export const salesTrendData = [
  { day: "Mon", thisWeek: 75, lastWeek: 60 },
  { day: "Tue", thisWeek: 85, lastWeek: 70 },
  { day: "Wed", thisWeek: 95, lastWeek: 80 },
  { day: "Thu", thisWeek: 105, lastWeek: 90 },
  { day: "Fri", thisWeek: 115, lastWeek: 95 },
  { day: "Sat", thisWeek: 125, lastWeek: 100 },
  { day: "Sun", thisWeek: 135, lastWeek: 105 },
];

export const ordersData = [
  {
    id: "#ORD-2024-001",
    customer: "John Smith",
    avatar: "JS",
    amount: "$299.99",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  },
  {
    id: "#ORD-2024-002",
    customer: "Emma Davis",
    avatar: "ED",
    amount: "$159.50",
    status: "Pending",
    statusColor:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  },
  {
    id: "#ORD-2024-003",
    customer: "Michael Brown",
    avatar: "MB",
    amount: "$89.99",
    status: "Processing",
    statusColor:
      "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: "#ORD-2024-004",
    customer: "Sarah Wilson",
    avatar: "SW",
    amount: "$449.00",
    status: "Completed",
    statusColor:
      "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  },
  {
    id: "#ORD-2024-005",
    customer: "David Lee",
    avatar: "DL",
    amount: "$199.99",
    status: "Pending",
    statusColor:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  },
];

export const lowStockItemsData = [
  {
    name: "iPhone 15 Pro Max",
    stock: "Only 3 left in stock",
    icon: Monitor,
    urgent: true,
  },
  {
    name: "MacBook Air M2",
    stock: "Only 7 left in stock",
    icon: Laptop,
    urgent: false,
  },
  {
    name: "AirPods Pro",
    stock: "Only 2 left in stock",
    icon: Headphones,
    urgent: true,
  },
  {
    name: 'iPad Pro 12.9"',
    stock: "Only 5 left in stock",
    icon: Monitor,
    urgent: false,
  },
  {
    name: 'iMac 24" M1',
    stock: "Only 1 left in stock",
    icon: Monitor,
    urgent: true,
  },
];
