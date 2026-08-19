"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero({ slideImages }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const defaultSlides = [
    {
      src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      alt: "Children learning in a modern classroom at JOY E.M HIGH SCHOOL",
    },
    {
      src: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=800&q=80",
      alt: "Students competing on the sports field",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      alt: "Coding and STEM laboratory experimentation",
    },
    {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      alt: "Extensive campus reading library",
    },
  ];

  const sliderImages = slideImages && slideImages.length > 0
    ? slideImages.map((src, idx) => ({ src, alt: `School slider image ${idx + 1}` }))
    : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-br from-primary-light via-white to-accent-light/30 dark:from-primary-dark/20 dark:via-background dark:to-accent-dark/5"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.28] dark:opacity-[0.16] pointer-events-none"
        style={{ backgroundImage: "url('/school_bg.jpg')" }}
      />

      {/* Decorative Background Shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left animate-fade-in-up">
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary dark:text-white leading-[1.1] tracking-tight">
              Empowering Minds, <br className="hidden sm:inline" />
              <span className="text-accent">Shaping Futures</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl font-medium text-foreground/80 dark:text-foreground/90 max-w-2xl">
              Where curiosity meets discovery, and every child finds their path.
            </p>

            {/* Supporting Sentence */}
            <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/80 leading-relaxed max-w-xl">
              From Nursery to Class 10, JOY E.M HIGH SCHOOL offers a nurturing, State Board curriculum designed to foster academic excellence, creative thinking, and strong values.
            </p>
          </div>

          {/* Right Image/Illustration Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center lg:pl-4">
            {/* Background elements under the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-accent/10 rounded-[2.5rem] rotate-3 scale-95 z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] bg-primary/10 rounded-[2.5rem] -rotate-3 scale-95 z-0" />

            {/* Hero Image Container with Slideshow */}
            <div className="relative z-10 w-full aspect-[4/3] sm:aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white dark:border-primary-dark shadow-2xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02]">
              {sliderImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-15" />
              
              {/* Slide indicators (dots) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? "bg-accent w-4" : "bg-white/60 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mini floating card */}
            <div className="absolute -bottom-4 -left-4 sm:left-4 z-25 bg-white dark:bg-primary-dark p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-primary/10 animate-float">
              <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent-dark dark:text-accent">
                ✨
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary dark:text-white uppercase tracking-wider">Holistic Growth</h4>
                <p className="text-[10px] text-foreground/70 dark:text-foreground/80 font-medium">Academics, Arts & Sports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
