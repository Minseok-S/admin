"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

// 카드 데이터 타입 정의
interface CardData {
  id: number;
  title: string;
  image: string;
  tag: string;
  descriptions: string[];
  link: string;
  bgColor1: string;
  bgColor2: string;
}

export default function Home() {
  const ref = useRef(null);
  const sliderRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [videoDarken, setVideoDarken] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("title.mp4");
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // 카드 데이터
  const cards: CardData[] = [
    {
      id: 1,
      title: "리더십 훈련",
      image: "/images/home/leadership-training.png",
      tag: "왕의 지도력 훈련",
      descriptions: [
        "예수 그리스도의 리더십을 본받아, 나의 신분과 사명을 바로 알고,",
        "사자의 리더십(사역)과 양의 리더십(관계)을 훈련합니다!",
        "올바른 지도력을 발휘하는 성경적 방법인 셀프 리더십을 훈련합니다!",
      ],
      link: "/leadership",
      bgColor1: "bg-blue-100",
      bgColor2: "bg-purple-100",
    },
    {
      id: 2,
      title: "캠퍼스 사역",
      image: "/images/home/campus-ministry.png",
      tag: "5K 무료나눔",
      descriptions: [
        "체리동아리의 캠퍼스 사역은 대학캠퍼스에 부흥을 이끄는 사역입니다.",
        "대학캠퍼스 안에서 5K 무료나눔, 5K 청년밥차, 캠퍼스 워십, Red HeartDay를 주도합니다!",
      ],
      link: "/campus",
      bgColor1: "bg-green-100",
      bgColor2: "bg-blue-100",
    },
    {
      id: 3,
      title: "전체/지역모임",
      image: "/images/home/regional-meeting.png",
      tag: "전체모임",
      descriptions: [
        "매월 1회 전체모임과 지역별 모임을 통해 체리 동아리 회원들은 예배와 교제를 통해 비전을 공유하고 함께 성장합니다.",
      ],
      link: "/meetings",
      bgColor1: "bg-yellow-100",
      bgColor2: "bg-red-100",
    },
    {
      id: 4,
      title: "대외사역",
      image: "/images/home/outreach.png",
      tag: "DMZ 기도행진",
      descriptions: [
        "체리 동아리는 캠퍼스를 넘어 지역사회와 나라를 섬기는 다양한 대외사역을 주도합니다!",
        "레드하트 캠페인, My5K, 사랑나눔버스, DMZ 기도 행진 등을 통해 하나님의 사랑을 실천합니다!",
      ],
      link: "/outreach",
      bgColor1: "bg-purple-100",
      bgColor2: "bg-blue-100",
    },
  ];

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
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

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

  // 슬라이드 제어 함수
  const handleDragEnd = (e: any, info: any) => {
    if (!isMobile) return;

    const threshold = 50;
    const velocity = 0.5;

    if (
      info.offset.x < -threshold &&
      info.velocity.x < -velocity &&
      currentSlide < cards.length - 1
    ) {
      setCurrentSlide(currentSlide + 1);
    } else if (
      info.offset.x > threshold &&
      info.velocity.x > velocity &&
      currentSlide > 0
    ) {
      setCurrentSlide(currentSlide - 1);
    } else {
      // 원래 위치로 복귀
      controls.start({ x: -currentSlide * 100 + "%" });
    }
  };

  useEffect(() => {
    if (isMobile) {
      controls.start({ x: -currentSlide * 100 + "%" });
    }
  }, [currentSlide, controls, isMobile]);

  // 카드 렌더링 함수
  const renderCard = (card: CardData, index: number) => {
    return (
      <motion.div
        key={card.id}
        className={`gsap-fade-in group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 ${
          isMobile ? "min-w-full" : ""
        }`}
        whileHover={
          isMobile
            ? undefined
            : {
                y: -8,
                transition: { duration: 0.3 },
              }
        }
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={`absolute -right-20 -top-20 w-40 h-40 ${card.bgColor1} rounded-full opacity-30`}
        ></div>
        <div
          className={`absolute -left-10 -bottom-10 w-28 h-28 ${card.bgColor2} rounded-full opacity-30`}
        ></div>

        <div className="relative h-52 sm:h-64 md:h-72 rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-8 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-lg">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full">
            <span className="text-blue-700 font-semibold text-xs sm:text-sm">
              {card.tag}
            </span>
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-gray-800 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm mr-2 sm:mr-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {card.title}
        </h3>
        {card.descriptions.map((desc: string, i: number) => (
          <p
            key={i}
            className={`text-base sm:text-lg text-gray-600 ${
              i === card.descriptions.length - 1 ? "mb-4 sm:mb-6" : ""
            }`}
            style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
          >
            {desc}
          </p>
        ))}
        <Link
          href={card.link}
          className="touch-manipulation inline-flex items-center text-blue-600 font-medium text-base sm:text-lg hover:text-blue-500 transition-colors group-hover:underline active:text-blue-700"
        >
          자세히 알아보기
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 ml-2 transition-transform group-hover:translate-x-2"
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
      </motion.div>
    );
  };

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
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-24">
            <div className="inline-block mb-3 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600/10 rounded-full">
              <span className="text-blue-700 font-semibold text-sm sm:text-base">
                체리 동아리 소개
              </span>
            </div>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 sm:mb-8 gsap-fade-in bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-md bg-gradient-to-r from-blue-600 to-purple-600"
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
              className="text-lg sm:text-xl md:text-2xl text-gray-800 mx-auto gsap-fade-in leading-relaxed font-medium whitespace-pre-line break-words hyphens-auto max-w-3xl px-2"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              체리 동아리는{" "}
              <span className="text-blue-600 font-bold">
                체인저 리더십(Changer Leadership) 동아리
              </span>
              의 준말로,{"\n"}
              성경적 리더십 훈련을 통해 나를 변화시키고,{"\n"}
              내가 속한 캠퍼스와 사회의 각 영역을 변화시키는 동아리입니다!
            </motion.h2>
          </div>

          {isMobile ? (
            <div className="relative">
              <div className="overflow-hidden mx-auto">
                <motion.div
                  ref={sliderRef}
                  animate={controls}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={handleDragEnd}
                  className="flex cursor-grab active:cursor-grabbing"
                  style={{ touchAction: "pan-y" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                >
                  {cards.map(renderCard)}
                </motion.div>
              </div>

              {/* 슬라이드 인디케이터 */}
              <div className="flex justify-center mt-6 mb-6 space-x-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === index ? "bg-blue-600 w-6" : "bg-blue-300"
                    }`}
                    aria-label={`슬라이드 ${index + 1}로 이동`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-x-10 md:gap-y-16 mb-16 sm:mb-20">
              {cards.map(renderCard)}
            </div>
          )}
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
            <div className="text-center mt-6 sm:mt-10">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/join"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-lg sm:text-xl hover:bg-blue-50 transition-colors shadow-lg inline-flex items-center touch-manipulation active:bg-blue-100"
                >
                  체리 동아리 신청하기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
