// components/Navbar.js
"use client";

import { useState, useEffect, useRef, useContext } from 'react';
import { FaHome, FaInfo, FaEnvelope, FaUser } from 'react-icons/fa';
import { CursorContext } from "@/components/CursorContext";
import {usePathname} from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();

    const isHome = pathname === "/";

    const [isVisible, setIsVisible] = useState(!isHome);
    const { setCursorTarget } = useContext(CursorContext);
    const iconRefs = useRef([]);

    useEffect(() => {
        if (!isHome)
        {
            return
        }
        const handleScroll = () => {
            if (window.scrollY > 50) { // Adjust the scroll value as needed
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Check scroll position on component mount
        handleScroll();

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /**
     * Handles mouse enter event on navbar icons.
     * Sets the cursor target to the center of the hovered icon.
     * @param {number} index - The index of the hovered icon.
     */
    const handleMouseEnter = (index) => () => {
        const iconElement = iconRefs.current[index];
        if (iconElement) {
            const rect = iconElement.getBoundingClientRect();
            setCursorTarget({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        }
    };

    /**
     * Handles mouse leave event on navbar icons.
     * Resets the cursor target to null, allowing it to follow the mouse.
     */
    const handleMouseLeave = () => {
        setCursorTarget(null);
    };

    return (
        <nav
            className={`fixed w-full bottom-0 border-gold md:bottom-4 left-1/2 md:w-1/5 backdrop-blur-md p-3 flex justify-around items-center transform shadow-xl -translate-x-1/2 md:rounded-full transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : 'opacity-0 translate-y-[5.5rem]'
            }`}
            style={{ borderWidth: "1px" }}
        >
            {/* Background Layer for Visual Effect */}
            <div className="absolute inset-0 bg-[#B6B6B6] opacity-15 rounded-full pointer-events-none border-gold"></div>

            {/* Navbar Icons with Hover Handlers */}
            <a
                href="#home"
                className="text-gray-700 hover:text-blue-500"
                ref={el => iconRefs.current[0] = el}
                onMouseEnter={handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
            >
                <FaHome size={15} className="icon opacity-100" />
            </a>
            <a
                href="#about"
                className="text-gray-700 hover:text-blue-500"
                ref={el => iconRefs.current[1] = el}
                onMouseEnter={handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
            >
                <FaInfo size={15} className="icon opacity-100" />
            </a>
            <a
                href="#contact"
                className="text-gray-700 hover:text-blue-500"
                ref={el => iconRefs.current[2] = el}
                onMouseEnter={handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
            >
                <FaEnvelope size={15} className="icon opacity-100" />
            </a>
            <a
                href="#profile"
                className="text-gray-700 hover:text-blue-500"
                ref={el => iconRefs.current[3] = el}
                onMouseEnter={handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
            >
                <FaUser size={15} className="icon opacity-100" />
            </a>
        </nav>
    );
}