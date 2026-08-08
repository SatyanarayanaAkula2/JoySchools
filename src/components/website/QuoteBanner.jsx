"use client";

import { Quote } from "lucide-react";

export default function QuoteBanner() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-accent-dark/80 text-white shadow-inner">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-2xl -translate-x-12 -translate-y-12 animate-pulse-subtle" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-16 translate-y-16" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex p-3.5 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shadow-md animate-float mb-2">
          <Quote className="h-8 w-8 text-accent-light" />
        </div>
        
        <blockquote className="space-y-4">
          <p className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold italic tracking-tight leading-relaxed max-w-4xl mx-auto text-white drop-shadow-sm select-none">
            &ldquo;Genius is one percent inspiration and ninety-nine percent perspiration&rdquo;
          </p>
          <cite className="block text-xs sm:text-sm font-bold uppercase tracking-widest text-accent-light/95 pt-2 font-display">
            &mdash; Thomas A. Edison
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
