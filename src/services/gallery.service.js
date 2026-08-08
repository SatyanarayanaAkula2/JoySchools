import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";

export async function getGalleryItems({ album = "" } = {}) {
  await dbConnect();
  const query = {};
  if (album && album !== "All") {
    query.album = album;
  }
  return Gallery.find(query).sort({ createdAt: -1 }).lean();
}

export async function getGalleryItemById(id) {
  await dbConnect();
  return Gallery.findById(id).lean();
}

export async function createGalleryItem(data) {
  await dbConnect();
  const item = new Gallery(data);
  await item.save();
  return item;
}

export async function updateGalleryItem(id, data) {
  await dbConnect();
  const updated = await Gallery.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

export async function deleteGalleryItem(id) {
  await dbConnect();
  return Gallery.findByIdAndDelete(id);
}
