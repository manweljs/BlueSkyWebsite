"use client"

import React, { useEffect, useState } from 'react'
// import style from "./style.module.sass"

export default function AudioPlayer() {
    const [audio] = useState(typeof Audio !== "undefined" ? new Audio('/audio/Home - Bluesky Creations.mp3') : undefined);

    useEffect(() => {
        // Fungsi untuk memulai audio
        const playAudio = () => {
            audio?.play()
                .catch((error) => console.error("Error playing the audio", error));
            // Menghapus event listener setelah audio diputar
            window.removeEventListener('click', playAudio);
        };

        // Menambahkan event listener untuk klik pertama
        window.addEventListener('click', playAudio);

        return () => {
            window.removeEventListener('click', playAudio);
        };
    }, [audio]);

    return null; // Komponen ini tidak perlu me-render apa-apa
};