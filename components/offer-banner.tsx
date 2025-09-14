"use client"

import { X, Clock } from "lucide-react"
import { useState } from "react"

export function OfferBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary to-orange-500 text-white py-2 px-4 relative">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span className="font-semibold text-sm">Limited Time: Free Delivery + 10% OFF on orders above ৳500</span>
          <span className="hidden sm:inline text-sm opacity-90">| Join 5,000+ satisfied customers this month!</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
