import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import HowWeHelpSection from "@/components/sections/HowWeHelpSection";
import WhyApexIntel from "@/components/sections/WhyApexIntel";
import StatsSection from "@/components/sections/StatsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ForExpertsSection from "@/components/sections/ForExpertsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col w-full">
        <HeroSection />
        <HowWeHelpSection />
        <WhyApexIntel />
        <StatsSection />
        <IndustriesSection />
        <TestimonialsSection />
        <ForExpertsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  );
}
