"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/types/product";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreVertical,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductsTable({ products }: { products: Product[] }) {
  console.log("Products:", products);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: "Out of Stock", color: "destructive" };
    if (stock <= 10) return { label: "Low Stock", color: "warning" };
    return { label: "In Stock", color: "success" };
  };

  const getStockBadgeClass = (stock: number) => {
    if (stock === 0) return "bg-red-100 text-red-700 hover:bg-red-100";
    if (stock <= 10) return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    return "bg-green-100 text-green-700 hover:bg-green-100";
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "Active")
      return "bg-green-100 text-green-700 hover:bg-green-100";
    if (status === "Inactive")
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
  };

  return (
    <>
      {selectedProducts.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} product
              {selectedProducts.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Bulk Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === products.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-24">Product ID</TableHead>
                <TableHead className="min-w-[250px]">Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-gray-600">
                      {product.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.productName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.shortDescription}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          product.category === "Electronics"
                            ? "bg-purple-100 text-purple-700 hover:bg-purple-100"
                            : product.category === "Clothing"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            : product.category === "Home & Garden"
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                            : product.category === "Sports"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={getStockBadgeClass(product.stock)}
                        >
                          {stockStatus.label}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {product.stock}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusBadgeClass(product.availability)}
                      >
                        {product.availability}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem>Archive</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-between gap-4 border-t p-4 sm:flex-row">
          <p className="text-sm text-gray-600">
            Showing 1 to {products.length} of {products.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>
            <div className="flex gap-1">
              <Button
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <span className="flex items-center px-2 text-gray-400">...</span>
              <Button variant="outline" size="sm">
                50
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
