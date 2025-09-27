"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { productSchema } from "@/lib/shcema/product-schema";

const sortOptions = [
  { title: "Price: Low to High", value: "price:asc" },
  { title: "Price: High to Low", value: "price:desc" },
  { title: "Highest Rated", value: "rating:desc" },
  { title: "Newest First", value: "createdAt:desc" },
  { title: "Name A-Z", value: "name:asc" },
];

export function ProductSort() {
  const { query, updateQuery } = useParsedQuery(productSchema);
  const defaultSort = "createdAt:desc";

  const selectedSort = sortOptions.some((opt) => opt.value === query.sort)
    ? query.sort
    : defaultSort;

  const handleSortChange = (value: string) => {
    updateQuery({
      sort: value,
      page: "1",
    });
  };

  return (
    <Select value={selectedSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-48 bg-background">
        <SelectValue>
          {sortOptions.find((opt) => opt.value === selectedSort)?.title}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
