import Faculty from "../../models/Faculty.js";

export async function getFaculty() {
  return Faculty.find({}).sort({ order: 1, name: 1 }).lean();
}

export async function createFaculty(data) {
  const faculty = new Faculty(data);
  await faculty.save();
  return faculty;
}

export async function updateFaculty(id, data) {
  return Faculty.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteFaculty(id) {
  return Faculty.findByIdAndDelete(id);
}
