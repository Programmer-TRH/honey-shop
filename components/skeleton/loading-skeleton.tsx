import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-pulse w-full">
      {/* Spinner Circle */}
      <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="text-gray-500 font-medium">Fetching products...</p>

      {/* Skeleton bars */}
      <div className="w-48 h-2 bg-gray-200 rounded"></div>
      <div className="w-40 h-2 bg-gray-200 rounded"></div>
      <div className="w-32 h-2 bg-gray-200 rounded"></div>
    </div>
  );
}
