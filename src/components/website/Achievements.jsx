"use client";

import { useRef } from "react";
import { Award, Trophy, Leaf, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Achievements({ initialHighlights }) {
  const scrollRef = useRef(null);

  const fallbackHighlights = [
    {
      title: "National Science Olympiad",
      category: "Academic Excellence",
      year: "2025 - 2026",
      icon: <Award className="h-5 w-5 text-accent" />,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
      description: "Two of our Class 10 students secured Top 50 national ranks in the National Science Olympiad, showcasing our strong emphasis on conceptual STEM learning.",
    },
    {
      title: "State Basketball Champions",
      category: "Sports & Athletics",
      year: "2025",
      icon: <Trophy className="h-5 w-5 text-accent" />,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80",
      description: "Our Under-16 basketball team bagged the gold medal at the State Level Inter-School Sports Meet, maintaining our undefeated streak for the season.",
    },
    {
      title: "Eco-School of the Year",
      category: "Environmental Leadership",
      year: "2024 - 2025",
      icon: <Leaf className="h-5 w-5 text-accent" />,
      image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
      description: "Recognized by the Environmental Board for our zero-waste initiative, active student green club, and 100% solar-powered campus infrastructure.",
    },
  ];

  const highlights = initialHighlights && initialHighlights.length > 0 ? initialHighlights : fallbackHighlights;

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

  const getIcon = (item) => {
    if (item.icon) return item.icon;
    const cat = item.category || "";
    if (cat.toLowerCase().includes("sport") || cat.toLowerCase().includes("athletic")) {
      return <Trophy className="h-5 w-5 text-accent" />;
    }
    if (cat.toLowerCase().includes("environment") || cat.toLowerCase().includes("eco") || cat.toLowerCase().includes("green") || cat.toLowerCase().includes("leaf")) {
      return <Leaf className="h-5 w-5 text-accent" />;
    }
    return <Award className="h-5 w-5 text-accent" />;
  };

  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-br from-slate-100/60 via-primary-light/5 to-transparent dark:from-background dark:via-primary-dark/5 dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Honors & Achievements
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
              Celebrating our students&apos; national awards, state athletic championships, and environmental honors.
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
          {highlights.map((card, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-center group relative rounded-3xl overflow-hidden border border-slate-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Area with category badge */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 300px, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md dark:bg-accent dark:text-primary-dark">
                  {card.category}
                </span>
              </div>

              {/* Content details */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60 dark:text-foreground/75">
                    <Calendar className="h-3.5 w-3.5 text-accent" />
                    <span>{card.year}</span>
                  </div>

                  <h4 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                    {card.title}
                  </h4>

                  <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Footer icon */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 mt-4 flex justify-between items-center">
                  <span className="text-xs font-semibold text-foreground/50 dark:text-foreground/60">
                    Recognized Accolade
                  </span>
                  <div className="p-2 rounded-lg bg-accent/10">
                    {getIcon(card)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
