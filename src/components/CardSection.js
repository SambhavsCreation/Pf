"use client";

import { useState } from "react";
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
        if (currentIndex < cardsData.length - cardsPerView) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="md:max-w-6xl max-w-96 mx-auto py-8 px-4">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-gold">Our Featured Cards</h2>
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="bg-black text-white px-3 py-1 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentIndex === 0}
                    >
                        <GoChevronLeft className="icon" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="bg-black text-white px-3 py-1 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentIndex >= cardsData.length - cardsPerView}
                    >
                        <GoChevronRight className="icon" />
                    </button>
                </div>
            </div>

            {/* Cards Section */}
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100 / cardsPerView}%)`,
                    }}
                >
                    {cardsData.map((card) => (
                        <div
                            key={card.id}
                            className="flex-shrink-0 w-[calc(100%/3)] sm:w-[calc(100%/2)] md:w-1/3 lg:w-[calc(100%/3)]"
                        >
                            <ImageCard
                                backgroundImage={card.backgroundImage}
                                topLeftText={card.topLeftText}
                                bottomRightText={card.bottomRightText}
                                logoSrc={card.logoSrc}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardsSection;