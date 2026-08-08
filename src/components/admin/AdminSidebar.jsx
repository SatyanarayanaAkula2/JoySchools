"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Trophy,
  School,
  ChevronRight,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard, desc: "Console Home" },
    { name: "Students", href: "/admin/students", icon: Users, desc: "Registrations" },
    { name: "Faculty", href: "/admin/faculty", icon: GraduationCap, desc: "Mentor Directory" },
    { name: "Events", href: "/admin/events", icon: Calendar, desc: "School Calendar" },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, desc: "Media Uploads" },
    { name: "Achievements", href: "/admin/achievements", icon: Trophy, desc: "Awards Log" },
  ];

  return (
    <aside className="w-64 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl flex flex-col border-r border-primary/5 dark:border-zinc-800/40 relative overflow-hidden shrink-0">
      {/* Decorative inner glows */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/5 rounded-full filter blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 -right-12 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none" />

      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-primary/5 dark:border-zinc-800/20 space-x-3 z-10">
        <div className="p-2.5 bg-gradient-to-tr from-primary to-accent rounded-2xl shadow-lg shadow-primary/20">
          <School className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-black text-sm tracking-widest uppercase text-primary dark:text-white">
            Joy Schools
          </span>
          <span className="text-[9px] text-accent font-bold uppercase tracking-wider mt-0.5">
            Admin Console
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto z-10 scrollbar-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group border text-sm font-semibold ${
                isActive
                  ? "bg-primary/5 text-primary border-primary/10 shadow-sm shadow-primary/5 dark:bg-accent/10 dark:text-accent dark:border-accent/10"
                  : "text-slate-500 dark:text-zinc-400 border-transparent hover:bg-slate-100/60 dark:hover:bg-zinc-900/40 hover:text-primary dark:hover:text-accent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white dark:bg-accent dark:text-zinc-950 shadow-md shadow-primary/10"
                    : "bg-slate-50 dark:bg-zinc-900 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary dark:group-hover:bg-accent/10 dark:group-hover:text-accent"
                }`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-bold tracking-wide">{item.name}</span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                    {item.desc}
                  </span>
                </div>
              </div>
              <ChevronRight
                className={`h-4 w-4 transition-all duration-300 ${
                  isActive
                    ? "text-primary dark:text-accent opacity-100 translate-x-0"
                    : "text-slate-450 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Footer controls */}
      <div className="p-4 border-t border-primary/5 dark:border-zinc-800/20 bg-white/45 dark:bg-zinc-950/20 z-10 text-center text-[9px] text-slate-400 dark:text-zinc-550 font-bold uppercase tracking-widest">
        Sandbox Console
      </div>
    </aside>
  );
}
