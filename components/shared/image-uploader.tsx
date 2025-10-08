"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader as Loader2 } from "lucide-react";
import Image from "next/image";

interface CloudinaryUploadProps {
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  cloudName: string;
  uploadPreset: string;
}

interface UploadedImage {
  url: string;
  publicId: string;
}

export default function CloudinaryUpload({
  onImagesChange,
  maxImages = 10,
  cloudName,
  uploadPreset,
}: CloudinaryUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = async (file: File): Promise<UploadedImage> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  };

  const deleteFromCloudinary = async (publicId: string): Promise<void> => {
    try {
      const response = await fetch("/api/cloudinary-delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      throw error;
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    setUploading(true);

    try {
      const uploadPromises = filesToUpload.map((file) =>
        uploadToCloudinary(file)
      );
      const uploadedImages = await Promise.all(uploadPromises);

      const newImages = [...images, ...uploadedImages];
      setImages(newImages);
      onImagesChange(newImages.map((img) => img.url));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = async (index: number) => {
    const imageToRemove = images[index];

    try {
      await deleteFromCloudinary(imageToRemove.publicId);

      const newImages = images.filter((_, i) => i !== index);
      setImages(newImages);
      onImagesChange(newImages.map((img) => img.url));
    } catch (error) {
      alert("Failed to delete image from Cloudinary. Please try again.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400 bg-gray-50"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            disabled={uploading || images.length >= maxImages}
          />

          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 animate-spin" />
            ) : (
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <Upload className="w-6 h-6 sm:w-7 sm:h-7 text-gray-400" />
              </div>
            )}

            <div>
              <p className="text-sm sm:text-base font-medium text-gray-700 mb-1">
                {uploading
                  ? "Uploading..."
                  : "Drop images here or click to upload"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                PNG, JPG up to 10MB • {images.length} / {maxImages} uploaded
              </p>
            </div>

            {!uploading && images.length < maxImages && (
              <button
                type="button"
                onClick={handleButtonClick}
                className="mt-2 px-4 sm:px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Choose Files
              </button>
            )}
          </div>
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <div
              key={image.publicId}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={image.url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform hover:scale-110"
                  title="Remove image"
                >
                  <X size={18} />
                </button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded shadow">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="flex flex-col items-center justify-center gap-2 text-gray-400 py-8 bg-gray-50 rounded-xl border border-gray-200">
          <ImageIcon size={28} className="opacity-50" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
