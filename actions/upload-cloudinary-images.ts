"use server";

export interface UploadedImage {
  url: string;
  public_id: string;
}

export async function uploadCloudinaryImage(
  file: File
): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Upload failed: ${text}`);
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
}
