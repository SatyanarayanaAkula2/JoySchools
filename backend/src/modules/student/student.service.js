import Student from "../../models/Student.js";

export async function getStudents({ search = "", className = "" } = {}) {
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
  return Student.findById(id).lean();
}

export async function createStudent(data) {
  const student = new Student(data);
  await student.save();
  return student;
}

export async function updateStudent(id, data) {
  return Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteStudent(id) {
  return Student.findByIdAndDelete(id);
}
