"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImageIdx, setSelectedImageIdx] = useState(null);

  const albums = ["All", "Sports Meet", "Science Fair", "Cultural Fest", "Campus Life"];

  const items = [
    {
      title: "Annual Athletics Meet",
      album: "Sports Meet",
      image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=600&q=80",
      description: "Students participating in track events during our Annual Sports Day.",
    },
    {
      title: "Robotics Laboratory",
      album: "Science Fair",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      description: "Middle schoolers programming their line-following robots in our STEM lab.",
    },
    {
      title: "Annual Cultural Dance",
      album: "Cultural Fest",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
      description: "Traditional classical dance recital performed during the school's Silver Jubilee.",
    },
    {
      title: "JOY E.M HIGH SCHOOL Library",
      album: "Campus Life",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80",
      description: "Our quiet reading room housing over 15,000 academic journals and fictional books.",
    },
    {
      title: "Inter-House Tug of War",
      album: "Sports Meet",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80",
      description: "The final match of the Inter-House Athletics championship, displaying team spirit.",
    },
    {
      title: "Microscope Experiments",
      album: "Science Fair",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      description: "Class 9 students examining plant cellular structures during biology class.",
    },
    {
      title: "Student Painting Exhibition",
      album: "Cultural Fest",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80",
      description: "Watercolor and oil sketches displayed at the Annual Spring Art Showcase.",
    },
    {
      title: "Computer Coding Class",
      album: "Campus Life",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80",
      description: "Primary students learning logical coding foundations using educational programming suites.",
    },
  ];

  // Filter items based on active tab
  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(item => item.album === activeFilter);

  const handlePrev = useCallback(() => {
    setSelectedImageIdx((prev) => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  }, [filteredItems]);

  const handleNext = useCallback(() => {
    setSelectedImageIdx((prev) => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  }, [filteredItems]);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImageIdx(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (selectedImageIdx !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIdx, handleNext, handlePrev]);

  return (
    <section
      id="gallery"
      className="py-20 bg-gradient-to-br from-white via-primary-light/5 to-transparent dark:from-background dark:via-primary-dark/5 dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Visual Tour
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Life at JOY E.M HIGH SCHOOL
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            A glimpse into the daily activities, student initiatives, sports competitions, and campus highlights that make our school a joyful community.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {albums.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveFilter(tab);
                setSelectedImageIdx(null); // Reset lightbox tracking on filter change
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                activeFilter === tab
                  ? "bg-primary text-white dark:bg-accent dark:text-primary-dark scale-105"
                  : "bg-white dark:bg-white/5 text-foreground/75 dark:text-foreground/90 hover:bg-primary-light dark:hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-primary/5 bg-white dark:bg-primary-dark/15 shadow-sm hover:shadow-xl hover:border-accent/40 cursor-pointer transition-all duration-300 animate-scale-up"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay and hover maximize icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg text-white backdrop-blur-sm">
                  <Maximize2 className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-accent dark:text-accent uppercase tracking-wider">
                    {item.album}
                  </span>
                  <h4 className="font-display text-base font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            {/* Top Bar inside modal */}
            <div className="absolute top-4 right-4 z-[110] flex gap-4">
              <button
                onClick={() => setSelectedImageIdx(null)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none"
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-10"
              title="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-10"
              title="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Modal Image Wrapper */}
            <div
              className="w-[85vw] h-[60vh] relative z-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredItems[selectedImageIdx].image}
                alt={filteredItems[selectedImageIdx].title}
                fill
                sizes="90vw"
                className="object-contain rounded-lg border border-white/10"
                priority
              />
            </div>

            {/* Bottom details */}
            <div
              className="mt-6 text-center max-w-2xl px-4 text-white z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-bold text-accent uppercase tracking-wider">
                {filteredItems[selectedImageIdx].album}
              </span>
              <h3 className="font-display text-xl font-bold mt-1 text-white">
                {filteredItems[selectedImageIdx].title}
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                {filteredItems[selectedImageIdx].description}
              </p>
              <div className="text-xs text-gray-400 mt-3 font-semibold">
                Image {selectedImageIdx + 1} of {filteredItems.length}
              </div>
            </div>

            {/* Background click to close */}
            <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedImageIdx(null)} />
          </div>
        )}
      </div>
    </section>
  );
}
