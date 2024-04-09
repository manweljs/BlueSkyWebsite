"use client"

import React, { useEffect, useState } from 'react'

export default function AudioPlayer() {
    const [audio] = useState(() => {
        if (typeof Audio !== "undefined") {
            const newAudio = new Audio('/audio/Home - Bluesky Creations.mp3');
            newAudio.loop = true; // Menetapkan audio untuk loop
            return newAudio;
        }
    });

    useEffect(() => {
        // Fungsi untuk memulai audio
        const playAudio = () => {
            audio?.play()
                .catch((error) => console.error("Error playing the audio", error));
            // Menghapus event listener setelah audio diputar
            window.removeEventListener('click', playAudio);
        };

        // Menambahkan event listener untuk klik pertama
        window.addEventListener('click', null);

        return () => {
            window.removeEventListener('click', playAudio);
        };
    }, [audio]);

    return null; // Komponen ini tidak perlu me-render apa-apa
};