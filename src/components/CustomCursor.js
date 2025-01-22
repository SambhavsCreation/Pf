// components/CustomCursor.js
"use client";

import { useEffect, useRef, useContext } from 'react';
import { CursorContext } from './CursorContext';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);

    const delay = 0.15; // Smoothing factor
    const position = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });
    const wobble = useRef(false);
    const rubberBand = useRef(false);
    const wobbleTimeout = useRef(null);
    const rubberBandTimeout = useRef(null);

    const { cursorTarget } = useContext(CursorContext);

    useEffect(() => {
        // Check if the user prefers reduced motion
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        // Check if the device supports touch
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (prefersReducedMotion || isTouchDevice) {
            // Hide the custom cursor
            if (cursorRef.current) {
                cursorRef.current.style.display = 'none';
            }
            return;
        }

        const handleMouseMove = (e) => {
            // Only update target to mouse position if not hovering over a navbar icon
            if (!cursorTarget) {
                // Trigger wobble effect on mouse movement
                target.current = { x: e.clientX, y: e.clientY };
                wobble.current = true;
                if (wobbleTimeout.current) clearTimeout(wobbleTimeout.current);
                wobbleTimeout.current = setTimeout(() => {
                    wobble.current = false;
                }, 300); // Increased wobble duration

                // Trigger rubber band effect on mouse movement
                rubberBand.current = true;
                if (rubberBandTimeout.current) clearTimeout(rubberBandTimeout.current);
                rubberBandTimeout.current = setTimeout(() => {
                    rubberBand.current = false;
                }, 150); // Rubber band duration
            }
            else {
                wobble.current = false;
                rubberBandTimeout.current = false;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (wobbleTimeout.current) clearTimeout(wobbleTimeout.current);
            if (rubberBandTimeout.current) clearTimeout(rubberBandTimeout.current);
        };
    }, [cursorTarget]);

    useEffect(() => {
        // Check again in case the user changes preferences dynamically
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        const isTouchDevice =
            'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (prefersReducedMotion || isTouchDevice) return;

        const animate = (time) => {
            if (previousTimeRef.current !== undefined) {
                // If cursorTarget is set, use it as the target
                if (cursorTarget) {
                    target.current = cursorTarget;
                }

                // Calculate the difference between target and current positions
                const dx = target.current.x - position.current.x;
                const dy = target.current.y - position.current.y;

                // Update position with easing
                position.current.x += dx * delay;
                position.current.y += dy * delay;

                // Calculate wobble rotation with reduced amplitude
                let rotation = 0;
                if (wobble.current) {
                    rotation = Math.sin(time / 100) * 2; // Reduced wobble angle to 5 degrees
                }

                // Calculate rubber band scaling
                let scaleX = 1;
                let scaleY = 1;
                if (rubberBand.current) {
                    scaleX = 1.05; // Slightly wider
                    scaleY = 0.95; // Slightly shorter
                }

                // Calculate opacity
                let opacity = 1;
                if (wobble.current || rubberBand.current) {
                    opacity = 0.8; // Slightly transparent during interaction
                }

                // Apply the position, rotation, scaling, and opacity to the cursor element
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY}) translate(-50%, -50%)`;
                    cursorRef.current.style.opacity = opacity;
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [cursorTarget]);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none border-[0.5px] border-gold transition-transform duration-200 ease-out`}
            style={{
                transform: `translate3d(0px, 0px, 0)`,
                zIndex: 9999,
            }}
        />
    );
}
