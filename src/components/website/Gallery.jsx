"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function Gallery({ initialItems }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(null);
  const scrollRef = useRef(null);

  const defaultItems = [
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
  ];

  const items = initialItems && initialItems.length > 0 ? initialItems : defaultItems;
  const filteredItems = items.filter((item) => item.title && item.title.trim() !== "");

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = useCallback(() => {
    setSelectedImageIdx((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  }, [filteredItems]);

  const handleNext = useCallback(() => {
    setSelectedImageIdx((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
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
      className="py-20 bg-gradient-to-br from-slate-100/60 via-primary-light/5 to-transparent dark:from-background dark:via-primary-dark/5 dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Life at JOY E.M HIGH SCHOOL
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
              A glimpse into the daily campus life, student initiatives, sports competitions, and cultural celebrations.
            </p>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 1-Row Horizontal Slide Bar */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 snap-center group relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:border-accent/40 cursor-pointer transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 280px, 350px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay and hover maximize icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="absolute top-4 right-4 p-2.5 bg-white/20 rounded-xl text-white backdrop-blur-sm shadow-md">
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
          <div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedImageIdx(null)}
          >
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
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-10"
              title="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
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
                sizes="85vw"
                className="object-contain"
              />
            </div>

            {/* Caption in Lightbox */}
            <div
              className="mt-6 text-center max-w-2xl px-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                {filteredItems[selectedImageIdx].album}
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                {filteredItems[selectedImageIdx].title}
              </h3>
              {filteredItems[selectedImageIdx].description && (
                <p className="text-sm text-slate-300 mt-2">
                  {filteredItems[selectedImageIdx].description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
