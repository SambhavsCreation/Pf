// hooks/useWindowSize.js
import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = () => ({
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined,
    });

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        const handleResize = () => {
            setWindowSize(getSize());
        };

        window.addEventListener('resize', handleResize);
        // Initialize size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [isClient]);

    return windowSize;
};

export default useWindowSize;