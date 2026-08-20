"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Scroll listener to toggle styles and active link
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ["hero", "about", "classes", "activities", "events", "achievements", "gallery", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero", id: "hero" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Academics", href: "#classes", id: "classes" },
    { name: "Holistic", href: "#activities", id: "activities" },
    { name: "Events", href: "#events", id: "events" },
    { name: "Achievements", href: "#achievements", id: "achievements" },
    { name: "Gallery", href: "#gallery", id: "gallery" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800/80 ${
        scrolled ? "py-2 shadow-md" : "py-2.5 sm:py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo Section */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-xl overflow-hidden shadow-sm border border-slate-200/80 bg-white p-0.5 shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="JOY E.M SCHOOL Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <div className="flex items-center">
                <span className="font-display text-lg sm:text-xl font-black text-[#1a56db] dark:text-white uppercase tracking-tight">
                  JOY E.M
                </span>
                <span className="font-display text-lg sm:text-xl font-black text-[#0284c7] dark:text-[#38bdf8] ml-1.5 uppercase tracking-tight">
                  SCHOOL
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest -mt-0.5">
                SINCE 2016
              </span>
            </div>
          </a>

          {/* Right Action Items */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#1a4bb5] hover:bg-[#153e96] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Enquiry
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center px-3 py-2 sm:px-3.5 sm:py-2 rounded-xl text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:outline-none transition-all shadow-sm active:scale-95"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              {isOpen ? <X className="block h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="block h-4 w-4 sm:h-5 sm:w-5" />}
              <span className="ml-1.5 text-xs sm:text-sm font-semibold">Menu</span>
            </button>
          </div>
        </div>

        {/* Dropdown Menu (Desktop & Mobile) */}
        <div
          className={`absolute right-4 sm:right-6 lg:right-8 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl p-3 z-50 transition-all duration-200 origin-top-right ${
            isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible"
          }`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-50 text-[#1a56db] dark:bg-blue-950 dark:text-[#38bdf8] font-bold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#1a56db]"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
