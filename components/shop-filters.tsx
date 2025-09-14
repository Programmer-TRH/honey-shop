"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { X, Filter } from "lucide-react"

interface ShopFiltersProps {
  onFiltersChange?: (filters: {
    priceRange: number[]
    selectedWeights: string[]
    selectedTypes: string[]
    showInStockOnly: boolean
  }) => void
  initialPriceRange?: number[]
  initialWeights?: string[]
  initialTypes?: string[]
  initialShowInStockOnly?: boolean
}

export function ShopFilters({
  onFiltersChange,
  initialPriceRange = [200, 3000],
  initialWeights = [],
  initialTypes = [],
  initialShowInStockOnly = false,
}: ShopFiltersProps) {
  const [priceRange, setPriceRange] = useState(initialPriceRange)
  const [selectedWeights, setSelectedWeights] = useState<string[]>(initialWeights)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialTypes)
  const [showInStockOnly, setShowInStockOnly] = useState(initialShowInStockOnly)

  const weights = ["250g", "500g", "1kg", "2kg"]
  const types = ["Wildflower", "Acacia", "Sundarban", "Mustard", "Litchi", "Eucalyptus"]

  useEffect(() => {
    onFiltersChange?.({
      priceRange,
      selectedWeights,
      selectedTypes,
      showInStockOnly,
    })
  }, [priceRange, selectedWeights, selectedTypes, showInStockOnly, onFiltersChange])

  const handleWeightChange = (weight: string, checked: boolean) => {
    if (checked) {
      setSelectedWeights([...selectedWeights, weight])
    } else {
      setSelectedWeights(selectedWeights.filter((w) => w !== weight))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    }
  }

  const clearFilters = () => {
    setPriceRange([200, 3000])
    setSelectedWeights([])
    setSelectedTypes([])
    setShowInStockOnly(false)
  }

  const activeFiltersCount = selectedWeights.length + selectedTypes.length + (showInStockOnly ? 1 : 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg text-foreground">Filters</h2>
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedWeights.map((weight) => (
            <Badge key={weight} variant="secondary" className="bg-primary/10 text-primary">
              {weight}
              <button
                onClick={() => handleWeightChange(weight, false)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedTypes.map((type) => (
            <Badge key={type} variant="secondary" className="bg-primary/10 text-primary">
              {type}
              <button
                onClick={() => handleTypeChange(type, false)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {showInStockOnly && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              In Stock Only
              <button onClick={() => setShowInStockOnly(false)} className="ml-1 hover:bg-green-200 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch id="in-stock" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              Show in stock only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={3000} min={200} step={50} className="w-full" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Weight Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Weight</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weights.map((weight) => (
            <div key={weight} className="flex items-center space-x-2">
              <Checkbox
                id={weight}
                checked={selectedWeights.includes(weight)}
                onCheckedChange={(checked) => handleWeightChange(weight, checked as boolean)}
              />
              <Label htmlFor={weight} className="text-sm font-normal cursor-pointer">
                {weight}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Honey Type Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Honey Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
