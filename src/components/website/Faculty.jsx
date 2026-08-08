"use client";

import { useRef } from "react";
import { Mail, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function Faculty({ initialStaff }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by one card's width plus gap
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const staff = initialStaff && initialStaff.length > 0 ? initialStaff : [
    {
      name: "Dr. Ramesh Prasad",
      role: "Principal",
      qualification: "Ph.D. in Education, M.Sc. Physics",
      experience: "22+ Years Experience",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&h=450&q=80",
      email: "principal@joyemhighschool.edu",
    },
    {
      name: "Mrs. Ananya Sen",
      role: "Vice Principal & Math Lead",
      qualification: "M.Sc. Mathematics, B.Ed.",
      experience: "15+ Years Experience",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=450&q=80",
      email: "ananya.s@joyemhighschool.edu",
    },
    {
      name: "Mr. David Miller",
      role: "Head of Science Department",
      qualification: "M.Sc. Chemistry, M.Ed.",
      experience: "12+ Years Experience",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=450&q=80",
      email: "david.m@joyemhighschool.edu",
    },
    {
      name: "Mrs. Sarah D'Souza",
      role: "English Language Specialist",
      qualification: "M.A. English Literature, B.Ed.",
      experience: "10+ Years Experience",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=450&q=80",
      email: "sarah.d@joyemhighschool.edu",
    },
    {
      name: "Mrs. Priya Nair",
      role: "Classes 1-5 Coordinator",
      qualification: "M.A. Child Psychology, B.Ed.",
      experience: "8+ Years Experience",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&h=450&q=80",
      email: "priya.n@joyemhighschool.edu",
    },
    {
      name: "Mr. Rajesh Sharma",
      role: "Physical Education Director",
      qualification: "M.P.Ed. (Master of Physical Education)",
      experience: "11+ Years Experience",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=450&q=80",
      email: "rajesh.s@joyemhighschool.edu",
    },
  ];

  return (
    <section
      id="faculty"
      className="py-20 bg-white dark:bg-background border-y border-primary/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Our Mentors
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Dedicated & Experienced Faculty
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            Our educators are passion-driven mentors, dedicated to building academic excellence and moral leadership. We maintain a healthy student-teacher ratio to ensure individual attention.
          </p>
        </div>

        {/* Scrollable Faculty Wrapper */}
        <div className="relative group/scroll max-w-6xl mx-auto">
          {/* Scroll Left Button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-primary/90 text-white p-3.5 rounded-full hover:bg-accent hover:text-primary-dark transition-all duration-300 shadow-xl border border-white/10 hidden md:flex items-center justify-center opacity-0 group-hover/scroll:opacity-100"
            title="Scroll Left"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Scroll Right Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-primary/90 text-white p-3.5 rounded-full hover:bg-accent hover:text-primary-dark transition-all duration-300 shadow-xl border border-white/10 hidden md:flex items-center justify-center opacity-0 group-hover/scroll:opacity-100"
            title="Scroll Right"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Faculty Horizontal Scroller */}
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {staff.map((person, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[320px] max-w-[340px] snap-center group rounded-2xl border border-primary/10 overflow-hidden bg-white dark:bg-primary-dark/15 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full flex-shrink-0"
              >
                {/* Photo & Hover overlay */}
                <div className="relative aspect-[4/4.2] overflow-hidden bg-gray-100 dark:bg-primary-dark/30">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Qualification badge */}
                  <div className="absolute bottom-3 left-3 bg-primary/90 text-white text-[10px] sm:text-xs font-bold py-1 px-2.5 rounded-lg flex items-center gap-1.5 backdrop-blur-sm">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    <span>{person.experience}</span>
                  </div>

                  {/* Email / LinkedIn Links overlay */}
                  <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={`mailto:${person.email}`}
                      className="p-3 bg-white hover:bg-accent text-primary hover:text-primary-dark rounded-full shadow-lg transition-colors duration-200"
                      title="Send Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="p-3 bg-white hover:bg-accent text-primary hover:text-primary-dark rounded-full shadow-lg transition-colors duration-200"
                      title="View LinkedIn Profile"
                    >
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Text details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-1">
                    <h3 className="font-display text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors duration-200">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold text-accent dark:text-accent-light uppercase tracking-wide">
                      {person.role}
                    </p>
                  </div>
                  <div className="border-t border-primary/5 pt-4 mt-4">
                    <p className="text-xs sm:text-sm text-foreground/75 dark:text-foreground/80 italic">
                      {person.qualification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Small trust banner */}
        <div className="mt-16 text-center text-sm font-semibold text-foreground/60 dark:text-foreground/75">
          All our educators participate in quarterly curriculum enhancement workshops and pediatric safety training.
        </div>
      </div>
    </section>
  );
}
