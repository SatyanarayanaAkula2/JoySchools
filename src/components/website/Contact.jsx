"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function Contact({ settings }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50/80 dark:bg-background border-t border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Admissions
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Connect With Us
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            Have questions about the admission process, curriculum, fee structure, or school transport? Reach out and we will get back to you shortly.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Details & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="font-display text-2xl font-bold text-primary dark:text-white">
                Contact Details
              </h3>
              <p className="text-sm text-foreground/70 dark:text-foreground/80 leading-relaxed">
                Parents are welcome to visit our administrative office during visiting hours for queries regarding registration, campus tours, and counselor interactions.
              </p>
            </div>

            {/* Icons Block */}
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-light/30 dark:bg-primary-dark/10 border border-primary/5">
                <div className="p-2.5 rounded-lg bg-primary text-white dark:bg-primary/20 dark:text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Campus Address</h4>
                  <p className="text-sm text-foreground/75 dark:text-foreground/80 mt-1 leading-relaxed whitespace-pre-line">
                    {settings?.address || "108 Joy Hills Road, Sector 4,\nBangalore, KA, India - 560034"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-light/30 dark:bg-primary-dark/10 border border-primary/5">
                <div className="p-2.5 rounded-lg bg-primary text-white dark:bg-primary/20 dark:text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Phone Lines</h4>
                  <p className="text-sm text-foreground/75 dark:text-foreground/80 mt-1 whitespace-pre-line">
                    {settings?.phone || "Admissions Desk: +91 80 4321 8765\nFront Office Support: +91 98765 43210"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-light/30 dark:bg-primary-dark/10 border border-primary/5">
                <div className="p-2.5 rounded-lg bg-primary text-white dark:bg-primary/20 dark:text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Electronic Mail</h4>
                  <p className="text-sm text-foreground/75 dark:text-foreground/80 mt-1 whitespace-pre-line">
                    {settings?.email || "Admissions: admissions@joyemhighschool.edu\nGeneral Info: info@joyemhighschool.edu"}
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-light/30 dark:bg-primary-dark/10 border border-primary/5">
                <div className="p-2.5 rounded-lg bg-primary text-white dark:bg-primary/20 dark:text-accent">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary dark:text-white uppercase tracking-wider">Office Hours</h4>
                  <p className="text-sm text-foreground/75 dark:text-foreground/80 mt-1 whitespace-pre-line">
                    {settings?.officeHours || "Monday – Friday: 8:30 AM – 5:00 PM\nSaturday: 9:00 AM – 4:00 PM (Closed on Sundays)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Dynamic Embed */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-primary/10 shadow-md">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  settings?.address || "JOY E.M SCHOOL, Bangalore, India"
                )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JOY E.M SCHOOL Campus Location Map"
                className="contrast-[0.95]"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Admission Inquiry Form */}
          <div className="lg:col-span-7 bg-primary-light/20 dark:bg-primary-dark/10 border border-primary/10 p-8 sm:p-10 rounded-2xl shadow-sm relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none" />

            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold text-primary dark:text-white mb-2">
                Admission Inquiry
              </h3>
              <p className="text-sm text-foreground/70 dark:text-foreground/80 mb-8">
                Submit this quick form and an admissions coordinator will contact you to schedule a campus visit and share relevant fee handouts.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-scale-up">
                  <div className="inline-flex p-3 bg-emerald-500 rounded-full text-white mx-auto shadow-md">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-emerald-800 dark:text-emerald-400">
                    Form Submitted Successfully!
                  </h4>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in JOY E.M HIGH SCHOOL. Our counseling department will review your details and connect with you via email or phone within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-900 text-white font-semibold text-sm transition-all"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="px-4 py-3 rounded-xl border border-primary/10 dark:border-white/10 bg-white dark:bg-background text-foreground focus:outline-none focus:border-primary dark:focus:border-accent text-sm transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className="px-4 py-3 rounded-xl border border-primary/10 dark:border-white/10 bg-white dark:bg-background text-foreground focus:outline-none focus:border-primary dark:focus:border-accent text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 9876543210"
                        className="px-4 py-3 rounded-xl border border-primary/10 dark:border-white/10 bg-white dark:bg-background text-foreground focus:outline-none focus:border-primary dark:focus:border-accent text-sm transition-all"
                      />
                    </div>

                    {/* Grade for Admission */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="grade" className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
                        Class/Grade of Interest
                      </label>
                      <select
                        name="grade"
                        id="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className="px-4 py-3 rounded-xl border border-primary/10 dark:border-white/10 bg-white dark:bg-background text-foreground focus:outline-none focus:border-primary dark:focus:border-accent text-sm transition-all cursor-pointer"
                      >
                        <option value="" disabled>Select Grade...</option>
                        <option value="Nursery">Nursery</option>
                        <option value="LKG">LKG</option>
                        <option value="UKG">UKG</option>
                        <option value="Class 1-5">Classes 1 - 5</option>
                        <option value="Class 6-8">Classes 6 - 8</option>
                        <option value="Class 9-10">Classes 9 - 10</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">
                      Your Query / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your query here..."
                      className="px-4 py-3 rounded-xl border border-primary/10 dark:border-white/10 bg-white dark:bg-background text-foreground focus:outline-none focus:border-primary dark:focus:border-accent text-sm transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-base shadow-md transition-all disabled:opacity-75 disabled:cursor-not-allowed dark:bg-accent dark:hover:bg-accent-dark dark:text-primary-dark"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white dark:border-primary border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
