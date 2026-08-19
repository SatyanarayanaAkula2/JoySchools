import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import QuoteBanner from "@/components/website/QuoteBanner";
import MissionVision from "@/components/website/MissionVision";
import ClassesOffering from "@/components/website/ClassesOffering";
import Activities from "@/components/website/Activities";
import EventsSection from "@/components/website/EventsSection";
import Achievements from "@/components/website/Achievements";
import MilestonesSection from "@/components/website/MilestonesSection";
import Gallery from "@/components/website/Gallery";
import Contact from "@/components/website/Contact";
import Footer from "@/components/website/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  let facultyData = [];
  let galleryData = [];
  let achievementData = [];
  let eventData = [];
  let milestoneData = [];
  let settingsData = {};

  try {
    const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://joyschools-p2xb.onrender.com").replace(/\/+$/, "");
    
    const [resFaculty, resGallery, resAchievements, resEvents, resMilestones, resSettings] = await Promise.all([
      fetch(`${backendUrl}/api/faculty`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/gallery`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/achievements`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/events`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/milestones`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/settings`, { cache: "no-store" }).then((r) => r.json()),
    ]);

    facultyData = resFaculty.faculty || [];
    galleryData = resGallery.gallery || [];
    achievementData = resAchievements.achievements || [];
    eventData = resEvents.events || [];
    milestoneData = resMilestones.milestones || [];
    settingsData = resSettings.settings || {};
  } catch (error) {
    console.warn("Failed to load homepage dynamic records from Express backend, using placeholders:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar at the top of the viewport */}
      <Navbar />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero slideImages={settingsData.heroSlides} />

        {/* 2. Inspirational Quote Banner */}
        <QuoteBanner />

        {/* 3. About: Mission & Vision */}
        <MissionVision adminImage={settingsData.adminImage} />

        {/* 4. Academics: Curriculum & Classes */}
        <ClassesOffering />

        {/* 5. Holistic Development Programs (Co-curriculars, sports, arts) */}
        <Activities />

        {/* 6. Events & Dates Calendar Section */}
        <EventsSection initialEvents={eventData} />

        {/* 7. Honors & Achievements */}
        <Achievements initialHighlights={achievementData} />

        {/* 8. Legacy Milestones (Right BEFORE Gallery) */}
        <MilestonesSection initialStats={milestoneData} />

        {/* 9. Visual Media Gallery Tour */}
        <Gallery initialItems={galleryData} />

        {/* 10. Inquiry Hub: Admissions & Contact Form */}
        <Contact settings={settingsData} />
      </main>

      {/* Footer Navigation & Credits */}
      <Footer settings={settingsData} />
    </div>
  );
}
