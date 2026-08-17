"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Edit2, Trash2, Filter, UserPlus, Loader2 } from "lucide-react";
import StudentForm from "./StudentForm";



export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize and load from Express backend
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetch("/api/students");
        const data = await response.json();
        if (data.success) {
          setStudents(data.students || []);
        }
      } catch (err) {
        console.error("Failed to load students:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  // Filter students locally in memory
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
      const matchesClass = classFilter === "All" || student.className === classFilter;
      return matchesSearch && matchesClass;
    });
  }, [students, search, classFilter]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this student registration?")) {
      try {
        const response = await fetch(`/api/students/${id}`, { method: "DELETE" });
        const res = await response.json();
        if (res.success) {
          setStudents((prev) => prev.filter((s) => s._id !== id));
        } else {
          alert(res.error || "Failed to delete student registration");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete student registration");
      }
    }
  };

  const handleSave = async (savedStudent) => {
    try {
      const isEdit = !!savedStudent._id;
      let response;
      if (isEdit) {
        response = await fetch(`/api/students/${savedStudent._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedStudent),
        });
      } else {
        response = await fetch("/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedStudent),
        });
      }
      const data = await response.json();
      if (data.success) {
        setStudents((prev) => {
          if (isEdit) {
            return prev.map((s) => (s._id === savedStudent._id ? data.student : s));
          } else {
            return [data.student, ...prev];
          }
        });
      } else {
        alert(data.error || "Failed to save student details");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedStudent(null);
    setIsFormOpen(true);
  };

  const classesList = ["All", "10A", "10B", "9A", "9B", "8A", "8B", "7A", "6A", "5A", "4A", "3A", "2A", "1A", "LKG", "UKG"];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        {/* Search & Filter Inputs */}
        <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
            />
          </div>

          {/* Class Filter */}
          <div className="relative w-full sm:max-w-xs flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
            >
              {classesList.map((cls) => (
                <option key={cls} value={cls}>
                  Class {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Student Button */}
        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Register Student</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl overflow-hidden shadow-md">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Querying database records...</span>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-20 text-center text-slate-400 text-sm">
            No student records found matching the active filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-850">
                  <th className="px-6 py-4">Roll No</th>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Class</th>
                  <th className="px-6 py-4">Guardian Contact</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                {filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-600 dark:text-zinc-450 text-sm">
                      {student.rollNumber || "--"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        {student.className}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-650 dark:text-zinc-400 text-sm">
                      <div className="font-bold">{student.guardianName || "--"}</div>
                      <div className="text-xs text-slate-400">{student.guardianPhone || ""}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          student.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
                            : "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-2 rounded-xl text-slate-450 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                          title="Edit Student"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition-all duration-200"
                          title="Delete Student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isFormOpen && (
        <StudentForm
          student={selectedStudent}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
