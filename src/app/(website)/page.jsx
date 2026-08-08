import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import QuoteBanner from "@/components/website/QuoteBanner";
import MissionVision from "@/components/website/MissionVision";
import ClassesOffering from "@/components/website/ClassesOffering";
import Faculty from "@/components/website/Faculty";
import Activities from "@/components/website/Activities";
import Achievements from "@/components/website/Achievements";
import Gallery from "@/components/website/Gallery";
import Contact from "@/components/website/Contact";
import Footer from "@/components/website/Footer";

// Database operations
import dbConnect from "@/lib/mongodb";
import FacultyModel from "@/models/Faculty";
import GalleryModel from "@/models/Gallery";
import AchievementModel from "@/models/Achievement";

export const dynamic = "force-dynamic";

export default async function Home() {
  let facultyData = [];
  let galleryData = [];
  let achievementData = [];

  try {
    await dbConnect();
    
    // Fetch values from MongoDB parallelly
    const [rawFaculty, rawGallery, rawAchievements] = await Promise.all([
      FacultyModel.find({}).sort({ order: 1, name: 1 }).lean(),
      GalleryModel.find({}).sort({ createdAt: -1 }).lean(),
      AchievementModel.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    facultyData = JSON.parse(JSON.stringify(rawFaculty));
    galleryData = JSON.parse(JSON.stringify(rawGallery));
    achievementData = JSON.parse(JSON.stringify(rawAchievements));
  } catch (error) {
    console.warn("Failed to load homepage dynamic records, using placeholders:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar at the top of the viewport */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Inspirational Quote Banner */}
        <QuoteBanner />

        {/* About: Mission & Vision */}
        <MissionVision />

        {/* Academics: Curriculum & Classes */}
        <ClassesOffering />

        {/* Mentor Directory: Faculty Members (Dynamic) */}
        <Faculty initialStaff={facultyData} />

        {/* Co-curriculars: Clubs & Sports */}
        <Activities />

        {/* Milestones: Achievements Dashboard (Dynamic) */}
        <Achievements initialHighlights={achievementData} />

        {/* Media Tour: Event Photo Gallery (Dynamic) */}
        <Gallery initialItems={galleryData} />

        {/* Inquiry Hub: Contact Details and Form */}
        <Contact />
      </main>

      {/* Footer Navigation & Credits */}
      <Footer />
    </div>
  );
}
