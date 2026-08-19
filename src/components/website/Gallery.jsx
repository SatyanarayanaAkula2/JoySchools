"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

export default function Gallery({ initialItems }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(null);
  const scrollRef = useRef(null);

  const items = initialItems && initialItems.length > 0 ? initialItems : [
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

  const filteredItems = items.filter((item) => item.title && item.title.trim() !== "");

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
        {/* Section Header & Slider Controls (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Gallery
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85 leading-relaxed">
            A glimpse into the daily activities, student initiatives, sports competitions, and campus highlights that make our school a joyful community.
          </p>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll gallery left"
              className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll gallery right"
              className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider (Single Row) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImageIdx(idx)}
              className="snap-start shrink-0 w-[270px] sm:w-[320px] md:w-[340px] group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm hover:shadow-xl hover:border-accent/40 cursor-pointer transition-all duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 80vw, 340px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay and hover maximize icon */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg text-white backdrop-blur-sm">
                  <Maximize2 className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
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
            <div className="absolute top-4 right-4 z-[110] flex gap-4">
              <button
                onClick={() => setSelectedImageIdx(null)}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none"
                title="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-[110]"
              title="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all focus:outline-none z-[110]"
              title="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="relative max-w-4xl max-h-[80vh] w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={filteredItems[selectedImageIdx].image}
                alt={filteredItems[selectedImageIdx].title}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain"
              />
            </div>

            <div className="mt-4 text-center text-white max-w-xl">
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                {filteredItems[selectedImageIdx].album}
              </span>
              <h3 className="font-display text-xl font-bold">
                {filteredItems[selectedImageIdx].title}
              </h3>
              {filteredItems[selectedImageIdx].description && (
                <p className="text-sm text-slate-300 mt-1">
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
