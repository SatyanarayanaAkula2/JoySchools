"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, Filter } from "lucide-react";
import GalleryUploader from "./GalleryUploader";
import Image from "next/image";

export default function GalleryGrid() {
  const [items, setItems] = useState([]);
  const [albumFilter, setAlbumFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize and load from Express backend
  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();
        if (data.success) {
          setItems(data.gallery || []);
        }
      } catch (err) {
        console.error("Failed to load gallery items:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  // Filter gallery items locally
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return albumFilter === "All" || item.album === albumFilter;
    });
  }, [items, albumFilter]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this photo from the gallery?")) {
      try {
        const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
        const res = await response.json();
        if (res.success) {
          setItems((prev) => prev.filter((i) => i._id !== id));
        } else {
          alert(res.error || "Failed to delete gallery item");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete gallery item");
      }
    }
  };

  const handleSave = async (savedItem) => {
    try {
      const isEdit = !!savedItem._id;
      
      const formData = new FormData();
      formData.append("title", savedItem.title);
      formData.append("description", savedItem.description || "");
      formData.append("album", savedItem.album);
      
      if (savedItem.imageFile) {
        formData.append("imageFile", savedItem.imageFile);
      } else {
        formData.append("existingImage", savedItem.existingImage);
      }

      let response;
      if (isEdit) {
        response = await fetch(`/api/gallery/${savedItem._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("/api/gallery", {
          method: "POST",
          body: formData,
        });
      }
      
      const data = await response.json();
      if (data.success) {
        setItems((prev) => {
          if (isEdit) {
            return prev.map((i) => (i._id === savedItem._id ? data.item : i));
          } else {
            return [data.item, ...prev];
          }
        });
      } else {
        alert(data.error || "Failed to save gallery item");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsFormOpen(true);
  };

  const albumsList = ["All", "Sports Meet", "Science Fair", "Cultural Fest", "Campus Life"];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        {/* Album Filter */}
        <div className="relative w-full sm:max-w-xs flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={albumFilter}
            onChange={(e) => setAlbumFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
          >
            {albumsList.map((alb) => (
              <option key={alb} value={alb}>
                {alb === "All" ? "All Albums" : `${alb} Album`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl p-20 flex flex-col items-center justify-center space-y-3 shadow-md">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="text-slate-400 text-sm">Querying database records...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl p-20 text-center text-slate-450 shadow-md text-sm">
          No photo entries uploaded in this album category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-250/30 dark:border-zinc-800/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] bg-slate-50 dark:bg-zinc-950 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-350">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                
                {/* Floating Album Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide bg-slate-900/70 backdrop-blur-md text-white">
                    {item.album}
                  </span>
                </div>

                {/* Overlaid Actions (Hover) */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="p-2.5 rounded-xl bg-white text-slate-800 hover:bg-slate-50 transition-colors shadow-lg"
                    title="Edit details"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-500 transition-colors shadow-lg"
                    title="Delete photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Text Frame */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white line-clamp-1 text-sm">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs text-slate-400 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {isFormOpen && (
        <GalleryUploader
          item={selectedItem}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
