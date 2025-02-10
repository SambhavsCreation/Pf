"use client";

import { useEffect, useRef, useContext } from "react";
import { CursorContext } from "./CursorContext";

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);

    // We only apply smoothing/lag when the cursor is free.
    // If locked, we do direct assignment to avoid flickering.
    const delay = 0.1;

    // Position and target references
    const position = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    // Animation flags
    const wobble = useRef(false);
    const rubberBand = useRef(false);
    const wobbleTimeout = useRef(null);
    const rubberBandTimeout = useRef(null);

    // Destructure from context
    const {
        cursorTarget,        // XY coordinates if needed
        setCursorTarget,
        lockedElement,       // The DOM node we are currently locked on
        // ...other states if you use them
    } = useContext(CursorContext);

    // ---------------------------
    // 1) Mouse Move
    // ---------------------------
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (prefersReducedMotion || isTouchDevice) {
            if (cursorRef.current) {
                cursorRef.current.style.display = "none";
            }
            return;
        }

        const handleMouseMove = (e) => {
            // Only update if we are NOT locked to an element
            if (!lockedElement) {
                target.current = { x: e.clientX, y: e.clientY };

                // Wobble effect
                wobble.current = true;
                if (wobbleTimeout.current) clearTimeout(wobbleTimeout.current);
                wobbleTimeout.current = setTimeout(() => {
                    wobble.current = false;
                }, 300);

                // Rubber band effect
                rubberBand.current = true;
                if (rubberBandTimeout.current) clearTimeout(rubberBandTimeout.current);
                rubberBandTimeout.current = setTimeout(() => {
                    rubberBand.current = false;
                }, 150);
            } else {
                // If locked, stop leftover effects
                wobble.current = false;
                if (wobbleTimeout.current) {
                    clearTimeout(wobbleTimeout.current);
                    wobbleTimeout.current = null;
                }
                rubberBand.current = false;
                if (rubberBandTimeout.current) {
                    clearTimeout(rubberBandTimeout.current);
                    rubberBandTimeout.current = null;
                }
            }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (wobbleTimeout.current) clearTimeout(wobbleTimeout.current);
            if (rubberBandTimeout.current) clearTimeout(rubberBandTimeout.current);
        };
    }, [lockedElement]);

    // ---------------------------
    // 2) Main Animation Loop
    // ---------------------------
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (prefersReducedMotion || isTouchDevice) return;

        const animate = (time) => {
            if (previousTimeRef.current !== undefined) {
                if (lockedElement) {
                    //
                    //  NO smoothing. Place exactly at the bounding box center each frame.
                    //
                    const rect = lockedElement.getBoundingClientRect();
                    position.current.x = rect.left + rect.width / 2;
                    position.current.y = rect.top + rect.height / 2;
                } else if (cursorTarget) {
                    //
                    //  If no locked element, but we do have a manual cursorTarget:
                    //  Smoothly move position toward cursorTarget
                    //
                    const dx = cursorTarget.x - position.current.x;
                    const dy = cursorTarget.y - position.current.y;
                    position.current.x += dx * delay;
                    position.current.y += dy * delay;
                } else {
                    //
                    //  If not locked and no cursorTarget, do nothing special
                    //  (You might want to keep a fallback to 'target.current' or similar)
                    //
                    // e.g.:
                    const dx = target.current.x - position.current.x;
                    const dy = target.current.y - position.current.y;
                    position.current.x += dx * delay;
                    position.current.y += dy * delay;
                }

                // Wobble rotation
                let rotation = 0;
                if (wobble.current) {
                    rotation = Math.sin(time / 100) * 2;
                }

                // Rubber band scaling
                let scaleX = 1;
                let scaleY = 1;
                if (rubberBand.current) {
                    scaleX = 1.05;
                    scaleY = 0.95;
                }

                // Opacity if wobbling
                let opacity = 1;
                if (wobble.current || rubberBand.current) {
                    opacity = 0.8;
                }

                // Apply the transform
                if (cursorRef.current) {
                    cursorRef.current.style.transform = `
            translate3d(${position.current.x}px, ${position.current.y}px, 0)
            rotate(${rotation}deg)
            scale(${scaleX}, ${scaleY})
            translate(-50%, -50%)
          `;
                    cursorRef.current.style.opacity = opacity.toString();
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [lockedElement, cursorTarget, delay]);

    return (
        <div
            ref={cursorRef}
            className="
        fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none
        border-[0.5px] border-gold transition-transform duration-200 ease-out
        z-[10]
      "
        />
    );
}
