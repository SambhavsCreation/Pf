"use client"
import { useState, useEffect, useRef } from "react";

export default function CardSwitcher() {
    const [activeTab, setActiveTab] = useState(1);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const buttonRefs = useRef([]);
    const containerRef = useRef(null);

    // Mock data for each button/tab
    const dataForTabOne = [
        {
            id: 1,
            title: "Card A1",
            description: "Description for card A1",
            image: "abstractArtOne.webp",
        },
        {
            id: 2,
            title: "Card A2",
            description: "Description for card A2",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            title: "Card A3",
            description: "Description for card A3",
            image: "https://via.placeholder.com/300x200",
        },
    ];

    const dataForTabTwo = [
        {
            id: 1,
            title: "Card B1",
            description: "Another description B1",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            title: "Card B2",
            description: "Another description B2",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 3,
            title: "Card B3",
            description: "Another description B3",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 4,
            title: "Card B4",
            description: "Another description B4",
            image: "https://via.placeholder.com/300x200",
        },
    ];

    const dataForTabThree = [
        {
            id: 1,
            title: "Card C1",
            description: "A third set description C1",
            image: "https://via.placeholder.com/300x200",
        },
        {
            id: 2,
            title: "Card C2",
            description: "A third set description C2",
            image: "https://via.placeholder.com/300x200",
        },
    ];

    // Function to determine which data set to display
    const getData = () => {
        switch (activeTab) {
            case 1:
                return dataForTabOne;
            case 2:
                return dataForTabTwo;
            case 3:
                return dataForTabThree;
            default:
                return [];
        }
    };

    // Function to update the indicator's position and size
    const updateIndicator = () => {
        const currentButton = buttonRefs.current[activeTab - 1];
        const container = containerRef.current;

        if (currentButton && container) {
            const buttonRect = currentButton.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            setIndicatorStyle({
                width: `${buttonRect.width}px`,
                height: `${buttonRect.height}px`,
                transform: `translateX(${buttonRect.left - containerRect.left}px)`,
            });
        }
    };

    // Update indicator on activeTab change and on mount
    useEffect(() => {
        updateIndicator();
        // Add resize listener to update indicator on window resize
        window.addEventListener("resize", updateIndicator);
        return () => {
            window.removeEventListener("resize", updateIndicator);
        };
    }, [activeTab]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Buttons with Animated Background */}
            <div className="relative flex justify-center mb-8" ref={containerRef}>
                {/* Sliding Indicator */}
                <div
                    className="absolute top-0 left-0 bg-gold rounded-full  transition-transform duration-300 ease-in-out z-0"
                    style={indicatorStyle}
                ></div>

                {/* Buttons Container */}
                <div className="relative flex space-x-4 z-10 text-gold">
                    {["Button 1", "Button 2", "Button 3"].map((label, index) => (
                        <button
                            key={index}
                            ref={(el) => (buttonRefs.current[index] = el)}
                            className={`px-4 py-2 z-50
                ${
                                activeTab === index + 1
                                    ? "text-black duration-200"
                                    : "hover:text-gold transition-colors duration-200"
                            }`}
                            onClick={() => setActiveTab(index + 1)}
                            aria-selected={activeTab === index + 1}
                            role="tab"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards */}
            <div className="flex flex-col space-y-40">
                {getData().map((card) => (
                    <div
                        key={card.id}
                        className="flex h-[60vh] flex-col md:flex-row items-center bg-[#1c1c1c] shadow-md rounded-sm overflow-hidden"
                    >
                        {/* Text Section */}
                        <div className="flex-1 p-6 text-gold flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                            <p className="">{card.description}</p>
                        </div>
                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
