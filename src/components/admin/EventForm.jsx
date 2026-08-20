"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { compressImage } from "@/utils/compressImage";

export default function EventForm({ event, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Academic");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const isEdit = !!event;

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setCategory(event.category || "Academic");
      setImagePreview(event.image || "");
      
      // Parse ISO date string to YYYY-MM-DD for date input
      if (event.date) {
        const d = new Date(event.date);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        setDate(`${yyyy}-${mm}-${dd}`);
      }
    }
  }, [event]);

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
      description,
      date: new Date(date).toISOString(),
      category,
      imageFile,
      existingImage: event?.image || "",
    };

    if (event?._id) {
      payload._id = event._id;
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
            {isEdit ? "Edit Calendar Event" : "Add Calendar Event"}
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
            {/* Event Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Independence Day Celebrations"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Event Date *
              </label>
              <input
                type="date"
                required
                min="2016-01-01"
                max="2035-12-31"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Event Category */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              >
                <option value="Academic">Academic</option>
                <option value="Holiday">Holiday</option>
                <option value="Co-curricular">Co-curricular</option>
                <option value="Sports">Sports</option>
                <option value="Achievement">Achievement</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Event Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Description / Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Give details about timings, location, and dress code."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
              />
            </div>

            {/* Photo Flyer Upload */}
            <div className="sm:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-950 text-center">
              {imagePreview ? (
                <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-zinc-800 shadow-sm max-w-sm">
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
                Choose Local Flyer
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-[10px] text-slate-450 mt-2">
                Images display locally in your browser. (Recommended ratio: 2:1).
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
              <span>{isEdit ? "Update Event" : "Add Event"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
