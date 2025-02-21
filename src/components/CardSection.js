"use client";

import { useState, useRef, useEffect } from "react";
import ImageCard from "@/components/ImageCard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const CardsSection = ({ title, cardsData, needScroll, cPV }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsPerView = cPV;

    const nextSlide = () => {
        if (currentIndex < cardsData.length - 1 - cardsPerView) {
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
            if (scrollContainerRef.current && window.innerWidth < 640) {
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
        window.addEventListener("resize", handleScrollSync);
        return () => window.removeEventListener("resize", handleScrollSync);
    }, [currentIndex, cardsData.length]);

    return (
        <div className="md:max-w-6xl max-w-full mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-gold">{title}</h2>
                {needScroll && (
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
                            disabled={currentIndex >= cardsData.length - 1 - cardsPerView}
                            aria-label="Next Slide"
                        >
                            <GoChevronRight className="icon" />
                        </button>
                    </div>
                )}

            </div>

            <div className="relative">
                <div
                    ref={scrollContainerRef}
                    className="sm:hidden flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
                >
                    {cardsData.map((card) => (
                        <div key={card.id} className="flex-shrink-0 w-80">
                            <ImageCard {...card} />
                        </div>
                    ))}
                </div>

                <div className="hidden sm:block">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            transform: `translateX(-${(currentIndex * 80) / cardsPerView}%)`,
                            width: `${needScroll ? ((cardsData.length * 100) / cardsPerView) : (340 / cardsPerView)}%`,
                        }}
                    >
                        {cardsData.map((card) => (
                            <div key={card.id} className="flex-shrink-0 px-2" style={{ width: "18%" }}>
                                <ImageCard {...card} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsSection;
