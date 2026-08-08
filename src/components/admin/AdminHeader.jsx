"use client";

import { User, ShieldCheck } from "lucide-react";

export default function AdminHeader({ title }) {
  return (
    <header className="h-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-slate-200/60 dark:border-zinc-800/40 px-8 flex items-center justify-between shadow-sm z-25 sticky top-0">
      {/* Title block */}
      <div className="flex flex-col">
        <h2 className="font-display text-xl font-black text-slate-800 dark:text-white capitalize tracking-tight">
          {title || "Admin Panel"}
        </h2>
        <span className="text-[10px] text-slate-450 dark:text-zinc-500 font-semibold mt-0.5 hidden sm:inline">
          JOY E.M HIGH SCHOOL | Management Console
        </span>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Connection status tag */}
        <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/20 text-[10px] font-bold uppercase tracking-wider animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Developer Mode (Auth Deactivated)</span>
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-3 bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/50 dark:border-zinc-800/40 px-4 py-2 rounded-2xl shadow-sm">
          <div className="relative">
            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-md">
              <User className="h-3.5 w-3.5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-emerald-500 rounded-full border border-white dark:border-zinc-900" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-extrabold text-slate-700 dark:text-zinc-200">
              System Admin
            </span>
            <span className="text-[9px] text-slate-400 dark:text-zinc-400 font-bold uppercase tracking-wide flex items-center">
              <ShieldCheck className="h-2.5 w-2.5 mr-0.5 text-accent" />
              Super User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
