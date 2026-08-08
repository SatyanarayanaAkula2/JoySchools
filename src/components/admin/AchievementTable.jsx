"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Trophy } from "lucide-react";
import AchievementForm from "./AchievementForm";
import Image from "next/image";

const INITIAL_MOCK_ACHIEVEMENTS = [
  {
    _id: "ach_1",
    title: "National Science Olympiad",
    category: "Academic Excellence",
    year: "2025 - 2026",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=500&q=80",
    description: "Two of our Class 10 students secured Top 50 national ranks in the National Science Olympiad, showcasing our strong emphasis on conceptual STEM learning.",
  },
  {
    _id: "ach_2",
    title: "State Basketball Champions",
    category: "Sports & Athletics",
    year: "2025",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=500&q=80",
    description: "Our Under-16 basketball team bagged the gold medal at the State Level Inter-School Sports Meet, maintaining our undefeated streak for the season.",
  },
  {
    _id: "ach_3",
    title: "Eco-School of the Year",
    category: "Environmental Leadership",
    year: "2024 - 2025",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
    description: "Recognized by the Environmental Board for our zero-waste initiative, active student green club, and 100% solar-powered campus infrastructure.",
  },
];

export default function AchievementTable() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAchievements(INITIAL_MOCK_ACHIEVEMENTS);
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this achievement record?")) {
      setAchievements((prev) => prev.filter((a) => a._id !== id));
    }
  };

  const handleSave = (savedAch) => {
    setAchievements((prev) => {
      const exists = prev.some((a) => a._id === savedAch._id);
      if (exists) {
        return prev.map((a) => (a._id === savedAch._id ? savedAch : a));
      } else {
        return [savedAch, ...prev];
      }
    });
  };

  const handleEditClick = (achievement) => {
    setSelectedAchievement(achievement);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedAchievement(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex items-center justify-between bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        <p className="text-slate-450 dark:text-zinc-400 text-sm font-semibold hidden md:block">
          Manage milestones showing on the homepage. Sorted from newest to oldest.
        </p>
        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center space-x-2 ml-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl overflow-hidden shadow-md">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Querying database records...</span>
          </div>
        ) : achievements.length === 0 ? (
          <div className="p-20 text-center text-slate-400 text-sm">
            No achievement records listed in the system yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-850">
                  <th className="px-6 py-4 w-28">Photo</th>
                  <th className="px-6 py-4">Title & Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 w-28 text-center">Academic Year</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                {achievements.map((ach) => (
                  <tr
                    key={ach._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {ach.image ? (
                        <div className="relative w-20 aspect-[16/10] rounded-lg overflow-hidden border border-slate-150 dark:border-zinc-800 shadow-sm">
                          <Image
                            src={ach.image}
                            alt={ach.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 aspect-[16/10] bg-slate-100 dark:bg-zinc-850 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 dark:border-zinc-800">
                          <Trophy className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-sm">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {ach.title}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                        {ach.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-405">
                        {ach.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-semibold text-slate-655 dark:text-zinc-400 text-sm">
                      {ach.year}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(ach)}
                          className="p-2 rounded-xl text-slate-455 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                          title="Edit Achievement"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ach._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-450 transition-all duration-200"
                          title="Delete Achievement"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isFormOpen && (
        <AchievementForm
          achievement={selectedAchievement}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
