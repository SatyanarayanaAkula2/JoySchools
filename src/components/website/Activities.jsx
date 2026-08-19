"use client";

import { useRef } from "react";
import { Trophy, Music, Cpu, Palette, MessageSquare, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Activities({ initialActivities }) {
  const scrollRef = useRef(null);

  const fallbackActivities = [
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
      description: "Hands-on engineering workshops, robotics design, visual programming languages (Scratch), and scientific research competitions.",
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

  const getMeta = (category) => {
    const cat = (category || "").toLowerCase();
    switch (cat) {
      case "sports":
        return { icon: <Trophy className="h-6 w-6 text-white" />, accentBg: "bg-emerald-600" };
      case "co-curricular":
        return { icon: <Music className="h-6 w-6 text-white" />, accentBg: "bg-indigo-600" };
      case "academic":
        return { icon: <Cpu className="h-6 w-6 text-white" />, accentBg: "bg-sky-600" };
      case "achievement":
        return { icon: <Trophy className="h-6 w-6 text-white" />, accentBg: "bg-rose-500" };
      case "holiday":
        return { icon: <Heart className="h-6 w-6 text-white" />, accentBg: "bg-amber-600" };
      default:
        return { icon: <Palette className="h-6 w-6 text-white" />, accentBg: "bg-rose-500" };
    }
  };

  const activities = initialActivities && initialActivities.length > 0
    ? initialActivities.map((act) => {
        const meta = getMeta(act.category);
        return {
          title: act.title,
          image: act.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
          description: act.description,
          icon: meta.icon,
          accentBg: meta.accentBg,
        };
      })
    : fallbackActivities;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="activities"
      className="py-20 bg-gradient-to-br from-primary-light/10 via-slate-100/50 to-transparent dark:from-primary-dark/5 dark:via-background dark:to-transparent overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Holistic Development Programs
          </h2>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85 leading-relaxed">
            Education at JOY E.M HIGH SCHOOL goes beyond classroom walls. We offer a rich variety of extra-curricular activities designed to discover and nurture every child&apos;s talent.
          </p>
        </div>

        {/* Carousel Wrapper with Left and Right Arrows */}
        <div className="relative group/slider px-2 sm:px-4">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:bg-[#1a56db] hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-xl hover:bg-[#1a56db] hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Horizontal Slider (Single Row) */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth py-4 px-1"
          >
            {activities.map((act, idx) => (
              <div
                key={idx}
                className="snap-start shrink-0 w-[290px] sm:w-[340px] md:w-[360px] group relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-primary/10 bg-white dark:bg-primary-dark/15 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Floating Icon */}
                  <div className={`absolute -bottom-5 right-6 p-3.5 rounded-2xl shadow-lg ${act.accentBg} transition-transform duration-300 group-hover:scale-110`}>
                    {act.icon}
                  </div>
                </div>

                {/* Text Area */}
                <div className="p-6 pt-8 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                      {act.title}
                    </h3>
                    <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                      {act.description}
                    </p>
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
