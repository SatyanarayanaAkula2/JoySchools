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
  let galleryData = [];
  let achievementData = [];
  let eventData = [];
  let milestoneData = [];
  let settingsData = {};

  try {
    const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://joyschools-p2xb.onrender.com").replace(/\/+$/, "");
    
    const [resGallery, resAchievements, resEvents, resMilestones, resSettings] = await Promise.all([
      fetch(`${backendUrl}/api/gallery`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/achievements`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/events`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/milestones`, { cache: "no-store" }).then((r) => r.json()),
      fetch(`${backendUrl}/api/settings`, { cache: "no-store" }).then((r) => r.json()),
    ]);

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
        {/* Hero Section */}
        <Hero slideImages={settingsData.heroSlides} />

        {/* Inspirational Quote Banner */}
        <QuoteBanner />

        {/* About: Mission & Vision */}
        <MissionVision adminImage={settingsData.adminImage} />

        {/* Academics: Curriculum & Classes */}
        <ClassesOffering />

        {/* Holistic Development Programs (Single-Row Slider) */}
        <Activities />

        {/* Upcoming Events & School Calendar (Single-Row Slider) */}
        <EventsSection events={eventData} />

        {/* Accolades & Achievements (Single-Row Slider) */}
        <Achievements initialHighlights={achievementData} />

        {/* Milestones Stats Strip (Positioned immediately before Gallery) */}
        <MilestonesSection stats={milestoneData} />

        {/* Media Tour: Event Photo Gallery (Single-Row Slider) */}
        <Gallery initialItems={galleryData} />

        {/* Inquiry Hub: Contact Details and Form */}
        <Contact settings={settingsData} />
      </main>

      {/* Footer Navigation & Credits */}
      <Footer settings={settingsData} />
    </div>
  );
}
