"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

export default function MilestonesSection({ initialStats }) {
  const scrollRef = useRef(null);

  const defaultStats = [
    { value: "15+", label: "Years of Educational Legacy", icon: "🏫" },
    { value: "100%", label: "State Board Pass Rate", icon: "🎓" },
    { value: "35+", label: "Sports & Cultural Trophies", icon: "🏆" },
    { value: "2,200+", label: "Alumni Worldwide", icon: "🌐" },
  ];

  const stats = initialStats && initialStats.length > 0 ? initialStats : defaultStats;

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

  return (
    <section
      id="milestones"
      className="py-20 bg-slate-50/80 dark:bg-background border-y border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Our Proudest Milestones
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
              Through decades of continuous dedication, our students and staff continue to establish proud benchmarks of educational excellence.
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
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="w-[260px] sm:w-[280px] md:w-[300px] shrink-0 snap-center p-8 rounded-3xl bg-white dark:bg-zinc-900/90 border border-slate-200/70 dark:border-zinc-800 text-center shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col items-center justify-center space-y-3"
            >
              <div className="text-4xl p-4 bg-primary/5 dark:bg-accent/10 rounded-2xl mb-1 shadow-inner">
                {stat.icon}
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-primary dark:text-accent tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-foreground/70 dark:text-foreground/80 uppercase tracking-wider leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
