"use client";

import { Smile, BookOpen, Layers, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ClassesOffering() {
  const classesData = [
    {
      level: "Nursery",
      grades: "Nursery, LKG, UKG",
      ageGroup: "3 - 5 Years",
      icon: <Smile className="h-6 w-6 text-sky-400" />,
      image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=600&q=80",
      colorClass: "from-blue-950 via-blue-900 to-indigo-950 border-blue-800/60 text-white hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]",
      accentBg: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
      description: "A warm, play-based setting focusing on fine motor skills, early social values, language foundation, and sensory cognitive play.",
      curriculum: [
        "Playway & Montessori methodologies",
        "Fine motor skill development",
        "Sensory & activity-based math foundations",
        "Phonics & vocabulary building",
      ],
    },
    {
      level: "Primary School",
      grades: "Class 1 - 5",
      ageGroup: "6 - 10 Years",
      icon: <BookOpen className="h-6 w-6 text-sky-400" />,
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
      colorClass: "from-indigo-950 via-slate-900 to-blue-950 border-indigo-900/60 text-white hover:border-indigo-400/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
      accentBg: "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
      description: "Fostering strong academic foundations in reading, grammar, logical thinking, sciences, and computers through active learning modules.",
      curriculum: [
        "Language proficiency & grammar",
        "Experiential mathematics & logic",
        "Environmental sciences & nature study",
        "Computers & visual arts introduction",
      ],
    },
    {
      level: "Secondary School",
      grades: "Class 6 - 10",
      ageGroup: "11 - 15 Years",
      icon: <Layers className="h-6 w-6 text-cyan-400" />,
      colorClass: "from-slate-900 via-sky-950 to-blue-950 border-sky-900/60 text-white hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
      accentBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
      description: "State Board curriculum focusing on analytical skills, board exam preparations, laboratory practices, and career orientation mentoring.",
      curriculum: [
        "Rigorous State Board preparation",
        "Advanced practicals in science & ICT labs",
        "Social leadership & debating clubs",
        "Career guidance & counseling seminars",
      ],
    },
  ];

  return (
    <section
      id="classes"
      className="py-20 bg-gradient-to-br from-white via-primary-light/10 to-transparent dark:from-background dark:via-primary-dark/5 dark:to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-display text-sm font-bold text-accent uppercase tracking-widest">
            Academics
          </h2>
          <p className="font-display text-3xl sm:text-4xl font-extrabold text-primary dark:text-white tracking-tight">
            Our Academic Programs
          </p>
          <div className="h-1 w-16 bg-accent mx-auto rounded-full" />
          <p className="text-base sm:text-lg text-foreground/70 dark:text-foreground/85">
            We follow a comprehensive, child-centric State Board curriculum structure from Nursery up to Class 10. Our approach balances academic rigor with creative expression and physical health.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {classesData.map((item, idx) => (
            <div
              key={idx}
              className={`group p-6 rounded-3xl bg-gradient-to-br border flex flex-col justify-between transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 cursor-pointer ${item.colorClass}`}
            >
              {/* Top Image Box */}
              <div className="relative h-48 w-full overflow-hidden rounded-2xl mb-5 shadow-md border border-white/5">
                <Image
                  src={item.image}
                  alt={item.level}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-white shadow-md">
                  {item.icon}
                </div>
              </div>

              {/* Header Text */}
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${item.accentBg}`}>
                    {item.ageGroup}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-black text-white group-hover:text-sky-300 transition-colors duration-300">
                  {item.level}
                </h3>
                <p className="text-xs font-bold text-sky-400/90 uppercase tracking-widest mt-1 mb-3">{item.grades}</p>
                <p className="text-sm text-slate-300 group-hover:text-white leading-relaxed mb-6 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Curriculum List (Extends on Hover) */}
              <div className="border-t border-white/10 pt-4 mt-auto max-h-0 opacity-0 overflow-hidden group-hover:max-h-52 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                <h4 className="text-[10px] font-black text-sky-300 uppercase tracking-wider mb-3">
                  Curriculum Highlights
                </h4>
                <ul className="space-y-2">
                  {item.curriculum.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Board Certification Note */}
        <div className="mt-16 bg-white dark:bg-primary-dark/20 p-8 rounded-2xl border border-primary/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="p-4 bg-primary/10 dark:bg-accent/10 rounded-xl text-primary dark:text-accent font-display font-extrabold text-sm sm:text-base tracking-wider text-center select-none uppercase whitespace-nowrap">
            State Board
          </div>
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-display text-lg font-bold text-primary dark:text-white">
              State Board Affiliation and Standards
            </h4>
            <p className="text-sm text-foreground/75 dark:text-foreground/85 leading-relaxed">
              JOY E.M HIGH SCHOOL is fully recognized and affiliated with the State Board of Education, meeting all academic guidelines. We place special emphasis on continuous assessment, practical learning, and comprehensive holistic growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
