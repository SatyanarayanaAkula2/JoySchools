"use client";

import { GraduationCap, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Footer({ settings }) {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: School Branding (Col-span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScrollTo("hero")}>
              <div className="relative h-10 w-10 rounded-xl overflow-hidden shadow-sm border border-white/20 bg-white p-0.5 shrink-0">
                <Image
                  src="/logo.png"
                  alt="JOY E.M SCHOOL Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl font-black tracking-tight uppercase">
                 JOY E.M <span className="text-accent">HIGH SCHOOL</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-300 leading-relaxed max-w-md">
              Dedicated to nurturing creative, responsible, and academically excellent individuals since 2016. Providing quality Nursery to 10th English Medium education under the State Board curriculum.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  ),
                  label: "Facebook",
                  href: settings?.facebook || "#",
                  target: settings?.facebook ? "_blank" : undefined,
                  rel: settings?.facebook ? "noopener noreferrer" : undefined,
                },
                {
                  icon: (
                    <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  label: "Instagram",
                  href: settings?.instagram || "https://www.instagram.com/joy_em_high_school/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                {
                  icon: (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ),
                  label: "Twitter",
                  href: settings?.twitter || "#",
                  target: settings?.twitter ? "_blank" : undefined,
                  rel: settings?.twitter ? "noopener noreferrer" : undefined,
                },
                {
                  icon: (
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.525 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.866.502-5.837.502-5.837s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  ),
                  label: "Youtube",
                  href: settings?.youtube || "#",
                  target: settings?.youtube ? "_blank" : undefined,
                  rel: settings?.youtube ? "noopener noreferrer" : undefined,
                },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.target}
                  rel={item.rel}
                  onClick={(e) => {
                    if (item.href === "#") e.preventDefault();
                  }}
                  className="p-2.5 bg-white/5 hover:bg-accent text-white hover:text-primary-dark rounded-lg transition-all duration-200"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation Links (Col-span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {[
                { name: "Home", id: "hero" },
                { name: "About Us", id: "about" },
                { name: "Academics", id: "classes" },
                { name: "Holistic Development", id: "activities" },
                { name: "Events", id: "events" },
                { name: "Achievements", id: "achievements" },
                { name: "Milestones", id: "milestones" },
                { name: "Gallery", id: "gallery" },
                { name: "Contact", id: "contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="hover:text-accent transition-colors duration-200 text-left focus:outline-none"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Contact & Newsletter (Col-span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-accent">
              Contact Office
            </h4>
            
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                <span className="whitespace-pre-line">{settings?.address || "108 Joy Hills Road, Sector 4, Bangalore, 560034"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="whitespace-pre-line">{settings?.phone ? settings.phone.split("\n")[0] : "+91 80 4321 8765"}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="whitespace-pre-line">{settings?.email ? settings.email.split("\n")[0] : "info@joyemhighschool.edu"}</span>
              </li>
            </ul>

            {/* Newsletter form mock */}
            <div className="pt-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Join Mailing List
              </h5>
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input
                  type="email"
                  placeholder="Parent's email"
                  required
                  className="px-3 py-2 text-xs rounded-l-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:border-accent w-full"
                />
                <button
                  type="submit"
                  className="px-3 bg-accent text-primary-dark font-bold text-xs rounded-r-lg hover:bg-accent-dark transition-all"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright area */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            &copy; {currentYear} JOY E.M HIGH SCHOOL. All rights reserved.
          </div>
          
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-accent">Sitemap</a>
          </div>

          <button
            onClick={() => handleScrollTo("hero")}
            className="p-2.5 bg-white/5 hover:bg-accent hover:text-primary-dark rounded-full transition-all focus:outline-none scroll-smooth shadow-md"
            title="Scroll to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
