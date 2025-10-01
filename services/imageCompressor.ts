
const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const MIME_TYPE = "image/webp";
const QUALITY = 0.8;

/**
 * Compresses an image file by resizing and converting it to WebP format.
 * @param file The image file to compress.
 * @returns A promise that resolves with the compressed image as a Blob.
 */
export const compressImage = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const blobURL = URL.createObjectURL(file);
    const img = new Image();
    img.src = blobURL;
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Cannot load image"));
    };
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob conversion failed"));
          }
        },
        MIME_TYPE,
        QUALITY
      );
    };
  });
};

function calculateSize(img: HTMLImageElement, maxWidth: number, maxHeight: number) {
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

/**
 * Converts a File or Blob object to a Base64 encoded data URL.
 * @param file The file or blob to convert.
 * @returns A promise that resolves with the data URL string.
 */
export const fileToDataUrl = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};
