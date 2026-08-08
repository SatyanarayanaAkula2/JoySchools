import dbConnect from "@/lib/mongodb";
import Faculty from "@/models/Faculty";

export async function getFaculty() {
  await dbConnect();
  return Faculty.find({}).sort({ order: 1, name: 1 }).lean();
}

export async function getFacultyById(id) {
  await dbConnect();
  return Faculty.findById(id).lean();
}

export async function createFaculty(data) {
  await dbConnect();
  const faculty = new Faculty(data);
  await faculty.save();
  return faculty;
}

export async function updateFaculty(id, data) {
  await dbConnect();
  const updated = await Faculty.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

export async function deleteFaculty(id) {
  await dbConnect();
  return Faculty.findByIdAndDelete(id);
}
