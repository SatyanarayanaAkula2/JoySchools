"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import MilestoneForm from "./MilestoneForm";

export default function MilestoneTable() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load milestones from backend
  useEffect(() => {
    const loadMilestones = async () => {
      try {
        setError("");
        const response = await fetch("/api/milestones");
        const data = await response.json();
        if (data.success) {
          setMilestones(data.milestones || []);
        } else {
          setError(data.error || "Failed to load milestones");
        }
      } catch (err) {
        console.error("Failed to load milestones:", err);
        setError("Network error: Could not reach the server.");
      } finally {
        setLoading(false);
      }
    };
    loadMilestones();
  }, []);

  // Sort local list by display order
  const sortedMilestones = useMemo(() => {
    return [...milestones].sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order;
      }
      return a.label.localeCompare(b.label);
    });
  }, [milestones]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this school milestone?")) {
      try {
        const response = await fetch(`/api/milestones/${id}`, { method: "DELETE" });
        const res = await response.json();
        if (res.success) {
          setMilestones((prev) => prev.filter((m) => m._id !== id));
        } else {
          alert(res.error || "Failed to delete milestone");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete milestone");
      }
    }
  };

  const handleSave = async (savedItem) => {
    try {
      const isEdit = !!savedItem._id;
      let response;
      if (isEdit) {
        response = await fetch(`/api/milestones/${savedItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedItem),
        });
      } else {
        response = await fetch("/api/milestones", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(savedItem),
        });
      }
      const data = await response.json();
      if (data.success) {
        setMilestones((prev) => {
          if (isEdit) {
            return prev.map((m) => (m._id === savedItem._id ? data.milestone : m));
          } else {
            return [...prev, data.milestone];
          }
        });
      } else {
        alert(data.error || "Failed to save milestone details");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleEditClick = (item) => {
    setSelectedMilestone(item);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedMilestone(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        <div className="flex flex-col text-left">
          <h3 className="font-bold text-slate-800 dark:text-white">Active Milestones</h3>
          <p className="text-xs text-slate-400">Total legacy highlights displayed on landing page</p>
        </div>

        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl overflow-hidden shadow-md">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Querying database records...</span>
          </div>
        ) : error ? (
          <div className="p-20 text-center text-rose-500 font-semibold text-sm">
            {error}
          </div>
        ) : sortedMilestones.length === 0 ? (
          <div className="p-20 text-center text-slate-400 text-sm">
            No milestones configured.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-850">
                  <th className="px-6 py-4 w-20">Icon</th>
                  <th className="px-6 py-4">Stat Value</th>
                  <th className="px-6 py-4">Label / Description</th>
                  <th className="px-6 py-4 w-28">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                {sortedMilestones.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-2xl">
                      {item.icon}
                    </td>
                    <td className="px-6 py-4 font-black text-primary dark:text-accent text-lg">
                      {item.value}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {item.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-650 dark:text-zinc-400 text-sm">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-450">
                        {item.order !== undefined ? item.order : 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2 rounded-xl text-slate-450 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                          title="Edit Milestone"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-450 transition-all duration-200"
                          title="Delete Milestone"
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
        <MilestoneForm
          milestone={selectedMilestone}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
