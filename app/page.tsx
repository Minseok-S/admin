"use client";

import HeroSection from "@/src/home/components/Section/HeroSection";
import IntroductionSection from "@/src/home/components/Section/IntroductionSection";
import StatusSection from "@/src/home/components/Section/StatusSection";
import CTASection from "@/src/home/components/Section/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen text-gray-800 overflow-hidden">
      <HeroSection />
      <IntroductionSection />
      <StatusSection />
      <CTASection />
    </div>
  );
}
