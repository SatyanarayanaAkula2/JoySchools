"use client";

export default function MilestonesSection({ stats }) {
  const defaultStats = [
    { value: "15+", label: "Years of Educational Legacy", icon: "🏫" },
    { value: "100%", label: "State Board Pass Rate", icon: "🎓" },
    { value: "35+", label: "Sports & Cultural Trophies", icon: "🏆" },
    { value: "2,200+", label: "Alumni Worldwide", icon: "🌐" },
  ];

  const statList = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section
      id="milestones"
      className="py-16 bg-gradient-to-r from-primary-dark via-primary to-accent-dark text-white border-y border-white/10 shadow-inner relative overflow-hidden"
    >
      {/* Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Milestones
          </h2>
          <div className="h-1 w-16 bg-accent-light mx-auto rounded-full mt-3" />
        </div>

        {/* Fully Centered Milestone Cards */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-5xl mx-auto w-full text-center">
          {statList.map((stat, idx) => (
            <div
              key={idx}
              className="w-full sm:w-64 max-w-[280px] p-7 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg hover:bg-white/15 hover:scale-105 transition-all duration-300 flex flex-col justify-center items-center shrink-0"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="font-display text-4xl sm:text-5xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
