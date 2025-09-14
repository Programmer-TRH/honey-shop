"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShopFilters } from "@/components/shop-filters"
import { ProductGrid } from "@/components/product-grid"
import { FloatingCart } from "@/components/floating-cart"
import { SearchBar } from "@/components/search-bar"
import { OfferBanner } from "@/components/offer-banner"
import { Badge } from "@/components/ui/badge"
import { Star, Shield, Award } from "lucide-react"

const allProducts = [
  {
    id: 1,
    name: "Premium Wildflower Honey",
    weight: "500g",
    price: 850,
    originalPrice: 950,
    rating: 4.8,
    reviews: 127,
    image: "/wildflower-honey-jar-500g.jpg",
    badge: "Bestseller",
    inStock: true,
    type: "Wildflower",
    description: "Pure wildflower honey collected from diverse floral sources",
  },
  {
    id: 2,
    name: "Pure Acacia Honey",
    weight: "250g",
    price: 450,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: "/acacia-honey-jar-250g.jpg",
    badge: "Premium",
    inStock: true,
    type: "Acacia",
    description: "Light colored honey with delicate floral taste",
  },
  {
    id: 3,
    name: "Sundarban Mangrove Honey",
    weight: "1kg",
    price: 1650,
    originalPrice: 1800,
    rating: 4.7,
    reviews: 56,
    image: "/sundarban-honey-jar-1kg.jpg",
    badge: "Limited",
    inStock: true,
    type: "Sundarban",
    description: "Rare honey from the world's largest mangrove forest",
  },
  {
    id: 4,
    name: "Mustard Flower Honey",
    weight: "500g",
    price: 750,
    originalPrice: null,
    rating: 4.6,
    reviews: 73,
    image: "/mustard-honey-jar-500g.jpg",
    badge: null,
    inStock: true,
    type: "Mustard",
    description: "Golden honey with distinctive mustard flower essence",
  },
  {
    id: 5,
    name: "Litchi Blossom Honey",
    weight: "250g",
    price: 550,
    originalPrice: 600,
    rating: 4.8,
    reviews: 42,
    image: "/litchi-honey-jar-250g.jpg",
    badge: "New",
    inStock: false,
    type: "Litchi",
    description: "Sweet honey with subtle litchi fruit notes",
  },
  {
    id: 6,
    name: "Raw Forest Honey",
    weight: "2kg",
    price: 2800,
    originalPrice: 3200,
    rating: 4.9,
    reviews: 31,
    image: "/forest-honey-jar-2kg.jpg",
    badge: "Premium",
    inStock: true,
    type: "Wildflower",
    description: "Unprocessed honey from deep forest sources",
  },
  {
    id: 7,
    name: "Clover Honey",
    weight: "500g",
    price: 720,
    originalPrice: null,
    rating: 4.5,
    reviews: 95,
    image: "/clover-honey-jar-500g.jpg",
    badge: null,
    inStock: true,
    type: "Wildflower",
    description: "Mild and sweet honey from clover fields",
  },
  {
    id: 8,
    name: "Eucalyptus Honey",
    weight: "250g",
    price: 480,
    originalPrice: 520,
    rating: 4.4,
    reviews: 67,
    image: "/eucalyptus-honey-jar-250g.jpg",
    badge: null,
    inStock: true,
    type: "Eucalyptus",
    description: "Distinctive honey with herbal eucalyptus notes",
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([200, 3000])
  const [selectedWeights, setSelectedWeights] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const itemsPerPage = 6

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Weight filter
      const matchesWeight = selectedWeights.length === 0 || selectedWeights.includes(product.weight)

      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(product.type)

      // Stock filter
      const matchesStock = !showInStockOnly || product.inStock

      return matchesSearch && matchesPrice && matchesWeight && matchesType && matchesStock
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // featured
        filtered.sort((a, b) => {
          if (a.badge === "Bestseller") return -1
          if (b.badge === "Bestseller") return 1
          return b.rating - a.rating
        })
    }

    return filtered
  }, [searchQuery, priceRange, selectedWeights, selectedTypes, sortBy, showInStockOnly])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleFiltersChange = (filters: {
    priceRange: number[]
    selectedWeights: string[]
    selectedTypes: string[]
    showInStockOnly: boolean
  }) => {
    setPriceRange(filters.priceRange)
    setSelectedWeights(filters.selectedWeights)
    setSelectedTypes(filters.selectedTypes)
    setShowInStockOnly(filters.showInStockOnly)
    setCurrentPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <OfferBanner />
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30 px-4 py-2">
                <Shield className="h-4 w-4 mr-2" />
                100% Pure & Natural
              </Badge>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 px-4 py-2">
                <Award className="h-4 w-4 mr-2" />
                BSTI Certified
              </Badge>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Premium Honey Collection
            </h1>
            <p className="text-xl text-muted-foreground text-pretty mb-6 max-w-2xl mx-auto">
              Discover our range of pure, natural honey varieties sourced from the finest apiaries across Bangladesh.
            </p>

            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-700">4.9</span>
              <span className="text-gray-500">(1,200+ reviews)</span>
            </div>

            <SearchBar onSearchChange={handleSearchChange} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ShopFilters
                onFiltersChange={handleFiltersChange}
                initialPriceRange={priceRange}
                initialWeights={selectedWeights}
                initialTypes={selectedTypes}
                initialShowInStockOnly={showInStockOnly}
              />
            </aside>
            <div className="flex-1">
              <ProductGrid
                products={paginatedProducts}
                totalProducts={filteredAndSortedProducts.length}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingCart />
    </div>
  )
}
