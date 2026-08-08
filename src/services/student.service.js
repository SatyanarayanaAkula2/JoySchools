import dbConnect from "@/lib/mongodb";
import Student from "@/models/Student";

export async function getStudents({ search = "", className = "" } = {}) {
  await dbConnect();
  
  const query = {};
  
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  
  if (className && className !== "All") {
    query.className = className;
  }
  
  return Student.find(query).sort({ className: 1, name: 1 }).lean();
}

export async function getStudentById(id) {
  await dbConnect();
  return Student.findById(id).lean();
}

export async function createStudent(data) {
  await dbConnect();
  const student = new Student(data);
  await student.save();
  return student;
}

export async function updateStudent(id, data) {
  await dbConnect();
  const updated = await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updated;
}

export async function deleteStudent(id) {
  await dbConnect();
  return Student.findByIdAndDelete(id);
}
