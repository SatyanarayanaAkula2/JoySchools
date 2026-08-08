"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, Filter } from "lucide-react";
import GalleryUploader from "./GalleryUploader";
import Image from "next/image";

const INITIAL_MOCK_GALLERY = [
  {
    _id: "gal_1",
    title: "Annual Athletics Meet",
    album: "Sports Meet",
    image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=600&q=80",
    description: "Students participating in track events during our Annual Sports Day.",
  },
  {
    _id: "gal_2",
    title: "Robotics Laboratory",
    album: "Science Fair",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    description: "Middle schoolers programming their line-following robots in our STEM lab.",
  },
  {
    _id: "gal_3",
    title: "Annual Cultural Dance",
    album: "Cultural Fest",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    description: "Traditional classical dance recital performed during the school's Anniversary.",
  },
  {
    _id: "gal_4",
    title: "JOY E.M HIGH SCHOOL Library",
    album: "Campus Life",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
    description: "Our quiet reading room housing over 15,000 academic journals and books.",
  },
  {
    _id: "gal_5",
    title: "Inter-House Tug of War",
    album: "Sports Meet",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
    description: "The final match of the Inter-House Athletics championship, displaying team spirit.",
  },
  {
    _id: "gal_6",
    title: "Microscope Experiments",
    album: "Science Fair",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
    description: "Class 9 students examining plant cellular structures during biology class.",
  },
];

export default function GalleryGrid() {
  const [items, setItems] = useState([]);
  const [albumFilter, setAlbumFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(INITIAL_MOCK_GALLERY);
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Filter gallery items locally
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return albumFilter === "All" || item.album === albumFilter;
    });
  }, [items, albumFilter]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this photo from the gallery?")) {
      setItems((prev) => prev.filter((i) => i._id !== id));
    }
  };

  const handleSave = (savedItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i._id === savedItem._id);
      if (exists) {
        return prev.map((i) => (i._id === savedItem._id ? savedItem : i));
      } else {
        return [savedItem, ...prev];
      }
    });
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
