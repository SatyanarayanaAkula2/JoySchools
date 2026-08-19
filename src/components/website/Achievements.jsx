"use client";

import { Award, Trophy, Leaf, Star, Calendar } from "lucide-react";
import Image from "next/image";

export default function Achievements({ initialHighlights, initialStats }) {
  const stats = initialStats && initialStats.length > 0 ? initialStats : [
    { value: "15+", label: "Years of Educational Legacy", icon: "🏫" },
    { value: "100%", label: "State Board Pass Rate", icon: "🎓" },
    { value: "35+", label: "Sports & Cultural Trophies", icon: "🏆" },
    { value: "2,200+", label: "Alumni Worldwide", icon: "🌐" },
  ];

  const highlights = initialHighlights && initialHighlights.length > 0 ? initialHighlights : [
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
      className="py-20 bg-white dark:bg-background border-y border-primary/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Milestones
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Our Proudest Achievements
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            Through continuous effort and dedication, our students and staff continue to reach new heights in academic, athletic, and environmental categories.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary-light/50 to-white dark:from-primary-dark/10 dark:to-transparent border border-primary/5 text-center shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="font-display text-3xl sm:text-4xl font-black text-primary dark:text-accent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-foreground/60 dark:text-foreground/80 mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="space-y-6 max-w-6xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-primary dark:text-white text-center mb-10">
            Recent Recognition Highlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((card, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-primary/10 bg-white dark:bg-primary-dark/15 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Area with category badge */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
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

                    <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Footer icon */}
                  <div className="pt-5 border-t border-primary/5 mt-5 flex justify-between items-center">
                    <span className="text-xs font-semibold text-foreground/50 dark:text-foreground/60">
                      Certified Milestone
                    </span>
                    <div className="p-2 rounded-lg bg-accent-light dark:bg-accent/10">
                      {getIcon(card)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
