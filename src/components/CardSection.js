"use client";

import { useState, useRef, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CardsSection = () => {
    const cardsData = [
        {
            id: 1,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 1",
            bottomRightText: "Details 1",
            altText: "Logo 1",
        },
        {
            id: 2,
            backgroundImage: "/abstractArtSix.webp",
            topLeftText: "Card 2",
            bottomRightText: "Details 2",
        },
        {
            id: 3,
            backgroundImage: "/abstractArtThree.webp",
            topLeftText: "Card 3",
            bottomRightText: "Details 3",
            logoSrc: "/logoProjectOne.png",
            altText: "Logo 3",
        },
        {
            id: 4,
            backgroundImage: "/abstractArtFour.webp",
            topLeftText: "Card 4",
            bottomRightText: "Details 4",
            altText: "Logo 4",
        },
        {
            id: 5,
            backgroundImage: "/abstractArtOne.webp",
            topLeftText: "Card 5",
            bottomRightText: "Details 5",
            altText: "Logo 5",
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerView = 3;

    const nextSlide = () => {
        if (currentIndex < 4 - cardsPerView) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Ref for the scrollable container on mobile
    const scrollContainerRef = useRef(null);

    // Synchronize scroll position with currentIndex on mobile
    useEffect(() => {
        const handleScrollSync = () => {
            if (scrollContainerRef.current && window.innerWidth < 640) { // 'sm' breakpoint in Tailwind is 640px
                const scrollWidth = scrollContainerRef.current.scrollWidth;
                const containerWidth = scrollContainerRef.current.clientWidth;
                const maxScrollLeft = scrollWidth - containerWidth;
                const scrollStep = maxScrollLeft / (cardsData.length - 1);

                scrollContainerRef.current.scrollTo({
                    left: currentIndex * scrollStep,
                    behavior: "smooth",
                });
            }
        };

        handleScrollSync();

        // Also handle window resize to adjust scroll if needed
        window.addEventListener("resize", handleScrollSync);
        return () => window.removeEventListener("resize", handleScrollSync);
    }, [currentIndex, cardsData.length]);

    return (
        <div className="md:max-w-6xl max-w-full mx-auto py-8 px-4">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-gold">Our Featured Cards</h2>
                {/* Hide buttons on small screens */}
                <div className="hidden sm:flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="bg-black text-white px-3 py-1 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentIndex === 0}
                        aria-label="Previous Slide"
                    >
                        <GoChevronLeft className="icon" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-black text-white px-3 py-1 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentIndex >= 4 - cardsPerView}
                        aria-label="Next Slide"
                    >
                        <GoChevronRight className="icon" />
                    </button>
                </div>
            </div>

            {/* Cards Section */}
            <div className="relative">
                {/* Mobile: Horizontal Scroll */}
                <div
                    ref={scrollContainerRef}
                    className="sm:hidden flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                >
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            className="flex-shrink-0 w-80" // Fixed width for consistent scrolling
                        >
                            <ImageCard
                                backgroundImage={card.backgroundImage}
                                topLeftText={card.topLeftText}
                                bottomRightText={card.bottomRightText}
                                logoSrc={card.logoSrc}
                                altText={card.altText}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop: Carousel */}
                <div className="hidden sm:block">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex * 80) / cardsPerView}%)`,
                            width: `${(cardsData.length * 100) / cardsPerView}%`,
                        }}
                    >
                        {cardsData.map((card) => (
                            <div
                                key={card.id}
                                className="flex-shrink-0 px-2" // Adjusted padding for better spacing
                                style={{width: "18%"}}
                            >
                                <ImageCard
                                    backgroundImage={card.backgroundImage}
                                    topLeftText={card.topLeftText}
                                    bottomRightText={card.bottomRightText}
                                    logoSrc={card.logoSrc}
                                    altText={card.altText}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CardsSection;
