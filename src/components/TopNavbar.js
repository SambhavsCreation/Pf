"use client"
// components/Navbar.js
import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from "next/navigation";

const TopNavbar = () => {
    const pathname = usePathname();
    const router = useRouter();

    // Check if user is on the homepage
    const isHome = pathname === "/";

    // By default, if not home, the navbar should be visible.
    // If on home, wait until user scrolls down at least one screen height.
    const [isVisible, setIsVisible] = useState(!isHome);

    const [currentTime, setCurrentTime] = useState("");

    // Debounce function to optimize scroll event handling
    const debounce = (func, wait) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func();
            }, wait);
        };
    };

    // Function to handle scroll and toggle navbar visibility
    const handleScroll = useCallback(() => {
        // If not on homepage, we want the navbar always visible.
        // So skip logic if not on home.
        if (!isHome) {
            return;
        }

        const scrollY = window.scrollY || window.pageYOffset;
        const viewportHeight = window.innerHeight;

        // If user has scrolled at least one screen height, show the navbar
        if (scrollY >= viewportHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [isHome]);

    // Function to update the current time every second
    const updateTime = useCallback(() => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        setCurrentTime(formattedTime);
    }, []);

    useEffect(() => {
        // If user is on home page, set up scroll listener
        if (isHome) {
            const debouncedHandleScroll = debounce(handleScroll, 20);
            window.addEventListener("scroll", debouncedHandleScroll);

            // Run the scroll logic once immediately
            handleScroll();

            return () => {
                window.removeEventListener("scroll", debouncedHandleScroll);
            };
        } else {
            // If not home, always visible
            setIsVisible(true);
        }
    }, [isHome, handleScroll]);

    useEffect(() => {
        // Update time once per second
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [updateTime]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full h-16 bg-black bg-opacity-20 backdrop-blur-lg text-white flex items-center justify-between px-6 md:px-12 transition-transform duration-300 ${
                isVisible ? "transform translate-y-0" : "-translate-y-full"
            } z-50 border-b border-gold `}
        >
            {/* Left Section: Logo and Vertical Line */}
            <div className="flex items-center h-full">
                <span
                    className="text-xl font-medium text-gold cursor-pointer"
                    onClick={() => router.push("/")}
                >
                    Sam. S.
                </span>
                <div className="w-px h-full ml-4 bg-gold"></div>
            </div>

            {/* Center Gap */}
            <div className="flex-grow"></div>

            {/* Right Section: Vertical Line and Time */}
            <div className="flex items-center h-full">
                <div className="w-px bg-gold h-full mr-4"></div>
                <span className="text-lg text-gold font-medium">{currentTime}</span>
            </div>
        </nav>
    );
};

export default TopNavbar;
