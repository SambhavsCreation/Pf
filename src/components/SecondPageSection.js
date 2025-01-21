"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PageSection = () => {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        function onScroll() {
            if (!sectionRef.current || !scrollContainerRef.current) return;

            const sectionTop = sectionRef.current.offsetTop;
            const sectionHeight = sectionRef.current.offsetHeight;
            const scrollY = window.scrollY;

            // Only trigger horizontal scroll if the user is within this section
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                // How much we have scrolled inside this section
                const scrollOffset = scrollY - sectionTop;

                // Translate that vertical scroll into horizontal scrolling
                scrollContainerRef.current.scrollLeft = scrollOffset;
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    // Define your section elements data
    const sections = [
        {
            imgSrc: "/abstractArtOne.webp",
            heading: "Heading 1",
            description: "This is a short description for the first element.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtTwo.webp",
            heading: "Heading 2",
            description: "This is a short description for the second element.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtThree.webp",
            heading: "Heading 3",
            description: "This is a short description for the third element.",
            hoverText: "Learn more",
        },
        {
            imgSrc: "/abstractArtFour.webp",
            heading: "Heading 4",
            description: "This is a short description for the fourth element.",
            hoverText: "Learn more",
        },
    ];

    return (
        /**
         * h-[300vh] gives the page enough vertical space
         * to allow vertical scrolling so we can map it to horizontal.
         */
        <section
            ref={sectionRef}
            className="relative w-full h-[300vh] bg-black border-gold"
            style={{ borderBottomWidth: "1px" }}
        >
            {/**
             * The sticky container remains fixed in the viewport
             * while the user scrolls through the parent <section>.
             */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex">
                {/* Left Side: Big Text */}
                <div
                    className="w-1/3 h-screen px-6 md:px-12 flex flex-col justify-center border-gold"
                    style={{ borderRightWidth: "1px" }}
                >
                    <h1 className="text-6xl md:text-7xl font-thin text-gold tracking-wide">Projects</h1>
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
    return (
        <div className="flex-shrink-0 w-[300px] md:w-[32rem] relative text-center flex flex-col items-center justify-center">
            {/* Round Image with group class */}
            <div
                className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] rounded-full overflow-hidden flex-shrink-0 group"
                tabIndex="0"
                aria-label={`${heading} Image`}
            >
                <Image
                    src={imgSrc}
                    alt={heading}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-opacity duration-300"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-lg font-medium text-black bg-gold rounded-full w-36 h-36 flex items-center justify-center">
                        {hoverText}
                    </span>
                </div>
            </div>

            {/* Text Heading and Description */}
            <div className="mt-6 flex flex-col items-center">
                <h2 className="text-2xl md:text-4xl font-semibold text-gold">{heading}</h2>
                <p className="text-lg md:text-xl text-gray-400">{description}</p>
            </div>

            {/* Vertical Line - Render only if not the last element */}
            {!isLast && (
                <div className="absolute top-0 right-[-48px] w-px bg-gold h-full pointer-events-none"></div>
            )}
        </div>
    );
};

export default PageSection;
