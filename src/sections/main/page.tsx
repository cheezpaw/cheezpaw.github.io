"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MainSection() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const mainBgRef = useRef(null);
    const introBgRef = useRef(null);

    useGSAP(() => {
        // 1. 전체 애니메이션 흐름 설계 (Timeline)
        const tl = gsap.timeline({ paused: true });

        tl.to(introBgRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
        })
            // 2단계: main_bg가 나타나며 영상을 가림 (z-index 중간 역할)
            .to(mainBgRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "+=0.1"); // 첫 번째 애니메이션 후 약간의 간격을 두고 실행

        // 2. 스크롤 트리거 설정
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=500", // 너무 길지 않게 설정 (한 번의 휠로 끝내기 위해)
            pin: true,
            onEnter: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
            // 휠 한 번에 끝까지 가게 하려면 fastScrollEnd 옵션도 유용합니다.
            fastScrollEnd: true,
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
            {/* 층(Layer) 쌓기 (낮은 순서대로) */}

            {/* 1. 영상 (Z-Index 가장 낮음) */}
            <div ref={videoRef} className="absolute inset-0 z-0">
                <video
                    src="/videos/video_coding.mp4"
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 2. main_bg (Z-Index 중간) */}
            <div
                ref={mainBgRef}
                className="absolute inset-0 z-10 opacity-0"
            >
                <Image
                    src="/images/main_bg.jpg"
                    alt="main background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* 3. intro_bg (Z-Index 가장 높음) */}
            <div
                ref={introBgRef}
                className="absolute inset-0 z-20 opacity-0 transform scale-110 pointer-events-none"
            >
                <Image
                    src="/images/intro_bg.png"
                    alt="intro background overlay"
                    fill
                    className="object-cover"
                />
            </div>

            {/* 다음 콘텐츠로 넘어가기 위한 앵커 */}
            <div className="absolute bottom-10 w-full text-center text-white z-30 opacity-50">
                Scroll down to proceed
            </div>
        </div>
    );
}