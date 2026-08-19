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
      src: "/hero_classroom.jpg",
      alt: "Students in classroom at JOY E.M HIGH SCHOOL",
    },
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

  const sliderImages =
    slideImages && slideImages.length > 0
      ? slideImages.map((src, idx) => ({
          src,
          alt: `School slider image ${idx + 1}`,
        }))
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
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Background School Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/school_bg.jpg')" }}
      />

      {/* Dark gradient overlay to ensure high contrast and text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left animate-fade-in-up">
            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.12] tracking-tight">
              <span className="text-white block drop-shadow-md">
                Empowering Minds,
              </span>
              <span className="text-[#00a8ff] block drop-shadow-md">
                Shaping Futures
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-xl drop-shadow">
              Welcome to JOY E.M HIGH SCHOOL. Delivering quality Nursery to Class 10
              State Board English Medium education since 2011.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("contact");
                }}
                className="px-6 sm:px-7 py-3 rounded-xl bg-[#0095ff] hover:bg-[#0082e0] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                ENROLL NOW
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo("about");
                }}
                className="px-6 sm:px-7 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900/85 text-white font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/25 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                LEARN MORE
              </a>
            </div>
          </div>

          {/* Right Image Slideshow Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Classroom Slideshow Card */}
            <div className="relative z-10 w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01] border-2 sm:border-[3px] border-white/80 dark:border-white/20">
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

              {/* Bottom shadow overlay for slider indicators */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-15" />

              {/* Slide indicators (dots) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                {sliderImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? "bg-[#00a8ff] w-4"
                        : "bg-white/50 hover:bg-white w-2"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#1d4ed8] z-20" />
    </section>
  );
}
