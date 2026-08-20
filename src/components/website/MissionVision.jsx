"use client";

import Image from "next/image";
import { Quote, Sparkles } from "lucide-react";

export default function MissionVision({ adminImage }) {
  return (
    <section
      id="about"
      className="py-24 bg-slate-50/80 dark:bg-background border-y border-slate-200/60 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 -left-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Leadership Message
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Words From Our Administrator
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
        </div>

        {/* Administrator Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Side: Photo with decoration (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Background glowing frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[104%] h-[104%] bg-gradient-to-tr from-primary to-accent rounded-3xl rotate-2 opacity-25 dark:opacity-40 blur-sm scale-95" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[104%] h-[104%] bg-gradient-to-bl from-accent to-primary rounded-3xl -rotate-2 opacity-20 dark:opacity-30 blur-sm scale-95" />

            {/* Principal Photo Card */}
            <div className="relative z-10 w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-white dark:border-primary-dark shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src={adminImage || "/school_administrator.jpg"}
                alt="JOY E.M HIGH SCHOOL Administrator"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              
              {/* Floating Name Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <h4 className="text-xl font-bold font-display">Mrs. Suseela</h4>
                <p className="text-xs text-accent font-semibold uppercase tracking-wider mt-1">Principal, JOY E.M. SCHOOL</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-4 -right-4 z-20 bg-white dark:bg-primary-dark p-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-primary/10 animate-float">
              <Sparkles className="h-5 w-5 text-accent animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Academics & Ethics</span>
            </div>
          </div>

          {/* Right Side: Welcome Message (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex p-3 bg-primary/10 dark:bg-accent/10 rounded-2xl text-primary dark:text-accent mb-2">
              <Quote className="h-6 w-6 transform rotate-180" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-primary dark:text-white leading-tight">
              &ldquo;Nurturing Excellence, Character, and Hard Work in Every Child&rdquo;
            </h3>

            <div className="space-y-4 text-foreground/80 dark:text-foreground/90 text-base leading-relaxed font-medium">
              <p className="font-semibold text-primary dark:text-accent">
                Welcome to JOY E.M. SCHOOL.
              </p>
              <p>
                At JOY E.M. SCHOOL, education goes beyond textbooks. We focus on shaping curious minds, instilling strong ethical values, and empowering each student to explore their unique talents.
              </p>
              <p>
                From foundational early learning to Class 10 academic excellence, our dedicated faculty and holistic environment prepare students to grow with confidence, discipline, and compassion.
              </p>
            </div>

            <div className="pt-6 border-t border-primary/10 flex items-center gap-4">
              <div>
                <span className="block text-sm font-black text-primary dark:text-accent uppercase tracking-wider">Mrs. Suseela</span>
                <span className="text-xs text-foreground/60 dark:text-foreground/75 font-semibold">Principal, JOY E.M. SCHOOL</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
