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

export default function Home() {
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

        {/* Mentor Directory: Faculty Members */}
        <Faculty />

        {/* Co-curriculars: Clubs & Sports */}
        <Activities />

        {/* Milestones: Achievements Dashboard */}
        <Achievements />

        {/* Media Tour: Event Photo Gallery */}
        <Gallery />

        {/* Inquiry Hub: Contact Details and Form */}
        <Contact />
      </main>

      {/* Footer Navigation & Credits */}
      <Footer />
    </div>
  );
}
