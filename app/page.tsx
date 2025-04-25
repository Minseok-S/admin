"use client";

import CTASection from "@/src/home/components/CTASection";
import HeroSection from "@/src/home/components/HeroSection";
import IntroductionSection from "@/src/home/components/IntroductionSection";
import StatusSection from "@/src/home/components/StatusSection";

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
