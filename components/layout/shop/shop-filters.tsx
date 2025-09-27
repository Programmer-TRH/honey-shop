"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  X,
  Filter,
  CircleDollarSign,
  Star,
  BadgeCheck,
  Weight,
  ChartBarStacked,
  BadgeCheckIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { productSchema } from "@/lib/shcema/product-schema";
import { useDebounceCallback } from "@/hooks/use-debounce";

interface FilterValue {
  value: string;
  count: number;
}

interface ShopFiltersProps {
  filters: {
    weight: FilterValue[];
    availability: FilterValue[];
    type: FilterValue[];
    badge: FilterValue[];
    price: FilterValue[];
  };
}

export function ShopFilters({ filters }: ShopFiltersProps) {
  const { query, updateQuery } = useParsedQuery(productSchema);
  const MIN_PRICE =
    filters.price && filters.price.length > 0
      ? Math.min(...filters.price.map((p) => Number(p.value)))
      : 0;
  const MAX_PRICE =
    filters.price && filters.price.length > 0
      ? Math.max(...filters.price.map((p) => Number(p.value)))
      : 5000;

  const selectedWeights: string[] = Array.isArray(query.weight)
    ? query.weight
    : query.weight
    ? query.weight.split(",")
    : [];

  const selectedTypes: string[] = Array.isArray(query.type)
    ? query.type
    : query.type
    ? query.type.split(",")
    : [];

  const selectedBadges: string[] = Array.isArray(query.badge)
    ? query.badge
    : query.badge
    ? query.badge.split(",")
    : [];

  const showAvailabilityOnly = query.availability === "in-stock";

  const [priceRange, setPriceRange] = useState({
    from: query.minPrice ? Number(query.minPrice) : MIN_PRICE,
    to: query.maxPrice ? Number(query.maxPrice) : MAX_PRICE,
  });

  const rating = query.rating ? Number(query.rating) : null;
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const weights = filters.weight;
  const types = filters.type;
  const badges = filters.badge;

  const handleRatingChange = (value: number | null) => {
    updateQuery({
      rating: value ? value.toString() : null,
      page: "1",
    });
  };

  const handleWeightChange = (weight: string, checked: boolean) => {
    const next = checked
      ? [...selectedWeights, weight]
      : selectedWeights.filter((w) => w !== weight);

    updateQuery({
      weight: next.length ? next.join(",") : null,
      page: "1",
    });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const next = checked
      ? [...selectedTypes, type]
      : selectedTypes.filter((t) => t !== type);

    updateQuery({
      type: next.length ? next.join(",") : null,
      page: "1",
    });
  };

  const handleBadgeChange = (badge: string, checked: boolean) => {
    const next = checked
      ? [...selectedTypes, badges]
      : selectedTypes.filter((b) => b !== badge);

    updateQuery({
      badge: next.length ? next.join(",") : null,
      page: "1",
    });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    updateQuery({
      availability: checked ? "in-stock" : null,
      page: "1",
    });
  };

  // 1️⃣ At the top level of your component
  useDebounceCallback(
    ({ from, to }: { from: number; to: number }) => {
      const next: Record<string, string | null> = { page: "1" };

      if (from !== MIN_PRICE) next.minPrice = from.toString();
      else next.minPrice = null;

      if (to !== MAX_PRICE) next.maxPrice = to.toString();
      else next.maxPrice = null;

      updateQuery(next);
    },
    priceRange,
    500
  );

  // Handler to update local state only
  const handlePriceChange = (from: number, to: number) => {
    setPriceRange({ from, to });
  };

  const clearFilters = () => {
    updateQuery({
      weight: null,
      type: null,
      availability: null,
      minPrice: null,
      maxPrice: null,
      rating: null,
      badge: null,
      page: "1",
    });

    setPriceRange({ from: MIN_PRICE, to: MAX_PRICE });
  };

  const activeFiltersCount =
    selectedWeights.length +
    selectedTypes.length +
    selectedBadges.length +
    (showAvailabilityOnly ? 1 : 0) +
    (query.minPrice || query.maxPrice ? 1 : 0) +
    (rating ? 1 : 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg text-foreground">Filters</h2>
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedWeights.map((weight) => (
            <Badge
              key={weight}
              variant="secondary"
              className="bg-primary/10 text-primary"
            >
              {weight}
              <button
                type="button"
                title="Remove filter"
                onClick={() => handleWeightChange(weight, false)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedBadges.map((badge) => (
            <Badge
              key={badge}
              variant="secondary"
              className="bg-primary/10 text-primary"
            >
              {badge}
              <button
                type="button"
                title="Remove filter"
                onClick={() => handleBadgeChange(badge, false)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="bg-primary/10 text-primary"
            >
              {type}
              <button
                type="button"
                title="Remove filter"
                onClick={() => handleTypeChange(type, false)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {showAvailabilityOnly && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              In Stock Only
              <button
                type="button"
                title="Remove filter"
                onClick={() => handleAvailabilityChange(false)}
                className="ml-1 hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {(priceRange.from !== MIN_PRICE || priceRange.to !== MAX_PRICE) && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              ${priceRange.from} - ${priceRange.to}
              <button
                type="button"
                title="Remove filter"
                onClick={() => handlePriceChange(MIN_PRICE, MAX_PRICE)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {rating && (
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-700"
            >
              {rating} Stars & Up
              <button
                type="button"
                title="Remove filter"
                onClick={() => handleRatingChange(null)}
                className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Availability */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <BadgeCheck className="size-4" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="in-stock"
              checked={showAvailabilityOnly}
              onCheckedChange={handleAvailabilityChange}
            />
            <Label
              htmlFor="in-stock"
              className="text-sm font-normal cursor-pointer"
            >
              Show in stock only
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>Rating</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-1 mb-1">
            {[1, 2, 3, 4, 5].map((ratingValue) => (
              <Star
                key={ratingValue}
                className={`h-6 w-6 cursor-pointer ${
                  (
                    hoveredRating !== null
                      ? hoveredRating >= ratingValue
                      : rating !== null && rating >= ratingValue
                  )
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoveredRating(ratingValue)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() =>
                  handleRatingChange(
                    ratingValue === rating ? null : ratingValue
                  )
                }
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4" /> Price Range
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between space-x-4">
            <Input
              type="number"
              value={priceRange.from}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), priceRange.to)
              }
              className="w-20"
            />
            <Input
              type="number"
              value={priceRange.to}
              onChange={(e) =>
                handlePriceChange(priceRange.from, Number(e.target.value))
              }
              className="w-20"
            />
          </div>
          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
            value={[priceRange.from, priceRange.to]}
            onValueChange={([from, to]) => handlePriceChange(from, to)}
            className="w-full mt-4 mb-3"
          />
        </CardContent>
      </Card>

      {/* Badge  */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <BadgeCheckIcon className="h-4 w-4" /> Badge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filters.badge.map(({ value, count }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={value}
                checked={(query.badge?.split(",") ?? []).includes(value)}
                onCheckedChange={(checked) => {
                  const next = checked
                    ? [...(query.badge?.split(",") ?? []), value]
                    : (query.badge?.split(",") ?? []).filter(
                        (b) => b !== value
                      );

                  updateQuery({
                    badge: next.length ? next.join(",") : null,
                    page: "1",
                  });
                }}
              />
              <Label
                htmlFor={value}
                className="text-sm font-normal cursor-pointer flex justify-between w-full"
              >
                <span>{value}</span>
                <span className="ml-auto text-muted-foreground">({count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weight Filter */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <Weight className="size-4" />
            Weight
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {weights.map(({ value, count }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={value}
                checked={selectedWeights.includes(value)}
                onCheckedChange={(checked) =>
                  handleWeightChange(value, checked as boolean)
                }
              />
              <Label
                htmlFor={value}
                className="text-sm font-normal cursor-pointer flex justify-between w-full"
              >
                <span>{value}</span>
                <span className="ml-auto text-muted-foreground">({count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Honey Type Filter */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-1">
            <ChartBarStacked className="size-4" />
            Honey Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {types.map(({ value, count }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={value}
                checked={selectedTypes.includes(value)}
                onCheckedChange={(checked) =>
                  handleTypeChange(value, checked as boolean)
                }
              />
              <Label
                htmlFor={value}
                className="text-sm font-normal cursor-pointer flex justify-between w-full"
              >
                <span>{value}</span>
                <span className="ml-auto text-muted-foreground">({count})</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
