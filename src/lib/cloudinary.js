import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Uploads a file (from FormData) to Cloudinary.
 * @param {File} file - The file to upload.
 * @param {string} folder - The Cloudinary folder target.
 * @returns {Promise<string>} The uploaded image secure URL.
 */
export async function uploadImage(file, folder = "joyschools") {
  if (!file || !(file instanceof File) || file.size === 0) {
    return null;
  }
  
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
}
