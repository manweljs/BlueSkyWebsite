import { useEffect, useRef, useState } from "react";

export const useFPS = (callback, duration = 10000) => {
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);
    const framesRef = useRef(0);
    const [highestFPS, setHighestFPS] = useState(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        const animate = (time) => {
            if (previousTimeRef.current !== null) {
                const deltaTime = time - previousTimeRef.current; // Hitung selisih waktu antara frame terakhir dan saat ini
                const fps = 1000 / deltaTime; // Hitung FPS untuk frame ini

                setHighestFPS(prevHighest => {
                    return prevHighest === null || fps > prevHighest ? fps : prevHighest;
                }); // Perbarui nilai FPS tertinggi jika perlu

                framesRef.current += 1; // Tambahkan hitungan frame

                const elapsedTime = time - startTimeRef.current;
                if (elapsedTime >= duration) {
                    callback(highestFPS); // Panggil callback dengan FPS tertinggi
                    cancelAnimationFrame(requestRef.current); // Hentikan animasi
                    return; // Keluar dari fungsi untuk menghentikan loop
                }
            } else {
                startTimeRef.current = time; // Atur waktu mulai pada frame pertama
            }

            previousTimeRef.current = time; // Perbarui waktu untuk frame terakhir
            requestRef.current = requestAnimationFrame(animate); // Jadwalkan frame berikutnya
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(requestRef.current); // Bersihkan pada unmount
        };
    }, [callback, duration]); // Pastikan untuk mengikutsertakan semua dependencies di sini

    return highestFPS;
}
