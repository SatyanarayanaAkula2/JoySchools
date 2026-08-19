import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary
const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

/**
 * Uploads a file buffer to Cloudinary.
 * @param {Buffer} buffer - File buffer.
 * @param {string} folder - Target folder.
 * @returns {Promise<string>} Secure URL of uploaded image.
 */
export async function uploadImage(buffer, folder = "joyschools") {
  if (!buffer) return null;

  configureCloudinary();

  return new Promise((resolve, reject) => {
    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );

      uploadStream.on("error", (err) => {
        console.error("Cloudinary upload stream error event:", err);
        reject(err);
      });

      uploadStream.end(buffer);
    } catch (err) {
      console.error("Cloudinary upload synchronous error:", err);
      reject(err);
    }
  });
}

export default cloudinary;
