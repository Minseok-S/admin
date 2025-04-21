"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

export default function Home() {
  const ref = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [videoDarken, setVideoDarken] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("title.mp4");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    // 3초 후 배경 어둡게
    const darkenTimer = setTimeout(() => {
      setVideoDarken(true);
    }, 11000);

    // 6초 후에 타이틀 표시
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 11000);

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
            duration: 0.9,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 요소 확대 애니메이션
      gsap.utils.toArray(".gsap-scale").forEach((element: any) => {
        gsap.fromTo(
          element,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });

    // 화면 크기 감지 함수
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSrc("title_mobile.mp4");
      } else {
        setVideoSrc("title.mp4");
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    return () => {
      animations.revert();
      clearTimeout(titleTimer);
      clearTimeout(darkenTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen text-gray-800 overflow-hidden">
      {/* 히어로 섹션 */}
      <section
        ref={ref}
        className="relative h-screen overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <AnimatePresence>
            {showTitle && (
              <>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.2, 0.65, 0.3, 1],
                    scale: { type: "spring", stiffness: 80 },
                  }}
                  className="text-5xl sm:text-6xl md:text-9xl font-extrabold text-white mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,255,0.8)] md:drop-shadow-[0_0_35px_rgba(0,0,255,0.8)] bg-clip-text"
                >
                  CHERRY CLUB
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-8 sm:mt-6 md:mt-8"
                >
                  <button
                    onClick={() => setVideoModal(true)}
                    className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-white/30 transition-all hover:scale-105 border border-white/30 mb-8 sm:mb-12"
                  >
                    전체 동영상 보기
                  </button>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex flex-col items-center"
                >
                  <p className="text-white text-lg mb-2">
                    스크롤을 내려 더 알아보기
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 배경 비디오 */}
        <AnimatePresence>
          {videoDarken && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black z-0"
            />
          )}
        </AnimatePresence>
        <video
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover object-center z-[-1]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </section>

      {/* 비디오 모달 */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoModal(false)}
                className="absolute -top-12 right-0 text-white p-2 rounded-full hover:bg-white/10"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <video
                src="title_full.mp4"
                className="w-full h-full rounded-lg shadow-2xl"
                autoPlay
                controls
                playsInline
                preload="auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 소개 섹션 */}
      <section className="py-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-8 gsap-fade-in bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-md bg-gradient-to-r from-blue-600 to-purple-600">
              체리 동아리를 소개합니다
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-800 mx-auto leading-relaxed font-medium whitespace-pre-line break-words hyphens-auto"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              체리 동아리는 '체인저 리더십(Changer Leadership) 동아리'의 준말로,
              성경적 리더십 훈련을 통해 나를 변화시키고, 내가 속한 캠퍼스와
              사회의 각 영역을 변화시키는 동아리입니다!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/join"
                className="inline-block bg-blue-600 text-white px-6 py-4 rounded-full text-base font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
              >
                동아리 가입하기
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl gsap-scale border border-blue-100">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                리더십 개발
              </h3>
              <p
                className="text-gray-600 text-lg"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                체계적인 리더십 훈련 프로그램을 통해 미래 리더로서의 역량을
                개발합니다.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl gsap-scale border border-green-100">
              <div className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                커뮤니티 형성
              </h3>
              <p
                className="text-gray-600 text-lg"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                같은 비전을 가진 대학생들과 함께 성장하는 커뮤니티를 구축합니다.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl gsap-scale border border-purple-100">
              <div className="w-20 h-20 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
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
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                실제적인 경험
              </h3>
              <p
                className="text-gray-600 text-lg"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                다양한 활동과 프로젝트를 통해 실질적인 경험을 쌓을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 활동 섹션 */}
      <section className="py-32 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 gsap-fade-in bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              주요 활동
            </h2>
            <p
              className="text-xl md:text-2xl text-gray-700 gsap-fade-in leading-relaxed"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              NCMN 동아리는 다양한 활동을 통해 회원들의 성장을 지원합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="gsap-fade-in group">
              <div className="relative h-96 rounded-3xl overflow-hidden mb-8 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952"
                  alt="리더십 훈련"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-70"></div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                리더십 훈련
              </h3>
              <p
                className="text-gray-600 mb-6 text-xl"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                체계적인 리더십 훈련 프로그램을 통해 개인의 잠재력을 발휘할 수
                있도록 지원합니다.
              </p>
              <Link
                href="/leadership"
                className="inline-flex items-center text-blue-600 font-medium text-lg hover:text-blue-500 transition-colors"
              >
                자세히 알아보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 transition-transform group-hover:translate-x-1"
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

            <div className="gsap-fade-in group">
              <div className="relative h-96 rounded-3xl overflow-hidden mb-8 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="캠퍼스 사역"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-70"></div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                캠퍼스 사역
              </h3>
              <p
                className="text-gray-600 mb-6 text-xl"
                style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
              >
                각 대학 캠퍼스에서 다양한 활동을 통해 대학생활의 의미있는 경험을
                제공합니다.
              </p>
              <Link
                href="/campus"
                className="inline-flex items-center text-blue-600 font-medium text-lg hover:text-blue-500 transition-colors"
              >
                자세히 알아보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 transition-transform group-hover:translate-x-1"
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
      <section className="py-36 bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div className="gsap-scale max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold mb-10 gsap-fade-in leading-tight text-blue-800">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p
              className="text-xl md:text-3xl mb-14 max-w-3xl mx-auto gsap-fade-in leading-relaxed text-gray-700"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              지금 NCMN 동아리에 가입하고 리더십 여정을 시작하세요. 같은 비전을
              가진 동료들과 함께 성장할 수 있는 기회입니다.
            </p>
            <div className="gsap-fade-in">
              <Link
                href="/join"
                className="inline-block bg-blue-600 text-white px-14 py-7 rounded-full text-2xl font-semibold hover:bg-blue-700 transition-all hover:scale-105 shadow-xl"
              >
                동아리 가입하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
