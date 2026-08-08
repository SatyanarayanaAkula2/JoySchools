"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Upload } from "lucide-react";
import Image from "next/image";

export default function GalleryUploader({ item, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [album, setAlbum] = useState("Campus Life");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!item;

  useEffect(() => {
    if (item) {
      setTitle(item.title || "");
      setDescription(item.description || "");
      setAlbum(item.album || "Campus Life");
      setImagePreview(item.image || "");
    }
  }, [item]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!isEdit && !imagePreview) {
      setError("Please select an image file to upload.");
      return;
    }

    setLoading(true);

    const payload = {
      _id: item?._id || `gal_${Math.random().toString(36).substr(2, 9)}`,
      title,
      description,
      album,
      image: imagePreview || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    };

    setTimeout(() => {
      onSave(payload);
      onClose();
      setLoading(false);
    }, 450);
  };

  const albums = ["Sports Meet", "Science Fair", "Cultural Fest", "Campus Life"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-850">
          <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white">
            {isEdit ? "Edit Media Details" : "Upload Event Photo"}
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
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-xs font-semibold text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-450">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image Preview / Drag Area */}
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
                Supports standard image files. Runs fully in your browser.
              </p>
            </div>

            {/* Photo Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Photo Caption / Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Science Olympiad Gold Winners"
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              />
            </div>

            {/* Album/Category Select */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Select Album *
              </label>
              <select
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
              >
                {albums.map((alb) => (
                  <option key={alb} value={alb}>
                    {alb}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                Short Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Write a brief caption explaining this photo."
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
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
              <span>{isEdit ? "Update Photo" : "Upload to Gallery"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
