"use client";

import { useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Tag } from "lucide-react";
import Image from "next/image";

export default function EventsSection({ initialEvents }) {
  const scrollRef = useRef(null);

  const fallbackEvents = [
    {
      title: "Science Fair & Tech Expo",
      category: "Academic",
      date: "2026-08-12",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      description: "Interactive science models, robotics exhibits, and STEM demonstrations presented by our middle and high school students.",
    },
    {
      title: "Independence Day Celebrations",
      category: "Holiday",
      date: "2026-08-15",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
      description: "Flag hoisting ceremony followed by patriotic songs, march-past, and cultural performances by our student houses.",
    },
    {
      title: "Annual Sports Day Meet",
      category: "Sports",
      date: "2026-09-05",
      image: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=600&q=80",
      description: "Track and field championships, relay races, obstacle courses, and award ceremonies celebrating physical excellence.",
    },
    {
      title: "Inter-School Cultural Fest",
      category: "Co-curricular",
      date: "2026-09-20",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80",
      description: "Grand showcase featuring dance recitals, classical vocal performances, theatrical plays, and art competitions.",
    },
  ];

  const events = initialEvents && initialEvents.length > 0 ? initialEvents : fallbackEvents;

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

  const formatDate = (dateStr) => {
    if (!dateStr) return { day: "", month: "", full: "" };
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      full: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
  };

  return (
    <section
      id="events"
      className="py-20 bg-slate-50/80 dark:bg-background border-y border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Events & School Calendar
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
              Stay up-to-date with upcoming celebrations, academic exhibitions, sports championships, and school festivals.
            </p>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Previous Events"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Next Events"
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
          {events.map((evt, idx) => {
            const dateObj = formatDate(evt.date);
            return (
              <div
                key={idx}
                className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-center group relative rounded-3xl overflow-hidden border border-slate-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Flyer Image with Date Badge */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={evt.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"}
                    alt={evt.title}
                    fill
                    sizes="(max-width: 768px) 300px, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Calendar Date Badge */}
                  <div className="absolute top-4 left-4 p-2 px-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg flex flex-col items-center border border-white/40">
                    <span className="text-[10px] font-extrabold uppercase text-accent tracking-wider">
                      {dateObj.month}
                    </span>
                    <span className="text-xl font-black text-primary dark:text-white leading-none">
                      {dateObj.day}
                    </span>
                  </div>

                  {/* Category Pill */}
                  {evt.category && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
                      {evt.category}
                    </span>
                  )}
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                      {evt.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{dateObj.full}</span>
                    </p>
                    <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed pt-1">
                      {evt.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
