"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, Loader2, Mail, Award } from "lucide-react";
import FacultyForm from "./FacultyForm";
import Image from "next/image";

export default function FacultyTable() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize and load from Express backend
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const response = await fetch("/api/faculty");
        const data = await response.json();
        if (data.success) {
          setFacultyList(data.faculty || []);
        }
      } catch (err) {
        console.error("Failed to load faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFaculty();
  }, []);

  // Sort faculty list by display priority index
  const sortedFacultyList = useMemo(() => {
    return [...facultyList].sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.name.localeCompare(b.name);
    });
  }, [facultyList]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to remove this faculty profile?")) {
      try {
        const response = await fetch(`/api/faculty/${id}`, { method: "DELETE" });
        const res = await response.json();
        if (res.success) {
          setFacultyList((prev) => prev.filter((f) => f._id !== id));
        } else {
          alert(res.error || "Failed to delete faculty member");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete faculty member");
      }
    }
  };

  const handleSave = async (savedFac) => {
    try {
      const isEdit = !!savedFac._id;
      
      const formData = new FormData();
      formData.append("name", savedFac.name);
      formData.append("role", savedFac.role);
      formData.append("qualification", savedFac.qualification);
      formData.append("experience", savedFac.experience);
      formData.append("email", savedFac.email);
      formData.append("order", savedFac.order);
      
      if (savedFac.imageFile) {
        formData.append("imageFile", savedFac.imageFile);
      } else {
        formData.append("existingImage", savedFac.existingImage);
      }

      let response;
      if (isEdit) {
        response = await fetch(`/api/faculty/${savedFac._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("/api/faculty", {
          method: "POST",
          body: formData,
        });
      }
      
      const data = await response.json();
      if (data.success) {
        setFacultyList((prev) => {
          if (isEdit) {
            return prev.map((f) => (f._id === savedFac._id ? data.faculty : f));
          } else {
            return [data.faculty, ...prev];
          }
        });
      } else {
        alert(data.error || "Failed to save faculty member");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const handleEditClick = (fac) => {
    setSelectedFaculty(fac);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedFaculty(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        <p className="text-slate-450 dark:text-zinc-400 text-sm font-semibold hidden md:block">
          Manage mentors showing on the homepage. Sorted by Display Order.
        </p>
        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center space-x-2 ml-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Register Faculty</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl overflow-hidden shadow-md">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Querying database records...</span>
          </div>
        ) : sortedFacultyList.length === 0 ? (
          <div className="p-20 text-center text-slate-400 text-sm">
            No faculty members registered in the system yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-850">
                  <th className="px-6 py-4 w-20">Photo</th>
                  <th className="px-6 py-4">Mentor Name</th>
                  <th className="px-6 py-4">Role / Qualification</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4 w-28 text-center">Display Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                {sortedFacultyList.map((fac) => (
                  <tr
                    key={fac._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {fac.image ? (
                        <div className="relative w-11 h-14 rounded-lg overflow-hidden border border-slate-150 dark:border-zinc-800">
                          <Image
                            src={fac.image}
                            alt={fac.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-11 h-14 bg-slate-100 dark:bg-zinc-850 rounded-lg flex items-center justify-center text-slate-450 border border-slate-200 dark:border-zinc-800 font-semibold text-xs text-center p-1">
                          No Photo
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {fac.name}
                      </div>
                      {fac.email && (
                        <div className="flex items-center text-xs text-slate-400 mt-1">
                          <Mail className="h-3 w-3 mr-1 text-slate-450" />
                          <span>{fac.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-bold text-slate-700 dark:text-zinc-350">{fac.role}</div>
                      <div className="flex items-center text-xs text-slate-450 mt-1">
                        <Award className="h-3 w-3 mr-1 text-accent" />
                        <span>{fac.qualification}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-650 dark:text-zinc-400 text-sm">
                      {fac.experience || "--"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-350">
                        {fac.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(fac)}
                          className="p-2 rounded-xl text-slate-450 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                          title="Edit Faculty Profile"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(fac._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-450 transition-all duration-200"
                          title="Delete Faculty Profile"
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
        <FacultyForm
          faculty={selectedFaculty}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
