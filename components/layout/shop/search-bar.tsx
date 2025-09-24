"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { useDebounce } from "@/hooks/use-debounce";
import { searchSchema } from "@/lib/shcema/search-schema";

export function SearchBar() {
  const { query, updateQuery } = useParsedQuery(searchSchema);
  const [searchQuery, setSearchQuery] = useState(query.q || "");
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    updateQuery({
      q: debouncedQuery.trim() || null,
      page: "1",
    });
  }, [debouncedQuery, updateQuery]);

  useEffect(() => {
    if (query.q !== searchQuery) {
      setSearchQuery(query.q || "");
    }
  }, [query.q]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    updateQuery({ q: null, page: "1" });
  }, [updateQuery]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateQuery({
        q: searchQuery.trim() || null,
        page: "1",
      });
    },
    [searchQuery, updateQuery]
  );

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search honey varieties, types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 py-3 text-base border-2 focus:border-primary transition-colors duration-150"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            title="Clear Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-150"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </form>
  );
}
