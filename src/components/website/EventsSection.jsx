"use client";

import { useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function EventsSection({ events }) {
  const scrollRef = useRef(null);

  const fallbackEvents = [
    {
      title: "Annual Science & STEM Exhibition",
      date: "2026-09-15",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
      description: "Interactive science demonstrations, robotics models, and environmental exhibits by students.",
    },
    {
      title: "Independence Day & Cultural Gala",
      date: "2026-08-15",
      category: "Holiday",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80",
      description: "Grand flag hoisting ceremony, patriotic dance recitals, and student marching parade.",
    },
    {
      title: "Inter-School Athletics Championship",
      date: "2026-10-10",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=500&q=80",
      description: "Track races, long jump, relays, and basketball tournaments on the school athletic grounds.",
    },
    {
      title: "Parent-Teacher Academic Forum",
      date: "2026-09-28",
      category: "Co-curricular",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=500&q=80",
      description: "Semester progress discussions, student counseling sessions, and curriculum reviews.",
    },
  ];

  const eventList = events && events.length > 0 ? events : fallbackEvents;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      id="events"
      className="py-20 bg-slate-50/70 dark:bg-background border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Upcoming Events & Dates
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base text-foreground/70 dark:text-foreground/85 leading-relaxed">
              Stay up-to-date with our school calendar, upcoming festivals, academic symposiums, and sports tournaments.
            </p>
          </div>

          {/* Slider Navigation */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll events left"
              className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll events right"
              className="p-3 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-sm hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Single Row Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {eventList.map((evt, idx) => (
            <div
              key={idx}
              className="snap-start shrink-0 w-[300px] sm:w-[350px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={evt.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"}
                  alt={evt.title}
                  fill
                  sizes="(max-width: 768px) 80vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                {evt.category && (
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/20">
                    {evt.category}
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  {/* Date Badge */}
                  {evt.date && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 text-accent font-bold text-xs">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(evt.date)}</span>
                    </div>
                  )}

                  <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed line-clamp-3">
                    {evt.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
