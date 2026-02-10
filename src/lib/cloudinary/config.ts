// Cloudinary configuration for image uploads
// Using next-cloudinary for optimized image delivery

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
};

// Upload presets for different image types
export const uploadPresets = {
  vendorProfile: 'wedding_vendor_profile',
  vendorGallery: 'wedding_vendor_gallery',
  coupleProfile: 'wedding_couple_profile',
  reviews: 'wedding_reviews',
  categories: 'wedding_categories',
};

// Cloudinary transformation options
export const transformations = {
  thumbnail: {
    width: 150,
    height: 150,
    crop: 'fill',
    quality: 'auto',
  },
  card: {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
  },
  gallery: {
    width: 800,
    height: 600,
    crop: 'fill',
    quality: 'auto',
  },
  hero: {
    width: 1920,
    height: 1080,
    crop: 'fill',
    quality: 'auto',
  },
  avatar: {
    width: 100,
    height: 100,
    crop: 'fill',
    radius: 'max',
    quality: 'auto',
  },
};

// Generate Cloudinary URL with transformations
export const getCloudinaryUrl = (
  publicId: string,
  transformation: keyof typeof transformations = 'card'
): string => {
  const cloudName = cloudinaryConfig.cloudName;
  const t = transformations[transformation];
  
  const transformString = Object.entries(t)
    .map(([key, value]) => {
      const keyMap: Record<string, string> = {
        width: 'w',
        height: 'h',
        crop: 'c',
        quality: 'q',
        radius: 'r',
      };
      return `${keyMap[key] || key}_${value}`;
    })
    .join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`;
};

// Upload image to Cloudinary (client-side unsigned upload)
export const uploadToCloudinary = async (
  file: File,
  folder: string = 'wedding-bazaar'
): Promise<{ publicId: string; url: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'wedding_unsigned'); // Create this preset in Cloudinary dashboard
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return {
    publicId: data.public_id,
    url: data.secure_url,
  };
};

// Delete image from Cloudinary (requires server-side with API secret)
// This should be called from an API route
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  // This will be implemented in the API route
  const response = await fetch('/api/cloudinary/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicId }),
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
};
