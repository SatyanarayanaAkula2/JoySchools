"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/utils/compressImage";

export default function FacultyForm({ faculty, onClose, onSave }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const isEdit = !!faculty;

  useEffect(() => {
    if (faculty) {
      setName(faculty.name || "");
      setRole(faculty.role || "");
      setQualification(faculty.qualification || "");
      setExperience(faculty.experience || "");
      setEmail(faculty.email || "");
      setOrder(faculty.order || 0);
      setImagePreview(faculty.image || "");
    }
  }, [faculty]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const optimized = await compressImage(file);
      setImageFile(optimized);
      // Create local URL for browser render
      const localUrl = URL.createObjectURL(optimized);
      setImagePreview(localUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name,
      role,
      qualification,
      experience,
      email,
      order: Number(order) || 0,
      imageFile,
      existingImage: faculty?.image || "",
    };

    if (faculty?._id) {
      payload._id = faculty._id;
    }

    try {
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-850">
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
            {isEdit ? "Edit Mentor Profile" : "Register New Faculty"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-450 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Preview & Upload */}
            <div className="sm:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-950 text-center">
              {imagePreview ? (
                <div className="relative w-28 h-32 rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-zinc-800 shadow-sm">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-450 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
              )}
              <label className="cursor-pointer bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-350 shadow-sm transition-all duration-200">
                Choose Local Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-450 mt-2">
                Supports standard formats (JPG, PNG, WEBP). Works fully in-browser.
              </p>
            </div>

            {/* Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Faculty Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dr. Satish Kumar"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Designation / Role *
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Science Lead, Senior Teacher"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Qualifications *
              </label>
              <input
                type="text"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. M.Sc, B.Ed"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Experience
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 12+ Years Experience"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@school.com"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Order */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Display Order Priority
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Low numbers display first (e.g. 0, 1, 2)"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
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
              <span>{isEdit ? "Update Profile" : "Register Faculty"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
