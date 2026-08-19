"use client";

import { useRef } from "react";
import { Trophy, Music, Cpu, Palette, MessageSquare, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Activities() {
  const scrollRef = useRef(null);

  const activities = [
    {
      title: "Sports & Athletics",
      icon: <Trophy className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=500&q=80",
      description: "Comprehensive coaching in football, basketball, track & field, and gymnastics. We focus on sportsmanship, physical fitness, and teamwork.",
      accentBg: "bg-emerald-600",
    },
    {
      title: "Music & Performing Arts",
      icon: <Music className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=500&q=80",
      description: "Vocal training, classical dance styles, and instrument lessons (keyboard, guitar, violin). Culminates in our grand annual school production.",
      accentBg: "bg-indigo-600",
    },
    {
      title: "STEM & Robotics Club",
      icon: <Cpu className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=80",
      description: "Hands-on engineering workshops, robotics design, visual programming languages, and scientific research competitions.",
      accentBg: "bg-sky-600",
    },
    {
      title: "Creative Visual Arts",
      icon: <Palette className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=500&q=80",
      description: "Oil painting, pottery, clay sculpting, and craft recycling. Students are encouraged to display their creativity in seasonal exhibitions.",
      accentBg: "bg-rose-500",
    },
    {
      title: "Debating & Public Speaking",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=500&q=80",
      description: "Model United Nations (MUN), spelling bees, theatrical drama, and communication sessions to build articulate and confident leaders.",
      accentBg: "bg-amber-600",
    },
    {
      title: "Yoga & Mindfulness",
      icon: <Heart className="h-6 w-6 text-white" />,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80",
      description: "Daily respiration exercises, basic yoga postures, and mindfulness routines designed to reduce stress and enhance mental focus.",
      accentBg: "bg-teal-600",
    },
  ];

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
      id="activities"
      className="py-20 bg-gradient-to-br from-primary-light/10 via-slate-100/50 to-transparent dark:from-primary-dark/5 dark:via-background dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
              Holistic Development Programs
            </h2>
            <div className="h-1 w-16 bg-accent rounded-full" />
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
              Education at JOY E.M HIGH SCHOOL goes beyond classroom walls. We offer a rich variety of co-curricular activities designed to discover and nurture every child&apos;s talent.
            </p>
          </div>

          {/* Slide Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Slide Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-slate-200/60 dark:border-zinc-700 text-slate-700 dark:text-slate-200 hover:bg-accent hover:text-white transition-all"
              aria-label="Slide Right"
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
          {activities.map((act, idx) => (
            <div
              key={idx}
              className="w-[300px] sm:w-[350px] md:w-[380px] shrink-0 snap-center group relative rounded-3xl overflow-hidden border border-slate-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  sizes="(max-width: 768px) 300px, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating Icon */}
                <div className={`absolute -bottom-4 right-6 p-3 rounded-2xl shadow-lg ${act.accentBg} transition-transform duration-300 group-hover:scale-110`}>
                  {act.icon}
                </div>
              </div>

              {/* Text Area without Dates */}
              <div className="p-6 pt-7 flex flex-col justify-between flex-grow space-y-3">
                <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                  {act.title}
                </h3>
                <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
