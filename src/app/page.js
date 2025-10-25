import Hero from "@/components/sections/Hero";
import StudioNumbers from "@/components/sections/StudioNumbers";
import ProjectGrid from "@/components/sections/ProjectGrid";
import CinematicStrip from "@/components/sections/CinematicStrip";
import Principles from "@/components/sections/Principles";
import MaterialsPalette from "@/components/sections/MaterialsPalette";
import ServicesMarquee from "@/components/sections/ServicesMarquee";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import AwardsStrip from "@/components/sections/AwardsStrip";
import Clients from "@/components/sections/Clients";
import JournalTeaser from "@/components/sections/JournalTeaser";
import ContactCTA from "@/components/sections/ContactCTA";
import PressPublications from "@/components/sections/PressPublications";
import EnquiriesStrip from "@/components/sections/EnquiriesStrip";

// NEW
import FeaturedCaseStudy from "@/components/sections/FeaturedCaseStudy";
import StudioTimeline from "@/components/sections/StudioTimeline";
import FAQ from "@/components/sections/FAQ";
import ProjectStarter from "@/components/sections/ProjectStarter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioNumbers />
      <ProjectGrid />
      <Principles />
      <MaterialsPalette />
      <ServicesMarquee />
      <Process />
      <CinematicStrip />

      <Testimonials />
      <AwardsStrip />
      <Clients />

      {/* NEW sections */}
      <FeaturedCaseStudy />
      <StudioTimeline />
      <FAQ />
      <ProjectStarter />

      <PressPublications />
      <JournalTeaser />
      <ContactCTA />
      <EnquiriesStrip />
    </>
  );
}
