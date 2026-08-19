"use client";

import { useState, useEffect } from "react";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Calendar,
  Image as ImageIcon,
  Trophy,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function AdminPage() {
  const [counts, setCounts] = useState({
    students: null,
    faculty: null,
    events: null,
    gallery: null,
    achievements: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [
          resStudents,
          resFaculty,
          resEvents,
          resGallery,
          resAchievements,
        ] = await Promise.allSettled([
          fetch("/api/students").then((r) => r.json()),
          fetch("/api/faculty").then((r) => r.json()),
          fetch("/api/events").then((r) => r.json()),
          fetch("/api/gallery").then((r) => r.json()),
          fetch("/api/achievements").then((r) => r.json()),
        ]);

        setCounts({
          students:
            resStudents.status === "fulfilled" && resStudents.value?.success
              ? (resStudents.value.students?.length ?? 0)
              : 0,
          faculty:
            resFaculty.status === "fulfilled" && resFaculty.value?.success
              ? (resFaculty.value.faculty?.length ?? 0)
              : 0,
          events:
            resEvents.status === "fulfilled" && resEvents.value?.success
              ? (resEvents.value.events?.length ?? 0)
              : 0,
          gallery:
            resGallery.status === "fulfilled" && resGallery.value?.success
              ? (resGallery.value.gallery?.length ?? 0)
              : 0,
          achievements:
            resAchievements.status === "fulfilled" && resAchievements.value?.success
              ? (resAchievements.value.achievements?.length ?? 0)
              : 0,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  const cards = [
    {
      name: "Students Registered",
      count: counts.students,
      description: "Manage classes, roll logs, and profile records.",
      icon: Users,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
      href: "/admin/students",
      badge: "Classroom Directory",
    },
    {
      name: "Faculty Profiles",
      count: counts.faculty,
      description: "Manage school teacher and principal profiles.",
      icon: GraduationCap,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
      href: "/admin/faculty",
      badge: "Mentor Roster",
    },
    {
      name: "Calendar Events",
      count: counts.events,
      description: "Schedule school festivals, assemblies, and holidays.",
      icon: Calendar,
      color: "text-sky-500 bg-sky-50 dark:bg-sky-950/30",
      href: "/admin/events",
      badge: "Announcements",
    },
    {
      name: "Gallery Media",
      count: counts.gallery,
      description: "Upload sports meet and cultural fest photos.",
      icon: ImageIcon,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
      href: "/admin/gallery",
      badge: "Photo Albums",
    },
    {
      name: "Award Milestones",
      count: counts.achievements,
      description: "Display academic honors and olympiad victories.",
      icon: Trophy,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/30",
      href: "/admin/achievements",
      badge: "Accolades Log",
    },
  ];

  return (
    <AdminLayoutWrapper title="Dashboard Overview">
      <div className="space-y-8 relative">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-primary via-primary/95 to-accent rounded-[2rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden border border-white/10">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full filter blur-2xl transform translate-x-1/4 -translate-y-1/4 pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full border border-white/10">
              Control Panel Active
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome back, Administrator!
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Manage your school's student registrations, faculty catalog, public events scheduling, and photo display modules seamlessly from this interface.
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-white/70 dark:bg-zinc-900/40 backdrop-blur-md border border-primary/5 hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual badge top right */}
                <div className="absolute top-4 right-4 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  {card.badge}
                </div>

                <div className="p-6 space-y-4">
                  {/* Icon Block */}
                  <div className={`p-3 w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center shadow-inner transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  
                  {/* Counts and Title */}
                  <div className="space-y-1">
                    <div className="font-display text-4xl font-black text-primary dark:text-accent tracking-tight flex items-center min-h-[40px]">
                      {loading || card.count === null ? (
                        <span className="inline-block w-12 h-8 bg-slate-200 dark:bg-zinc-800 animate-pulse rounded-lg" />
                      ) : (
                        card.count
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">
                      {card.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Footer link */}
                <div className="px-6 py-4 bg-slate-50/50 dark:bg-zinc-950/20 border-t border-primary/5 dark:border-zinc-800/20">
                  <Link
                    href={card.href}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-accent hover:text-primary transition-colors duration-250"
                  >
                    <span>Manage Module</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform duration-250 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
