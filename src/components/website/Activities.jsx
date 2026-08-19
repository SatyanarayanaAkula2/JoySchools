"use client";

import { Trophy, Music, Cpu, Palette, MessageSquare, Heart, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Activities({ initialEvents }) {
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

  const getEventMeta = (category) => {
    const cat = (category || "").toLowerCase();
    switch (cat) {
      case "sports":
        return {
          icon: <Trophy className="h-6 w-6 text-white" />,
          accentBg: "bg-emerald-600",
        };
      case "co-curricular":
        return {
          icon: <Music className="h-6 w-6 text-white" />,
          accentBg: "bg-indigo-600",
        };
      case "academic":
        return {
          icon: <Cpu className="h-6 w-6 text-white" />,
          accentBg: "bg-sky-600",
        };
      case "achievement":
        return {
          icon: <Trophy className="h-6 w-6 text-white" />,
          accentBg: "bg-rose-500",
        };
      case "holiday":
        return {
          icon: <Heart className="h-6 w-6 text-white" />,
          accentBg: "bg-amber-600",
        };
      default:
        return {
          icon: <Palette className="h-6 w-6 text-white" />,
          accentBg: "bg-rose-500",
        };
    }
  };

  const activities = initialEvents && initialEvents.length > 0
    ? initialEvents.map(evt => {
        const meta = getEventMeta(evt.category);
        return {
          title: evt.title,
          image: evt.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
          description: evt.description,
          date: evt.date,
          icon: meta.icon,
          accentBg: meta.accentBg,
        };
      })
    : fallbackActivities;

  return (
    <section
      id="activities"
      className="py-20 bg-gradient-to-br from-primary-light/10 via-slate-100/50 to-transparent dark:from-primary-dark/5 dark:via-background dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Clubs & Sports
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Holistic Development Programs
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            Education at JOY E.M HIGH SCHOOL goes beyond classroom walls. We offer a rich variety of extra-curricular activities designed to discover and nurture every child&apos;s talent.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-primary/10 bg-white dark:bg-primary-dark/15 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={act.image}
                  alt={act.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating Icon */}
                <div className={`absolute -bottom-5 right-6 p-3.5 rounded-2xl shadow-lg ${act.accentBg} transition-transform duration-300 group-hover:scale-110`}>
                  {act.icon}
                </div>
              </div>

              {/* Text Area */}
              <div className="p-6 pt-8 flex flex-col justify-between flex-grow">
                <div className="space-y-3">
                  <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                    {act.title}
                  </h3>
                  {act.date && (
                    <p className="text-xs font-semibold text-accent dark:text-accent/90">
                      📅 {new Date(act.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                    {act.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-primary/5 mt-6">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-accent group-hover:underline">
                    View schedules & coaches
                    <ChevronRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Notice */}
        <div className="mt-16 text-center">
          <p className="text-sm text-foreground/60 dark:text-foreground/70 bg-white dark:bg-primary-dark/20 inline-block px-6 py-3 rounded-full border border-primary/5">
            🔔 Students can enroll in up to two clubs per semester. Club classes take place every Wednesday and Friday afternoon.
          </p>
        </div>
      </div>
    </section>
  );
}
