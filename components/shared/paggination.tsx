"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParsedQuery } from "@/hooks/useParsedQuery";
import { productSchema } from "@/lib/shcema/product-schema";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const { updateQuery } = useParsedQuery(productSchema);
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxMiddlePages = 5;
    const startPage = Math.max(2, currentPage - Math.floor(maxMiddlePages / 2));
    const endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(maxMiddlePages / 2)
    );

    pages.push(1); // first page

    if (startPage > 2) pages.push("…"); // left ellipsis

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("…"); // right ellipsis

    pages.push(totalPages); // last page

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => updateQuery({ page: (currentPage - 1).toString() })}
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="w-10"
              onClick={() => updateQuery({ page: page.toString() })}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="w-10 text-center select-none">
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => updateQuery({ page: (currentPage + 1).toString() })}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
