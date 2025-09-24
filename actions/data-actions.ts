"use server";

import {
  mockProducts,
  mockReviews,
  type Product,
  type Review,
} from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

// Mock blog posts data (moved from component to server action)
const mockBlogPosts: BlogPost[] = [
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
    image: "/honey-health-benefits-infographic.jpg",
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
    image: "/islamic-honey-tradition-quran-hadith.jpg",
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
];

// Server action to get a single product
export async function getProduct(productId: string): Promise<Product> {
  const id = Number.parseInt(productId);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return product;
}

// Server action to get all products
export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

// Server action to get product reviews
export async function getProductReviews(productId: number): Promise<Review[]> {
  return mockReviews.filter((r) => r.productId === productId);
}

// Server action to get a single blog post
export async function getBlogPost(postId: string): Promise<BlogPost> {
  const id = Number.parseInt(postId);
  const post = mockBlogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return post;
}

// Server action to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return mockBlogPosts;
}

// Server action to get related blog posts
export async function getRelatedBlogPosts(
  currentPostId: number,
  limit = 2
): Promise<BlogPost[]> {
  return mockBlogPosts
    .filter((post) => post.id !== currentPostId)
    .slice(0, limit);
}
