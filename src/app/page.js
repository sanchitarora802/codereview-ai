"use client";

import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import DemoSection from "@/components/home/DemoSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <DemoSection />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  );
}
