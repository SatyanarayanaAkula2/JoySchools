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
 * Uploads a file buffer to Cloudinary with smart compression, format optimization,
 * and dimension scaling to minimize storage while preserving high visual quality.
 * @param {Buffer} buffer - File buffer.
 * @param {string} folder - Target folder.
 * @param {object} options - Optional overrides for transformations.
 * @returns {Promise<string>} Secure URL of uploaded image.
 */
export async function uploadImage(buffer, folder = "joyschools", options = {}) {
  if (!buffer) return null;

  configureCloudinary();

  return new Promise((resolve, reject) => {
    try {
      const uploadOptions = {
        folder,
        resource_type: "image",
        format: options.format || "webp", // Automatically store as lightweight, high-fidelity WebP
        transformation: [
          {
            width: options.width || 1600,
            height: options.height || 1600,
            crop: "limit", // Scale down only if image is larger than 1600px to avoid storage bloat
            quality: "auto:good", // Perceptual quality compression (saves 60-80% file size without visual loss)
            fetch_format: "auto", // Client-side format negotiation
            flags: "strip_profile", // Strips bulky camera EXIF/GPS metadata
          },
        ],
        ...options,
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
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
