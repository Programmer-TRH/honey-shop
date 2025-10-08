"use client";

import { useActionState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface ProductImagesProps {
  product: any;
  onChange: (field: string, value: any) => void;
}

export function ProductImages({ product, onChange }: ProductImagesProps) {
  // local drag state using useActionState
  const [dragActive, setDragActiveAction] = useActionState(
    (state, active: boolean) => active,
    false
  );

  const images = product.images || [];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveAction(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveAction(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActiveAction(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const newImages: string[] = [...images];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          const updated = [...newImages, imageUrl];
          onChange("images", updated);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange("images", updated);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Product Images
        </h3>
        <p className="text-sm text-gray-500">Add up to 10 images</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Drag and drop images here</p>
            <p className="text-xs text-gray-500">or click to browse</p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Choose Files
          </Button>
          <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="space-y-3">
          <Label>Uploaded Images</Label>
          <div className="grid grid-cols-2 gap-3">
            {images.map((image: string, index: number) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
