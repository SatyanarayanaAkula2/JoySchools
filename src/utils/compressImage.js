/**
 * Client-side image compression utility.
 * Downscales dimensions if exceeding maxWidth/maxHeight and compresses quality
 * to reduce file size from multi-megabyte raw photos down to ~200-400 KB
 * without perceptible quality loss.
 *
 * @param {File|Blob} file - The raw image file from file input
 * @param {number} maxWidth - Maximum width (default: 1920)
 * @param {number} maxHeight - Maximum height (default: 1920)
 * @param {number} quality - Compression quality between 0.0 and 1.0 (default: 0.82)
 * @returns {Promise<File>} - Optimized lightweight File object
 */
export async function compressImage(
  file,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.82
) {
  if (!file || typeof window === "undefined" || !file.type?.startsWith("image/")) {
    return file;
  }

  // If file is already very small (< 250 KB), skip re-compression
  if (file.size <= 250 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return resolve(file);
        }

        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP or standard JPEG
        const outputType = file.type === "image/png" ? "image/webp" : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // Return original if compressed blob is unexpectedly larger
              resolve(file);
            } else {
              const extension = outputType === "image/webp" ? ".webp" : ".jpg";
              const cleanName = file.name.replace(/\.[^/.]+$/, "") + extension;
              const optimizedFile = new File([blob], cleanName, {
                type: outputType,
                lastModified: Date.now(),
              });
              resolve(optimizedFile);
            }
          },
          outputType,
          quality
        );
      };

      img.onerror = () => resolve(file);
      img.src = event.target?.result;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
