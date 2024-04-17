import { useEffect, useRef, useState } from "react";

export const useFPS = (callback, duration = 5000, run = true) => {
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const [highestFPS, setHighestFPS] = useState(0);
    const startTimeRef = useRef(null);

    const animate = (time) => {
        if (previousTimeRef.current !== null && run) {
            const deltaTime = time - previousTimeRef.current;
            const fps = 1000 / deltaTime;
            setHighestFPS(prevHighest => (fps > prevHighest ? fps : prevHighest));
        }
        previousTimeRef.current = time;
        if (run) {
            requestRef.current = requestAnimationFrame(animate);
        }
    };

    useEffect(() => {
        if (run) {
            startTimeRef.current = performance.now();
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [run]);

    useEffect(() => {
        if (!run) {
            return;
        }

        const intervalId = setInterval(() => {
            callback(highestFPS);  // Call the callback with the highest FPS after each duration
            setHighestFPS(0);  // Reset highest FPS
        }, duration);

        return () => {
            clearInterval(intervalId);
        };
    }, [run, duration, callback]);

    return highestFPS;
};
