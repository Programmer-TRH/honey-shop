"use server"

import { mockProducts, mockReviews, type Product, type Review } from "@/lib/mock-data"
import { notFound } from "next/navigation"

// Blog post interface
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
  tags: string[]
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

A spoonful of raw honey can soothe sore throats and suppress coughs naturally, making it an excellent alternative to commercial cough syrups.

## Antioxidant Properties

Raw honey is rich in antioxidants that help protect your body from cellular damage and reduce inflammation.

## Heart Health

Studies suggest that honey consumption may help improve heart health by reducing bad cholesterol and increasing good cholesterol levels.

## Skin Benefits

When applied topically, raw honey can help treat acne, moisturize skin, and promote healing of minor cuts and scrapes.

## Sleep Quality

A small amount of honey before bed can help improve sleep quality by promoting the release of melatonin.

## Allergy Relief

Local raw honey may help reduce seasonal allergy symptoms by exposing you to small amounts of local pollen.`,
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
    title: "The Art of Beekeeping: A Beginner's Guide",
    excerpt:
      "Learn the basics of beekeeping and how to start your own hive. From equipment to maintenance, discover everything you need to know.",
    content: `Beekeeping is an ancient practice that connects us with nature while providing sweet rewards. Whether you're interested in hobby beekeeping or commercial production, this guide will help you get started.

## Getting Started

Before you begin, research local regulations and consider taking a beekeeping course. Join local beekeeping associations for support and guidance.

## Essential Equipment

You'll need a hive, frames, protective gear, smoker, and hive tool. Quality equipment is an investment in your success and safety.

## Choosing Your Location

Bees need access to water, diverse flowers, and protection from strong winds. Ensure your location complies with local zoning laws.

## Understanding Bee Behavior

Learn about the bee lifecycle, seasonal patterns, and signs of a healthy hive. This knowledge is crucial for successful beekeeping.`,
    image: "/beekeeping-guide-equipment.jpg",
    category: "Education",
    author: "Mohammad Rahman",
    date: "March 10, 2024",
    readTime: "8 min read",
    featured: false,
    tags: ["beekeeping", "education", "guide", "beginner"],
  },
  {
    id: 3,
    title: "Honey in Traditional Medicine: Ancient Wisdom",
    excerpt:
      "Explore how honey has been used in traditional medicine across cultures for thousands of years and its relevance in modern healthcare.",
    content: `Throughout history, honey has been revered as a healing substance across cultures worldwide. From ancient Egypt to traditional Chinese medicine, honey's therapeutic properties have been recognized and utilized for millennia.

## Ancient Egyptian Medicine

The ancient Egyptians used honey for wound healing and preservation. Medical papyri from 2600 BCE describe honey-based remedies for various ailments.

## Ayurvedic Traditions

In Ayurveda, honey is considered a yogavahi - a substance that enhances the medicinal properties of other ingredients and helps deliver them to target tissues.

## Traditional Chinese Medicine

TCM practitioners use honey to tonify the spleen, moisten the lungs, and harmonize other medicinal ingredients in herbal formulas.

## Modern Scientific Validation

Contemporary research has validated many traditional uses of honey, confirming its antimicrobial, anti-inflammatory, and wound-healing properties.`,
    image: "/traditional-medicine-honey.jpg",
    category: "Health",
    author: "Dr. Sarah Chen",
    date: "March 5, 2024",
    readTime: "6 min read",
    featured: true,
    tags: ["traditional", "medicine", "history", "healing"],
  },
]

// Server action to get a single product
export async function getProduct(productId: string): Promise<Product> {
  const id = Number.parseInt(productId)
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return product
}

// Server action to get all products
export async function getProducts(): Promise<Product[]> {
  return mockProducts
}

// Server action to get product reviews
export async function getProductReviews(productId: number): Promise<Review[]> {
  return mockReviews.filter((r) => r.productId === productId)
}

// Server action to get a single blog post
export async function getBlogPost(postId: string): Promise<BlogPost> {
  const id = Number.parseInt(postId)
  const post = mockBlogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  return post
}

// Server action to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return mockBlogPosts
}

// Server action to get related blog posts
export async function getRelatedBlogPosts(currentPostId: number, limit = 2): Promise<BlogPost[]> {
  return mockBlogPosts.filter((post) => post.id !== currentPostId).slice(0, limit)
}
