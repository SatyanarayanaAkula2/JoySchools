import Gallery from "../../models/Gallery.js";

export async function getGalleryItems() {
  return Gallery.find({}).sort({ createdAt: -1 }).lean();
}

export async function createGalleryItem(data) {
  const item = new Gallery(data);
  await item.save();
  return item;
}

export async function updateGalleryItem(id, data) {
  return Gallery.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteGalleryItem(id) {
  return Gallery.findByIdAndDelete(id);
}
