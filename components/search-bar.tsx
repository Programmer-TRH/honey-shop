"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onSearchChange?: (query: string) => void
}

export function SearchBar({ onSearchChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearchChange?.(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onSearchChange])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearchChange?.(searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearchChange?.("")
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search honey varieties, types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 py-3 text-base border-2 focus:border-primary"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </form>
  )
}
