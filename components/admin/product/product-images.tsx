import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Plus,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Star,
  Move,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ProductImagesProps {
  form: UseFormReturn<any>;
}

export function ProductImages({ form }: ProductImagesProps) {
  const { setValue, watch } = form;
  const [imageUrl, setImageUrl] = useState("");
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  const images = watch("images") || [];

  const addImageFromUrl = () => {
    if (imageUrl.trim() && !images.includes(imageUrl.trim())) {
      const newImages = [...images, imageUrl.trim()];
      setValue("images", newImages);
      setImageUrl("");
      toast.success("Image added successfully!");
    } else if (images.includes(imageUrl.trim())) {
      toast.error("This image URL is already added");
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_: string, i: number) => i !== index);
    setValue("images", newImages);

    // Adjust primary image index if needed
    if (primaryImageIndex >= newImages.length) {
      setPrimaryImageIndex(Math.max(0, newImages.length - 1));
    }

    toast.success("Image removed");
  };

  const setPrimaryImage = (index: number) => {
    setPrimaryImageIndex(index);

    // Move the selected image to the first position
    const newImages = [...images];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);
    setValue("images", newImages);
    setPrimaryImageIndex(0);

    toast.success("Primary image updated");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate file upload - in real app, you'd upload to your storage service
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          if (dataUrl && !images.includes(dataUrl)) {
            const newImages = [...images, dataUrl];
            setValue("images", newImages);
            toast.success(`${file.name} uploaded successfully!`);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Product Images
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Add high-quality images of your product. The first image will be used
          as the primary image.
        </p>
      </div>

      {/* Upload Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Images</span>
            </CardTitle>
            <CardDescription>Upload images from your device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Click to upload images
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB each
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LinkIcon className="h-5 w-5" />
              <span>Add from URL</span>
            </CardTitle>
            <CardDescription>Add images using URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addImageFromUrl();
                    }
                  }}
                />
              </div>
              <Button
                type="button"
                onClick={addImageFromUrl}
                disabled={!imageUrl.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Product Images ({images.length})</span>
              <Badge variant="outline">{images.length} / 10 images</Badge>
            </CardTitle>
            <CardDescription>
              Drag to reorder images. Click the star to set as primary image.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {images.map((image: string, index: number) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-300 transition-colors">
                    <Image
                      width="720"
                      height={480}
                      src={image}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Primary Image Badge */}
                  {index === 0 && (
                    <Badge className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Primary
                    </Badge>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index !== 0 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => setPrimaryImage(index)}
                        className="p-1 h-6 w-6"
                        title="Set as primary image"
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => removeImage(index)}
                      className="p-1 h-6 w-6"
                      title="Remove image"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Image Index */}
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="secondary" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-medium text-blue-900">Image Guidelines</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use high-resolution images (at least 1000x1000 pixels)</li>
              <li>• Square aspect ratio works best for consistency</li>
              <li>• Show your product from multiple angles</li>
              <li>• Use good lighting and clean backgrounds</li>
              <li>
                • First image will be displayed as the primary product image
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {images.length === 0 && (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">
                No images added yet
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Add at least one image to showcase your product
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
