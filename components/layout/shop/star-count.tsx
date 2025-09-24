import { Star } from "lucide-react";
import React from "react";

export default function StarCount() {
  return (
    <div className="flex justify-center items-center space-x-2 mb-8">
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-primary text-primary" />
        ))}
      </div>
      <span className="text-lg font-semibold text-gray-700">4.9</span>
      <span className="text-gray-500">(1,200+ reviews)</span>
    </div>
  );
}
