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
      description: "Two of our Class 10 students secured Top 50 national ranks in the National Science Olympiad, showcasing our strong conceptual STEM learning.",
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
    {
      title: "All-India Math Olympiad Honors",
      category: "Academic Excellence",
      year: "2025",
      icon: <Award className="h-5 w-5 text-accent" />,
      image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=500&q=80",
      description: "Distinction awards across junior and senior school batches in the prestigious All-India Mathematics Olympiad.",
    },
  ];

  const highlights = initialHighlights && initialHighlights.length > 0 ? initialHighlights : fallbackHighlights;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getIcon = (item) => {
    if (item.icon) return item.icon;
    const cat = (item.category || "").toLowerCase();
    if (cat.includes("sport") || cat.includes("athletic")) {
      return <Trophy className="h-5 w-5 text-accent" />;
    }
    if (cat.includes("environment") || cat.includes("eco") || cat.includes("green")) {
      return <Leaf className="h-5 w-5 text-accent" />;
    }
    return <Award className="h-5 w-5 text-accent" />;
  };

  return (
    <section
      id="achievements"
      className="py-20 bg-slate-50/80 dark:bg-background border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Achievements & Highlights
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85 leading-relaxed">
            Celebrating exceptional student accomplishments in academics, competitive sports, and environmental leadership.
          </p>
        </div>

        {/* Carousel Container with Side Navigation Buttons */}
        <div className="relative group/slider">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll achievements left"
            className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/95 dark:bg-zinc-800/95 border border-slate-200 dark:border-zinc-700 shadow-xl text-slate-700 dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200 focus:outline-none backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Single Row Slider without scrollbar */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth py-2 px-1"
          >
            {highlights.map((card, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[300px] sm:w-[350px] md:w-[380px] group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Area with category badge */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md dark:bg-accent dark:text-primary-dark">
                    {card.category}
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60 dark:text-foreground/75">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{card.year}</span>
                    </div>

                    <h4 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                      {card.title}
                    </h4>

                    <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed line-clamp-3">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer icon */}
                  <div className="pt-5 border-t border-slate-100 dark:border-zinc-800 mt-5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-foreground/50 dark:text-foreground/60">
                      Certified Accolade
                    </span>
                    <div className="p-2 rounded-lg bg-accent-light dark:bg-accent/10">
                      {getIcon(card)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll achievements right"
            className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/95 dark:bg-zinc-800/95 border border-slate-200 dark:border-zinc-700 shadow-xl text-slate-700 dark:text-white hover:bg-accent hover:text-white dark:hover:bg-accent transition-all duration-200 focus:outline-none backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
