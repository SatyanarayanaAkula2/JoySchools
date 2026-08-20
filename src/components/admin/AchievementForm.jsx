"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/utils/compressImage";

export default function AchievementForm({ achievement, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academic Excellence");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!achievement;

  useEffect(() => {
    if (achievement) {
      setTitle(achievement.title || "");
      setCategory(achievement.category || "Academic Excellence");
      setYear(achievement.year || "");
      setDescription(achievement.description || "");
      setImagePreview(achievement.image || "");
    }
  }, [achievement]);

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const optimized = await compressImage(file);
      setImageFile(optimized);
      const localUrl = URL.createObjectURL(optimized);
      setImagePreview(localUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title,
      category,
      year,
      description,
      imageFile,
      existingImage: achievement?.image || "",
    };

    if (achievement?._id) {
      payload._id = achievement._id;
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


  const categories = [
    "Academic Excellence",
    "Sports & Athletics",
    "Environmental Leadership",
    "Arts & Culture",
    "Other",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-850">
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
            {isEdit ? "Edit Milestone details" : "Add Award / Milestone"}
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
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Achievement Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. State Science Exhibition Winner"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Academic Year *
              </label>
              <input
                type="text"
                required
                list="achievement-years-list"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2025 - 2026 or 2025"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
              <datalist id="achievement-years-list">
                {[
                  "2026 - 2027",
                  "2025 - 2026",
                  "2024 - 2025",
                  "2023 - 2024",
                  "2022 - 2023",
                  "2021 - 2022",
                  "2020 - 2021",
                  "2019 - 2020",
                  "2018 - 2019",
                  "2017 - 2018",
                  "2016 - 2017",
                  "2026",
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                ].map((yr) => (
                  <option key={yr} value={yr} />
                ))}
              </datalist>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Brief Description *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Brief summary of how the accolade was achieved and who participated."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
              />
            </div>

            {/* Photo Flyer Upload */}
            <div className="sm:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-950 text-center">
              {imagePreview ? (
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-zinc-800 shadow-sm max-w-sm">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    sizes="(max-width: 450px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-450 mb-3">
                  <Upload className="h-6 w-6" />
                </div>
              )}
              <label className="cursor-pointer bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-350 shadow-sm transition-all duration-200">
                Choose Image File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-450 mt-2">
                Images display locally in your browser.
              </p>
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
              <span>{isEdit ? "Update Details" : "Record Achievement"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
