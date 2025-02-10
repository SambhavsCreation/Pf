import { useState, useEffect } from 'react';

export default function VideoBackground() {
    // State to control the visibility of the overlay
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        // Delay in milliseconds (e.g., 2000ms = 2 seconds)
        const delay = 2000;

        const timer = setTimeout(() => {
            setShowOverlay(true);
        }, delay);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden m-0 p-0">
            {/* Video Element */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="homeopener.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white 
          transition-opacity duration-1000 ease-out transform 
          ${showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
            >
                <h1
                    className={`text-4xl md:text-6xl mb-4 
            transition-all duration-1000 ease-out text-gold
            ${showOverlay ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}
          `}
                >
                    Sambhav Sharma
                </h1>
                <p
                    className={`text-lg md:text-2xl font-inter
            transition-all duration-1000 ease-out 
            ${showOverlay ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-10'}
          `}
                >
                    Grab a seat.
                </p>
            </div>
        </div>
    );
}
