"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Edit2, Trash2, Loader2, Calendar, Image as ImageIcon, Filter } from "lucide-react";
import EventForm from "./EventForm";
import Image from "next/image";

export default function EventTable() {
  const [events, setEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Initialize and load from Express backend
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (data.success) {
          setEvents(data.events || []);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Filter events in memory
  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        return categoryFilter === "All" || evt.category === categoryFilter;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort chronologically
  }, [events, categoryFilter]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event from the calendar?")) {
      try {
        const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
        const res = await response.json();
        if (res.success) {
          setEvents((prev) => prev.filter((e) => e._id !== id));
        } else {
          alert(res.error || "Failed to delete calendar event");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete calendar event");
      }
    }
  };

  const handleSave = async (savedEvent) => {
    try {
      const isEdit = !!savedEvent._id;
      
      const formData = new FormData();
      formData.append("title", savedEvent.title);
      formData.append("description", savedEvent.description);
      formData.append("date", savedEvent.date);
      formData.append("category", savedEvent.category);
      
      if (savedEvent.imageFile) {
        formData.append("imageFile", savedEvent.imageFile);
      } else {
        formData.append("existingImage", savedEvent.existingImage);
      }

      let response;
      if (isEdit) {
        response = await fetch(`/api/events/${savedEvent._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("/api/events", {
          method: "POST",
          body: formData,
        });
      }
      
      const data = await response.json();
      if (data.success) {
        setEvents((prev) => {
          if (isEdit) {
            return prev.map((e) => (e._id === savedEvent._id ? data.event : e));
          } else {
            return [data.event, ...prev];
          }
        });
      } else {
        alert(data.error || "Failed to save calendar event");
        throw new Error(data.error);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };


  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleAddClick = () => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const categories = ["All", "Academic", "Holiday", "Co-curricular", "Sports", "Achievement", "Other"];

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md p-5 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl shadow-sm">
        {/* Category Filter */}
        <div className="relative w-full sm:max-w-xs flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Events" : `${cat} Events`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddClick}
          className="px-5 py-2.5 bg-primary hover:bg-accent text-white rounded-xl text-sm font-bold shadow-md shadow-primary/10 transition-all duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 dark:bg-zinc-900/65 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl overflow-hidden shadow-md">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Querying database records...</span>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-20 text-center text-slate-400 text-sm">
            No calendar events scheduled.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-950 text-slate-400 dark:text-zinc-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-100 dark:border-zinc-850">
                  <th className="px-6 py-4 w-28">Flyer</th>
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Event Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-zinc-850">
                {filteredEvents.map((evt) => (
                  <tr
                    key={evt._id}
                    className="hover:bg-slate-50/40 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {evt.image ? (
                        <div className="relative w-20 aspect-[16/10] rounded-lg overflow-hidden border border-slate-150 dark:border-zinc-800 shadow-sm">
                          <Image
                            src={evt.image}
                            alt={evt.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 aspect-[16/10] bg-slate-100 dark:bg-zinc-850 rounded-lg flex items-center justify-center text-slate-400 border border-slate-200 dark:border-zinc-800">
                          <ImageIcon className="h-5 w-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm max-w-sm">
                      <div className="font-bold text-slate-800 dark:text-white">
                        {evt.title}
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
                        {evt.description || "No description provided."}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          evt.category === "Holiday"
                            ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                            : evt.category === "Academic"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-450"
                            : "bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400"
                        }`}
                      >
                        {evt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-650 dark:text-zinc-400 text-sm">
                      <div className="flex items-center space-x-1.5 font-semibold">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{formatDate(evt.date)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditClick(evt)}
                          className="p-2 rounded-xl text-slate-450 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                          title="Edit Event"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(evt._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-450 transition-all duration-200"
                          title="Delete Event"
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
        <EventForm
          event={selectedEvent}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
