"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Slider from "react-slick";
import type { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

// 지역 데이터 타입 정의
interface RegionData {
  id: number;
  name: string;
  x: number;
  y: number;
  count: number;
  leader: string;
  universities: string[];
}

// 통계 데이터 타입 정의
interface StatData {
  label: string;
  value: string | number;
  icon?: string;
  color?: string;
}

export default function Home() {
  const ref = useRef(null);
  const sliderRef = useRef(null);
  const [showTitle, setShowTitle] = useState(false);
  const [videoDarken, setVideoDarken] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/videos/title.mp4");
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, {
    once: true,
    margin: "-100px 0px",
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  // 지역 데이터
  const regions: RegionData[] = [
    {
      id: 1,
      name: "서울",
      x: 30,
      y: 22,
      count: 32,
      universities: [
        "서울대학교",
        "연세대학교",
        "고려대학교",
        "서강대학교",
        "서울대학교",
        "연세대학교",
        "고려대학교",
        "서강대학교",
        "서울대학교",
        "연세대학교",
        "고려대학교",
        "서강대학교",
        "서울대학교",
        "연세대학교",
        "고려대학교",
        "서강대교",
        "서울대학교",
        "연세대학교",
        "고려대학교",
        "서강대학교",
      ],
      leader: "한병국",
    },
    {
      id: 2,
      name: "인천/경기",
      x: 28,
      y: 14,
      count: 45,
      universities: ["인하대학교", "경희대학교", "아주대학교"],
      leader: "이주희",
    },
    {
      id: 3,
      name: "강원",
      x: 44,
      y: 16,
      count: 45,
      universities: ["인하대학교", "경희대학교", "아주대학교"],
      leader: "이상준",
    },
    {
      id: 4,
      name: "대전/충청",
      x: 30,
      y: 38,
      count: 36,
      universities: ["카이스트", "충남대학교", "한밭대학교"],
      leader: "안결하",
    },
    {
      id: 5,
      name: "호남",
      x: 25,
      y: 60,
      count: 29,
      universities: ["전남대학교", "조선대학교", "전북대학교"],
      leader: "이상준",
    },
    {
      id: 6,
      name: "대구/포항",
      x: 50,
      y: 38,
      count: 52,
      universities: ["부산대학교", "경북대학교", "부경대학교"],
      leader: "정다연",
    },
    {
      id: 7,
      name: "창원/부산",
      x: 53,
      y: 57,
      count: 52,
      universities: ["부산대학교", "경북대학교", "부경대학교"],
      leader: "강상아",
    },
    {
      id: 8,
      name: "제주",
      x: 18,
      y: 87,
      count: 12,
      universities: ["제주대학교"],
      leader: "이상준",
    },
  ];

  // 통계 데이터
  const stats: StatData[] = [
    {
      label: "총 회원수",
      value: 163,
      icon: "👥",
      color: "from-blue-500 to-purple-500",
    },
    {
      label: "활동 대학",
      value: 48,
      icon: "🏫",
      color: "from-green-500 to-teal-500",
    },
  ];

  // 슬라이더 설정
  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: "ondemand" as const,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: (current: number) => {
      setCurrentSlide(current);
    },
  };

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
        setVideoSrc("/videos/title_mobile.mp4");
      } else {
        setVideoSrc("/videos/title.mp4");
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

  // 카드 렌더링 함수
  const renderCard = (card: CardData, index: number) => {
    return (
      <motion.div
        key={card.id}
        className={`gsap-fade-in group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-xl transition-all duration-500 relative overflow-hidden border border-gray-100 flex flex-col mx-2 ${
          isMobile ? "min-w-full h-[500px]" : ""
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

        <div className="relative h-52 sm:h-64 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 transform transition-transform duration-700 group-hover:scale-[1.02] shadow-lg">
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
        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm mr-2 sm:mr-3">
            {String(index + 1).padStart(2, "0")}
          </span>
          {card.title}
        </h3>
        <div className="overflow-hidden mb-4 h-[160px]">
          {card.descriptions.map((desc: string, i: number) => (
            <p
              key={i}
              className="text-sm sm:text-base text-gray-600 mb-2"
              style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
            >
              {desc}
            </p>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6">
          <Link
            href={card.link}
            className="touch-manipulation inline-flex items-center text-blue-600 font-medium text-base hover:text-blue-500 transition-colors group-hover:underline active:text-blue-700"
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
        </div>
      </motion.div>
    );
  };

  // 지역 클릭 핸들러
  const handleRegionClick = (region: RegionData) => {
    setSelectedRegion(region);
  };

  // 통계 아이템 렌더링 함수
  const Counter = ({
    value,
    isInView,
  }: {
    value: number | string;
    isInView: boolean;
  }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let start = 0;
      const end = Number(value);

      // 숫자가 아닌 경우 처리
      if (isNaN(end)) return;

      // 카운팅 속도 조절
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => {
        clearInterval(timer);
      };
    }, [value, isInView]);

    // 퍼센트 표시 추가
    return (
      <>{typeof value === "number" && value !== 127 ? count : count + "%"}</>
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
                src="/videos/title_full.mp4"
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

          {/* 모바일에서는 슬라이더, 그 외에서는 그리드 레이아웃 사용 */}
          {isMobile ? (
            <div className="mb-16 sm:mb-20 px-2">
              <Slider ref={sliderRef} {...sliderSettings}>
                {cards.map(renderCard)}
              </Slider>
              {/* 캐러셀 인디케이터 */}
              <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                  {cards.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentSlide === index
                          ? "bg-blue-600 w-6"
                          : "bg-blue-200"
                      }`}
                      animate={{
                        width: currentSlide === index ? 24 : 10,
                        backgroundColor:
                          currentSlide === index
                            ? "rgb(37, 99, 235)"
                            : "rgb(219, 234, 254)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-x-6 md:gap-y-8 mb-16 sm:mb-20">
              {cards.map(renderCard)}
            </div>
          )}
        </div>
      </section>

      {/* 체리 동아리 현황 섹션 */}
      <section className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
            <div className="inline-block mb-2 px-4 py-1.5 bg-blue-600/10 rounded-full">
              <span className="text-blue-700 font-semibold text-sm">
                전국 현황
              </span>
            </div>
            <motion.h1
              className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-8 gsap-fade-in bg-clip-text text-transparent tracking-tight leading-tight drop-shadow-md bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              체리 동아리 전국 현황
            </motion.h1>

            {/* 통계 수치 */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 gap-3 mt-6 sm:mt-8 mb-10 sm:mb-16 max-w-3xl mx-auto px-4 sm:px-0"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 backdrop-blur-md border border-white/60 rounded-xl p-3 shadow-sm hover:shadow-md transition-all text-center relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -3,
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    scale: 1.03,
                  }}
                >
                  {/* 배경 그라데이션 효과 */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ width: "0%" }}
                    animate={
                      isStatsInView ? { width: "100%" } : { width: "0%" }
                    }
                    transition={{
                      delay: 0.5 + index * 0.2,
                      duration: 1.5,
                      ease: "easeOut",
                    }}
                  />

                  <motion.div
                    className="text-blue-600 font-bold text-xl sm:text-2xl md:text-3xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isStatsInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Counter value={stat.value} isInView={isStatsInView} />
                  </motion.div>
                  <motion.div
                    className="text-gray-600 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={isStatsInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative mx-auto max-w-3xl gsap-scale"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {/* 지도 컨테이너 */}
            <div className="relative aspect-[508/585] max-w-xs sm:max-w-sm md:max-w-2xl mx-auto">
              {/* 배경 지도 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2 }}
                  className="w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-blue-500/5 rounded-3xl transform -rotate-3 scale-105"></div>
                  <div className="absolute inset-0 bg-blue-500/5 rounded-3xl transform rotate-3 scale-105"></div>
                  <Image
                    src="/svg/home/map.svg"
                    alt="대한민국 지도"
                    width={508}
                    height={585}
                    className="w-full h-auto drop-shadow-md"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </motion.div>
              </div>

              {/* 지역 핀 */}
              {regions.map((region) => (
                <motion.div
                  key={region.id}
                  className="absolute"
                  style={{ left: `${region.x}%`, top: `${region.y}%` }}
                  initial={{ y: -50, opacity: 0, scale: 1.2 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{
                    once: true,
                    margin: "-100px 0px",
                  }}
                  transition={{
                    delay: region.id * 0.3,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  }}
                  whileHover={{ y: -3 }}
                  onClick={() => handleRegionClick(region)}
                >
                  <div className="relative cursor-pointer group">
                    <motion.div
                      className="absolute -inset-3 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: region.id * 0.3 + 0.2,
                        duration: 0.3,
                      }}
                    >
                      <svg
                        width="24"
                        height="32"
                        viewBox="0 0 30 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="drop-shadow-lg w-4 h-5 sm:w-6 sm:h-8"
                      >
                        <path
                          d="M15 0C6.72 0 0 6.72 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.72 23.28 0 15 0ZM15 20.5C12 20.5 9.5 18 9.5 15C9.5 12 12 9.5 15 9.5C18 9.5 20.5 12 20.5 15C20.5 18 18 20.5 15 20.5Z"
                          fill="#E5172F"
                        />
                        <circle cx="15" cy="15" r="7" fill="white" />
                      </svg>
                    </motion.div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold border-2 border-white shadow-md"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: region.id * 0.3 + 0.4,
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      {region.count}
                    </motion.div>

                    {/* 핀이 꽂힐 때 나타나는 효과 */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0.7 }}
                      whileInView={{ scale: 2.5, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: region.id * 0.3 + 0.1,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      className="absolute left-1/2 top-1/2 -ml-3 -mt-3 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}

              {/* 지역 팝업 정보 */}
              <AnimatePresence>
                {selectedRegion && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm px-4"
                    onClick={() => setSelectedRegion(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/60 p-3 sm:p-4 m-2 sm:m-3 max-w-sm w-full max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                          <svg
                            width="16"
                            height="20"
                            viewBox="0 0 30 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              d="M15 0C6.72 0 0 6.72 0 15C0 26.25 15 40 15 40C15 40 30 26.25 30 15C30 6.72 23.28 0 15 0Z"
                              fill="#E5172F"
                              fillOpacity="0.8"
                            />
                          </svg>
                          {selectedRegion.name}
                        </h3>
                        <button
                          onClick={() => setSelectedRegion(null)}
                          className="text-gray-400 hover:text-gray-600 bg-white/80 rounded-full p-1 transition-colors border border-gray-100"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
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
                      </div>

                      {/* 통계 요약 - 새로 추가된 부분 */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <motion.div
                          className="col-span-1 flex flex-col items-center justify-center text-center bg-red-50 py-2 px-1 sm:p-3 rounded-lg border border-red-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-red-100 rounded-full mb-1 sm:mb-2 shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-6 sm:w-6 text-red-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-red-700">
                            지부장
                          </div>
                          <motion.div
                            className="text-xs sm:text-base font-bold text-red-600 mt-1"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                          >
                            {selectedRegion.leader}
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="col-span-1 flex flex-col items-center justify-center text-center bg-blue-50 py-2 px-1 sm:p-3 rounded-lg border border-blue-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 rounded-full mb-1 sm:mb-2 shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                            </svg>
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-blue-700">
                            활동 대학
                          </div>
                          <motion.div
                            className="text-sm sm:text-lg font-bold text-blue-600 mt-1"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring" }}
                          >
                            {selectedRegion.universities.length}개
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="col-span-1 flex flex-col items-center justify-center text-center bg-green-50 py-2 px-1 sm:p-3 rounded-lg border border-green-100"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-full mb-1 sm:mb-2 shadow-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 sm:h-6 sm:w-6 text-green-600"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                          </div>
                          <div className="text-[10px] sm:text-xs font-bold text-green-700">
                            활동 인원
                          </div>
                          <motion.div
                            className="text-sm sm:text-lg font-bold text-green-600 mt-1"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                          >
                            {selectedRegion.count}명
                          </motion.div>
                        </motion.div>
                      </div>

                      <div className="text-xs">
                        <div className="bg-blue-50 rounded-lg p-2 sm:p-3 border border-blue-100 mb-2">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-full mr-2 shadow-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                <path d="M9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                              </svg>
                            </div>
                            <p className="text-blue-700 font-bold text-xs sm:text-sm">
                              활동 대학 ({selectedRegion.universities.length}개)
                            </p>
                          </div>

                          {/* 대학 검색 기능 */}
                          <div className="relative mb-2">
                            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                              <svg
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              placeholder="대학 검색..."
                              className="w-full pl-7 sm:pl-8 pr-4 py-1 text-xs bg-white/80 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-colors"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                              <button
                                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
                                onClick={() => setSearchQuery("")}
                              >
                                <svg
                                  className="h-3 w-3 sm:h-4 sm:w-4"
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
                            )}
                          </div>

                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="max-h-20 sm:max-h-32 overflow-y-auto pr-1 custom-scrollbar"
                            style={{
                              scrollbarWidth: "thin",
                              scrollbarColor: "#93C5FD transparent",
                            }}
                          >
                            <div className="flex flex-wrap gap-1">
                              {selectedRegion.universities
                                .filter((uni) =>
                                  searchQuery
                                    ? uni
                                        .toLowerCase()
                                        .includes(searchQuery.toLowerCase())
                                    : true
                                )
                                .map((university, index) => (
                                  <motion.span
                                    key={index}
                                    className="inline-flex items-center bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-blue-700 border border-blue-200 shadow-sm"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                      delay: 0.1 + index * 0.03,
                                      duration: 0.2,
                                      type: "spring",
                                      stiffness: 200,
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                      backgroundColor:
                                        "rgba(219, 234, 254, 0.8)",
                                      transition: { duration: 0.1 },
                                    }}
                                  >
                                    {university}
                                  </motion.span>
                                ))}
                            </div>

                            {/* 검색 결과가 없을 때 표시할 메시지 */}
                            {searchQuery &&
                              selectedRegion.universities.filter((uni) =>
                                uni
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              ).length === 0 && (
                                <div className="text-center py-2 text-blue-500 text-[10px] sm:text-xs">
                                  "{searchQuery}"에 대한 검색 결과가 없습니다
                                </div>
                              )}
                          </motion.div>

                          {/* 스크롤 안내 메시지 - 검색 결과가 8개 초과인 경우만 표시 */}
                          {selectedRegion.universities.filter((uni) =>
                            searchQuery
                              ? uni
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                              : true
                          ).length > 8 && (
                            <div className="text-center mt-1">
                              <span className="text-blue-500 text-[9px] sm:text-xs italic">
                                ↑↓ 스크롤하여 더 보기
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <style jsx global>{`
                        .custom-scrollbar::-webkit-scrollbar {
                          width: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                          background: transparent;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                          background-color: #93c5fd;
                          border-radius: 20px;
                        }
                      `}</style>

                      <div className="mt-3 sm:mt-4 flex justify-center">
                        <motion.button
                          className="inline-flex items-center bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition-colors text-xs sm:text-sm font-bold shadow-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                          </svg>
                          문의하기
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 지도 위 그래디언트 오버레이 (애플 스타일) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-30" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-blue-50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-50 to-transparent" />
              </div>
            </div>
          </motion.div>
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
