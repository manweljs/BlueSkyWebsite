import { useEffect, useRef } from "react";

export const useFPS = (callback, run) => {
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const highestFPSRef = useRef(0);

    useEffect(() => {
        const animate = (time) => {
            if (!run) {
                return; // Hentikan animasi jika run false
            }

            if (previousTimeRef.current !== null) {
                const deltaTime = time - previousTimeRef.current;
                if (deltaTime > 0) {
                    const fps = 1000 / deltaTime;
                    highestFPSRef.current = Math.max(highestFPSRef.current, fps);
                }
            }

            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        };

        if (run) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (highestFPSRef.current > 0) {
                callback(highestFPSRef.current);
                highestFPSRef.current = 0; // Reset highest FPS
            }
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [callback, run]);

    return highestFPSRef.current;
};