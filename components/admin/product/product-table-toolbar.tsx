"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Filter, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParsedQuery } from "@/hooks/useParsedQuery"; // adjust import path
import { z } from "zod";
import { SearchBar } from "@/components/layout/shop/search-bar";

interface FilterValue {
  value: string;
  count: number;
}

interface FiltersProps {
  filters: {
    category: FilterValue[];
    availability: FilterValue[];
  };
}

// ✅ Define your query schema (for type-safe validation)
const productSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  availability: z.string().optional(),
  page: z.string().optional(),
});

export default function ProductTableToolbar({ filters }: FiltersProps) {
  // 🧠 Get parsed query + updater
  const { query, updateQuery } = useParsedQuery(productSchema);

  // 🧩 Local states for UI
  const [categoryFilter, setCategoryFilter] = useState(
    query.category || "All Categories"
  );
  const [stockFilter, setStockFilter] = useState(
    query.availability || "All Stock"
  );

  // 🎛️ Category filter
  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    updateQuery({
      category: value !== "All Categories" ? value : null,
      page: "1",
    });
  };

  // 🎚️ Stock filter
  const handleStockChange = (value: string) => {
    setStockFilter(value);
    updateQuery({
      availability: value !== "All Stock" ? value : null,
      page: "1",
    });
  };

  // ♻️ Reset all filters
  const handleReset = () => {
    setCategoryFilter("All Categories");
    setStockFilter("All Stock");
    updateQuery({
      search: null,
      category: null,
      availability: null,
      page: "1",
    });
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {/* 🔍 Search */}

        <SearchBar
          className="col-span-2 w-full"
          placeholder="Search products..."
        />

        {/* 🏷️ Category Filter */}
        <Select value={categoryFilter} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Categories">All Categories</SelectItem>
            {filters?.category?.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.value} ({cat.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 📦 Availability Filter */}
        <Select value={stockFilter} onValueChange={handleStockChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All Stock">All Stock</SelectItem>
            {filters.availability.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.value} ({filter.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* ⚙️ Actions */}
        <div className="flex gap-2 w-full items-center md:justify-end">
          <Button
            variant="outline"
            size="icon"
            onClick={() => alert("Open advanced filters soon...")}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
