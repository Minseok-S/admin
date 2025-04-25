"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cards } from "../../data/home";
import { isMobileWeb } from "@toss/utils";
import { InteractiveInfoCard } from "@/src/home/components/InteractiveInfoCard";

export default function IntroductionSection() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animations = gsap.context(() => {
      // 스크롤 애니메이션
      gsap.utils.toArray(".gsap-fade-in").forEach((element: any, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => {
      animations.revert();
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-24">
          <div className="inline-block mb-3 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600/10 rounded-full">
            <span className="text-blue-700  font-semibold text-sm sm:text-base">
              체리 동아리 소개
            </span>
          </div>
          <motion.h1
            className="text-black text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 gsap-fade-in bg-clip-text  tracking-tight leading-tight "
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            체리 동아리를 소개합니다
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className={`${
              isMobileWeb()
                ? "text-base text-left"
                : "text-lg text-center sm:text-xl md:text-2xl mt-10"
            } mx-auto gsap-fade-in leading-relaxed font-medium  whitespace-pre-line break-words hyphens-auto max-w-2xl px-2`}
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            <Description />
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-x-6 md:gap-y-8 mb-16 sm:mb-20">
          {cards.map(InteractiveInfoCard)}
        </div>
      </div>
    </section>
  );
}

const Description = () => {
  return isMobileWeb() ? <MobileDescription /> : <DesktopDescription />;
};

const MobileDescription = () => {
  return (
    <>
      체리는 <span className="text-blue-600 font-bold">체인저 리더십</span>의
      줄임말입니다.{"\n"}
      체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고, 내가 속한 캠퍼스와
      사회의 각 영역을 변화시키는 동아리입니다!
    </>
  );
};

const DesktopDescription = () => {
  return (
    <>
      체리는 <span className="text-blue-600 font-bold">체인저 리더십</span>의
      줄임말입니다.{"\n"}
      체리동아리는 성경적 리더십 훈련을 통해 나를 변화시키고,{"\n"}
      내가 속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!
    </>
  );
};
