"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animations = gsap.context(() => {
      // 스크롤 애니메이션
      gsap.utils.toArray(".gsap-fade-in").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    return () => animations.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section
        ref={ref}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="block">함께 성장하는</span>
            <span className="block text-blue-500">NCMN 동아리</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto">
            대학 캠퍼스에서 리더십을 키우며 영향력 있는 인재로 성장하세요
          </p>
          <Link
            href="/join"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            동아리 가입하기
          </Link>
        </motion.div>

        {/* 배경 이미지 */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <Image
          src="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
          alt="NCMN 동아리"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </section>

      {/* 소개 섹션 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-fade-in">
              NCMN 동아리를 소개합니다
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              우리 동아리는 대학생들이 캠퍼스에서 리더십을 함양하고 실제적인
              경험을 통해 성장할 수 있는 환경을 제공하는 것을 목표로 합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">리더십 개발</h3>
              <p className="text-gray-600">
                체계적인 리더십 훈련 프로그램을 통해 미래 리더로서의 역량을
                개발합니다.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">커뮤니티 형성</h3>
              <p className="text-gray-600">
                같은 비전을 가진 대학생들과 함께 성장하는 커뮤니티를 구축합니다.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-sm gsap-fade-in">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">실제적인 경험</h3>
              <p className="text-gray-600">
                다양한 활동과 프로젝트를 통해 실질적인 경험을 쌓을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 활동 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-fade-in">
              주요 활동
            </h2>
            <p className="text-lg text-gray-600 gsap-fade-in">
              NCMN 동아리는 다양한 활동을 통해 회원들의 성장을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="gsap-fade-in">
              <div className="relative h-72 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                  alt="리더십 훈련"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">리더십 훈련</h3>
              <p className="text-gray-600 mb-4">
                체계적인 리더십 훈련 프로그램을 통해 개인의 잠재력을 발휘할 수
                있도록 지원합니다.
              </p>
              <Link
                href="/leadership"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                자세히 알아보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>

            <div className="gsap-fade-in">
              <div className="relative h-72 rounded-xl overflow-hidden mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="캠퍼스 사역"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">캠퍼스 사역</h3>
              <p className="text-gray-600 mb-4">
                각 대학 캠퍼스에서 다양한 활동을 통해 대학생활의 의미있는 경험을
                제공합니다.
              </p>
              <Link
                href="/campus"
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
              >
                자세히 알아보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gsap-fade-in">
            함께 성장할 준비가 되셨나요?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto gsap-fade-in">
            지금 NCMN 동아리에 가입하고 리더십 여정을 시작하세요. 같은 비전을
            가진 동료들과 함께 성장할 수 있는 기회입니다.
          </p>
          <div className="gsap-fade-in">
            <Link
              href="/join"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              동아리 가입하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
