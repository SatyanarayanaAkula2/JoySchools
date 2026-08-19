"use client";

import { useState, useEffect } from "react";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { Loader2, Save, Globe, Phone, Image as ImageIcon, Upload } from "lucide-react";
import Image from "next/image";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");

  // Existing Image URLs
  const [existingAdminImage, setExistingAdminImage] = useState("");
  const [existingHeroSlides, setExistingHeroSlides] = useState(["", "", "", ""]);

  // Local Previews
  const [adminImagePreview, setAdminImagePreview] = useState("");
  const [heroSlidePreviews, setHeroSlidePreviews] = useState(["", "", "", ""]);

  // Selected Files
  const [adminImageFile, setAdminImageFile] = useState(null);
  const [heroSlideFiles, setHeroSlideFiles] = useState([null, null, null, null]);

  // Load Settings on Mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          const s = data.settings;
          setEmail(s.email || "");
          setPhone(s.phone || "");
          setAddress(s.address || "");
          setFacebook(s.facebook || "");
          setInstagram(s.instagram || "");
          setTwitter(s.twitter || "");
          setYoutube(s.youtube || "");
          
          setExistingAdminImage(s.adminImage || "");
          setAdminImagePreview(s.adminImage || "");

          const slides = s.heroSlides || ["", "", "", ""];
          // Ensure length is 4
          while (slides.length < 4) slides.push("");
          setExistingHeroSlides(slides);
          setHeroSlidePreviews(slides);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleAdminImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminImageFile(file);
      setAdminImagePreview(URL.createObjectURL(file));
    }
  };

  const handleHeroSlideChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newFiles = [...heroSlideFiles];
      newFiles[index] = file;
      setHeroSlideFiles(newFiles);

      const newPreviews = [...heroSlidePreviews];
      newPreviews[index] = URL.createObjectURL(file);
      setHeroSlidePreviews(newPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("facebook", facebook);
      formData.append("instagram", instagram);
      formData.append("twitter", twitter);
      formData.append("youtube", youtube);

      // Append admin file / existing
      if (adminImageFile) {
        formData.append("adminImageFile", adminImageFile);
      } else {
        formData.append("existingAdminImage", existingAdminImage);
      }

      // Append hero files / existing
      heroSlideFiles.forEach((file, idx) => {
        if (file) {
          formData.append(`heroSlideFile${idx + 1}`, file);
        } else {
          formData.append(`existingHeroSlide${idx + 1}`, existingHeroSlides[idx] || "");
        }
      });

      const response = await fetch("/api/settings", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Configuration settings updated successfully!");
        
        // Refresh local states with fresh data from server
        const s = data.settings;
        setEmail(s.email || "");
        setPhone(s.phone || "");
        setAddress(s.address || "");
        setFacebook(s.facebook || "");
        setInstagram(s.instagram || "");
        setTwitter(s.twitter || "");
        setYoutube(s.youtube || "");
        setExistingAdminImage(s.adminImage || "");
        setAdminImagePreview(s.adminImage || "");
        
        const slides = s.heroSlides || ["", "", "", ""];
        setExistingHeroSlides(slides);
        setHeroSlidePreviews(slides);
        
        // Clear file buffers
        setAdminImageFile(null);
        setHeroSlideFiles([null, null, null, null]);
      } else {
        alert(data.error || "Failed to update configurations");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save changes. Network error.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", name: "General & Branding", icon: ImageIcon },
    { id: "contact", name: "Contact Details", icon: Phone },
    { id: "social", name: "Social Links", icon: Globe },
  ];

  return (
    <AdminLayoutWrapper title="School Configuration Settings">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <p className="text-slate-455 dark:text-zinc-400 text-sm">
            Configure school identity details, support helpline channels, map location pins, and external social media hyperlinks. Changes take effect on the landing page immediately.
          </p>
        </div>

        {loading ? (
          <div className="p-20 bg-white/80 dark:bg-zinc-900/65 border border-slate-200/50 dark:border-zinc-800/40 rounded-3xl flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="text-slate-400 text-sm">Loading school configurations...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* Sidebar Tabs Selector */}
            <div className="lg:col-span-1 bg-white/80 dark:bg-zinc-900/65 border border-slate-200/50 dark:border-zinc-800/40 p-4 rounded-3xl space-y-1.5">
              <span className="block text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-3 mb-2">
                Settings Modules
              </span>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 text-left ${
                      active
                        ? "bg-primary text-white border-primary dark:bg-accent dark:text-zinc-950 dark:border-accent"
                        : "text-slate-500 dark:text-zinc-400 border-transparent hover:bg-slate-100/60 dark:hover:bg-zinc-800/40 hover:text-primary dark:hover:text-accent"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Config Fields Container */}
            <div className="lg:col-span-3 bg-white/80 dark:bg-zinc-900/65 border border-slate-200/50 dark:border-zinc-800/40 p-6 sm:p-8 rounded-3xl shadow-sm space-y-8">
              
              {/* TAB 1: General & Branding */}
              {activeTab === "general" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">Vision & Mission Profile Picture</h3>
                    <p className="text-xs text-slate-400 mt-0.5">This image displays next to the administrator message on the main website.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
                      {adminImagePreview && (
                        <div className="relative w-32 aspect-square rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm shrink-0">
                          <Image
                            src={adminImagePreview}
                            alt="Administrator"
                            fill
                            sizes="128px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <label className="cursor-pointer bg-slate-550 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100/50 dark:hover:bg-zinc-900/50 px-5 py-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-zinc-300 shadow-sm transition-all duration-200 flex items-center space-x-2">
                        <Upload className="h-4 w-4" />
                        <span>Upload Administrator Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAdminImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <hr className="border-slate-100 dark:border-zinc-850" />

                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">Homepage Image Carousel Slides</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Upload 4 custom sliding images to showcase student classes, sports, labs, and library.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      {[0, 1, 2, 3].map((idx) => (
                        <div key={idx} className="border border-slate-200 dark:border-zinc-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-zinc-950/20 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Slide {idx + 1}</span>
                          </div>
                          
                          {heroSlidePreviews[idx] ? (
                            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-850 shadow-sm">
                              <Image
                                src={heroSlidePreviews[idx]}
                                alt={`Slide ${idx + 1}`}
                                fill
                                sizes="(max-width: 450px) 100vw, 300px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-full aspect-[16/10] bg-slate-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center text-slate-400 border border-slate-250 dark:border-zinc-800">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}

                          <label className="cursor-pointer w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-350 shadow-sm transition-all duration-200 flex items-center justify-center space-x-1.5">
                            <Upload className="h-3.5 w-3.5" />
                            <span>Select Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleHeroSlideChange(idx, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Contact Details */}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">Contact details</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Manage details displayed in the Admissions inquiry widget and website footer.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Phone Lines (Use newlines to add lines)
                      </label>
                      <textarea
                        rows={2}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. Admissions Desk: +91 80 4321 8765&#10;Front Office Support: +91 98765 43210"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Electronic Mail (Use newlines to add lines)
                      </label>
                      <textarea
                        rows={2}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. Admissions: admissions@joyemhighschool.edu&#10;General Info: info@joyemhighschool.edu"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Campus Address (Use newlines to add lines)
                      </label>
                      <textarea
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. 108 Joy Hills Road, Sector 4,&#10;Bangalore, KA, India - 560034"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Social Links */}
              {activeTab === "social" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-base">Social Networks & Media Profiles</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Connect with parents on online hubs by saving official URLs.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {/* Facebook */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Facebook Handle
                      </label>
                      <input
                        type="url"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        placeholder="e.g. https://facebook.com/joyschool"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Instagram Profile Link
                      </label>
                      <input
                        type="url"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        placeholder="https://www.instagram.com/joy_em_high_school/"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
                      />
                    </div>

                    {/* Twitter */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        X / Twitter Profile Link
                      </label>
                      <input
                        type="url"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        placeholder="e.g. https://x.com/joyschool"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
                      />
                    </div>

                    {/* Youtube */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                        Youtube Channel Link
                      </label>
                      <input
                        type="url"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                        placeholder="e.g. https://youtube.com/c/joyschool"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-100 dark:border-zinc-850 mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3.5 bg-primary text-white text-sm font-bold rounded-2xl hover:bg-accent transition-all duration-200 shadow-md shadow-primary/10 flex items-center space-x-2 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  ) : (
                    <Save className="h-4.5 w-4.5" />
                  )}
                  <span>Save Changes</span>
                </button>
              </div>

            </div>

          </form>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
