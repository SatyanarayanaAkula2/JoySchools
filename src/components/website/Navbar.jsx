"use client";

import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

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
      const sections = [
        "hero",
        "about",
        "classes",
        "faculty",
        "activities",
        "achievements",
        "gallery",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-100/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/80 ${
        scrolled ? "py-2.5 shadow-md bg-slate-100/95 dark:bg-slate-900/95" : "py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <a
            href="#hero"
            className="flex items-center gap-2 group focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <div className="p-2 bg-primary/10 dark:bg-accent/15 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-accent/25 transition-all">
              <GraduationCap className="h-7 w-7 text-primary dark:text-accent" />
            </div>
            <div>
              <span className="font-display text-xl font-black tracking-tight text-primary dark:text-white uppercase">
                JOY E.M
              </span>
              <span className="font-display text-xl font-black text-accent ml-1 uppercase">
                HIGH SCHOOL
              </span>
            </div>
          </a>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg dark:bg-accent dark:hover:bg-accent-dark dark:text-primary-dark"
            >
              Enquiry
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-foreground hover:text-primary dark:hover:text-accent hover:bg-primary/10 dark:hover:bg-white/5 focus:outline-none transition-all border border-primary/10 dark:border-white/10"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Toggle main menu</span>
              {isOpen ? <X className="block h-5 w-5" /> : <Menu className="block h-5 w-5" />}
              <span className="ml-1.5 text-sm font-bold hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>

        {/* Dropdown Menu (Desktop & Mobile) */}
        <div
          className={`absolute right-4 sm:right-6 lg:right-8 top-full mt-2 w-64 bg-white dark:bg-primary-dark border border-primary/10 dark:border-white/10 shadow-2xl rounded-2xl p-3 z-50 transition-all duration-200 origin-top-right ${
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
                  className={`px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-accent/15 dark:text-accent"
                      : "text-foreground/80 dark:text-foreground/90 hover:bg-primary/5 dark:hover:bg-white/5 hover:text-primary dark:hover:text-accent"
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
