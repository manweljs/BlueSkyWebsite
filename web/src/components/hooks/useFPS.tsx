import { useEffect, useRef } from "react";

export const useFPS = (callback, duration = 5000, run = true) => {
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const highestFPSRef = useRef(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (!run) {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            return;
        }

        startTimeRef.current = performance.now(); // Reset start time when run becomes true

        const animate = (time) => {
            if (previousTimeRef.current !== null) {
                const deltaTime = time - previousTimeRef.current;
                if (deltaTime > 0) { // Ensure deltaTime is positive to avoid division by zero
                    const fps = 1000 / deltaTime;
                    highestFPSRef.current = Math.max(highestFPSRef.current, fps);
                }
            }

            if (time - startTimeRef.current < duration) {
                previousTimeRef.current = time;
                requestRef.current = requestAnimationFrame(animate);
            } else {
                // Once the duration is over, call the callback and reset the highest FPS
                callback(highestFPSRef.current);
                highestFPSRef.current = 0; // Reset highest FPS for the next measurement period
                startTimeRef.current = null; // Clear the start time
            }
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [callback, duration, run]);

    return highestFPSRef.current;
};
