"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

export default function StudentForm({ student, onClose, onSave }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);

  const isEdit = !!student;

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setClassName(student.className || "");
      setRollNumber(student.rollNumber || "");
      setGuardianName(student.guardianName || "");
      setGuardianPhone(student.guardianPhone || "");
      setStatus(student.status || "Active");
    }
  }, [student]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      _id: student?._id || `stud_${Math.random().toString(36).substr(2, 9)}`,
      name,
      className,
      rollNumber,
      guardianName,
      guardianPhone,
      status,
    };

    // Simulate network delay for premium visual loading states
    setTimeout(() => {
      onSave(payload);
      onClose();
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-850">
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
            {isEdit ? "Edit Student Details" : "Register New Student"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-450 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Class Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Class / Section *
              </label>
              <input
                type="text"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. 10A, 5B, UKG"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Roll Number
              </label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. 24"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Guardian Name */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Guardian Name
              </label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Father or Mother name"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Guardian Phone */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Guardian Phone
              </label>
              <input
                type="tel"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Status */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Registration Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-100 dark:border-zinc-850 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-950 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-xl hover:bg-accent transition-all duration-200 shadow-md shadow-primary/10 flex items-center space-x-1.5"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isEdit ? "Update Details" : "Register Student"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
