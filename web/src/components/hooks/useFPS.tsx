import { useEffect, useRef, useState } from "react";

export const useFPS = (callback, duration = 10000) => {
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const framesRef = useRef(0);
    const [averageFPS, setAverageFPS] = useState(null);

    useEffect(() => {
        const startTime = performance.now(); // Catat waktu mulai

        const animate = (time) => {
            if (previousTimeRef.current != null) {
                framesRef.current += 1; // Hitung frame

                const elapsedTime = time - startTime;
                if (elapsedTime >= duration) {
                    // Jika durasi yang ditentukan tercapai
                    const fps = framesRef.current / (elapsedTime / 1000); // Hitung rata-rata FPS
                    setAverageFPS(fps); // Set rata-rata FPS
                    callback(fps); // Panggil callback dengan rata-rata FPS
                    cancelAnimationFrame(requestRef.current); // Hentikan animasi
                    return; // Keluar dari fungsi untuk menghentikan loop
                }
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        }

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [callback, duration]);

    return averageFPS;
}
