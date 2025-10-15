"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
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

export default function ProductTableToolbar({ filters }: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock");
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        {/* Top row - Search and dropdowns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {filters.category.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Select Availabitly" />
            </SelectTrigger>
            <SelectContent>
              {filters.availability.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bottom row - Price range and actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Price:</span>
            <Input placeholder="Min" className="w-20" />
            <span className="text-gray-400">-</span>
            <Input placeholder="Max" className="w-20" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
