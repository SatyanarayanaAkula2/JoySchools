import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuoteBanner from "@/components/QuoteBanner";
import MissionVision from "@/components/MissionVision";
import ClassesOffering from "@/components/ClassesOffering";
import Faculty from "@/components/Faculty";
import Activities from "@/components/Activities";
import Achievements from "@/components/Achievements";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
