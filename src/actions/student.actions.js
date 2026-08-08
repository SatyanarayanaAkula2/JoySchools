"use server";

import { revalidatePath } from "next/cache";
import { studentSchema } from "@/validators/student.validators";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/services/student.service";
import { getCurrentAdmin } from "./auth.actions";

/**
 * Helper to ensure the caller is authenticated as an admin.
 */
async function verifyAuth() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error("Unauthorized. Please log in.");
  }
}

export async function fetchStudents(filters) {
  try {
    await verifyAuth();
    const list = await getStudents(filters);
    return JSON.parse(JSON.stringify(list));
  } catch (error) {
    console.error("fetchStudents action error:", error);
    throw new Error(error.message || "Failed to fetch students");
  }
}

export async function addStudent(data) {
  try {
    await verifyAuth();
    const validated = studentSchema.parse(data);
    const student = await createStudent(validated);
    revalidatePath("/admin/students");
    return { success: true, student: JSON.parse(JSON.stringify(student)) };
  } catch (error) {
    console.error("addStudent action error:", error);
    return { success: false, error: error.message || "Failed to add student" };
  }
}

export async function editStudent(id, data) {
  try {
    await verifyAuth();
    const validated = studentSchema.parse(data);
    const student = await updateStudent(id, validated);
    revalidatePath("/admin/students");
    return { success: true, student: JSON.parse(JSON.stringify(student)) };
  } catch (error) {
    console.error("editStudent action error:", error);
    return { success: false, error: error.message || "Failed to update student" };
  }
}

export async function removeStudent(id) {
  try {
    await verifyAuth();
    await deleteStudent(id);
    revalidatePath("/admin/students");
    return { success: true };
  } catch (error) {
    console.error("removeStudent action error:", error);
    return { success: false, error: error.message || "Failed to delete student" };
  }
}
