"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CursorContext } from "@/components/CursorContext";

const PageSection = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            if (!sectionRef.current || !scrollContainerRef.current) return;

            const sectionTop = sectionRef.current.offsetTop;
            const sectionHeight = sectionRef.current.offsetHeight;
            const scrollY = window.scrollY;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const scrollOffset = scrollY - sectionTop;
                scrollContainerRef.current.scrollLeft = scrollOffset;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const sections = [
        {
            imgSrc: "/abstractArtFourteen.webp",
            heading: "Aria AI",
            description: "Unreal Engine and GPT based Chatbot.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtEight.jpeg",
            heading: "Fast Shooter",
            description: "Unreal Engine and Solidity based PvP.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtNine.jpeg",
            heading: "Thetasploit",
            description: "Replication of Metasploit, built in C++.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtTen.jpeg",
            heading: "Literature Transformer",
            description: "English Literature Transformer built in Cuda from scratch.",
            hoverText: "Learn more",
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[300vh] bg-black border-gold"
            style={{ borderBottomWidth: "1px", borderTopWidth: "1px" }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden flex">
                {/* Left Side: Big Text */}
                <div
                    className="w-1/3 h-screen px-6 md:px-12 flex flex-col justify-center border-gold"
                    style={{ borderRightWidth: "1px" }}
                >
                    <h1 className="text-6xl md:text-7xl font-thin text-gold tracking-wide">
                        Projects
                    </h1>
                </div>

                {/* Horizontal Scroll Container */}
                <div
                    ref={scrollContainerRef}
                    className="w-2/3 h-screen flex flex-nowrap gap-24 overflow-x-hidden px-16"
                >
                    {sections.map((section, index) => (
                        <SectionElement
                            key={index}
                            imgSrc={section.imgSrc}
                            heading={section.heading}
                            description={section.description}
                            hoverText={section.hoverText}
                            isLast={index === sections.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const SectionElement = ({ imgSrc, heading, description, hoverText, isLast }) => {
    const { setCursorTarget, setLockedElement } = useContext(CursorContext);
    const circleRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (circleRef.current) {
            setLockedElement(circleRef.current);
            const rect = circleRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            setCursorTarget({ x: centerX, y: centerY });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setLockedElement(null);
        setCursorTarget(null);
        if (circleRef.current) {
            circleRef.current.style.transform = "translate(0px, 0px)";
            circleRef.current.style.transition = "transform 0.3s ease";
        }
    };

    const handleMouseMove = (e) => {
        if (circleRef.current) {
            const rect = circleRef.current.getBoundingClientRect();
            const circleX = rect.left + rect.width / 2;
            const circleY = rect.top + rect.height / 2;
            const deltaX = e.clientX - circleX;
            const deltaY = e.clientY - circleY;
            const moveX = (deltaX / rect.width) * 10;
            const moveY = (deltaY / rect.height) * 10;
            circleRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
            circleRef.current.style.transition = "transform 0.1s ease";
        }
    };

    return (
        <>
            <div className="flex-shrink-0 w-[300px] md:w-[32rem] relative text-center flex flex-col items-center justify-center">
                <div
                    className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full overflow-hidden flex-shrink-0 group"
                    tabIndex="0"
                    aria-label={`${heading} Image`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                >
                    <Image
                        src={imgSrc}
                        alt={heading}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                        ref={circleRef}
                        data-circle-overlay="true"
                        className="absolute inset-0 bg-[rgba(0,0,0,0)] group-hover:bg-[rgba(0,0,0,0.2)] transition-colors duration-500 flex items-center justify-center md:w-[32rem] md:h-[32rem] z-[20]"
                    >
            <span
                className={`learn-more text-lg font-medium text-black bg-gold rounded-full w-36 h-36 flex items-center justify-center transition-all duration-100 ${
                    isHovered ? "animate-bounce-expand" : "animate-bounce-collapse"
                }`}
            >
              {hoverText}
            </span>
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-center">
                    <h2 className="text-2xl md:text-4xl font-semibold text-gold">
                        {heading}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400">{description}</p>
                </div>

                {!isLast && (
                    <div className="absolute top-0 right-[-48px] w-px bg-gold h-full pointer-events-none"></div>
                )}
            </div>
            <style jsx>{`
                .learn-more {
                    transform: scale(0);
                    opacity: 0;
                }
                @keyframes bounce-expand {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    40% {
                        transform: scale(1.02);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                @keyframes bounce-collapse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    40% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(0);
                        opacity: 0;
                    }
                }
                .animate-bounce-expand {
                    animation: bounce-expand 0.2s ease-in-out forwards;
                }
                .animate-bounce-collapse {
                    animation: bounce-collapse 0.2s ease-in-out forwards;
                }
            `}</style>
        </>
    );
};

export default PageSection;