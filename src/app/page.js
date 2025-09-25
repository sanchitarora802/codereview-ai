// Import all home components (they are .jsx files)
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import DemoSection from "@/components/home/DemoSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <DemoSection />
      <FeaturesGrid />
      <HowItWorks />
      <CTASection />
    </>
  );
}
