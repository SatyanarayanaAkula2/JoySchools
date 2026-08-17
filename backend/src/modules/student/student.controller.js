import * as studentService from "./student.service.js";

export async function fetchStudents(req, res) {
  try {
    const { search = "", className = "" } = req.query;
    const students = await studentService.getStudents({ search, className });
    return res.status(200).json({ success: true, students });
  } catch (error) {
    console.error("fetchStudents controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch students" });
  }
}

export async function addStudent(req, res) {
  try {
    const student = await studentService.createStudent(req.validatedBody);
    return res.status(201).json({ success: true, student });
  } catch (error) {
    console.error("addStudent controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to create student" });
  }
}

export async function editStudent(req, res) {
  try {
    const { id } = req.params;
    const student = await studentService.updateStudent(id, req.validatedBody);
    if (!student) {
      return res.status(404).json({ success: false, error: "Student not found" });
    }
    return res.status(200).json({ success: true, student });
  } catch (error) {
    console.error("editStudent controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to update student" });
  }
}

export async function removeStudent(req, res) {
  try {
    const { id } = req.params;
    await studentService.deleteStudent(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("removeStudent controller error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete student" });
  }
}
