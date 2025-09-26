"use client";
import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { useDebounceCallback } from "@/hooks/use-debounce";
import { searchSchema } from "@/lib/shcema/search-schema";

export function SearchBar() {
  const { query, updateQuery } = useParsedQuery(searchSchema);
  const [inputValue, setInputValue] = useState(query.q || "");

  useDebounceCallback(
    (debouncedValue: string) => {
      updateQuery({
        q: debouncedValue.trim() || null,
        page: "1",
      });
    },
    inputValue,
    500
  );

  // Input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  // Clear search
  const clearSearch = useCallback(() => {
    setInputValue("");
    updateQuery({ q: null, page: "1" });
  }, [updateQuery]);

  // Submit on Enter
  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateQuery({ q: inputValue.trim() || null, page: "1" });
    },
    [inputValue, updateQuery]
  );

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search honey varieties, types..."
          value={inputValue}
          onChange={handleInputChange}
          className="pl-10 pr-10 py-3 text-base border-2 focus:border-primary transition-colors duration-150"
        />
        {inputValue && (
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
