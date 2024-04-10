"use client"

import { SECTION } from '@/consts';
import { useUserContext } from '@/context/UserContext';
import React, { useEffect, useState } from 'react'

export default function AudioPlayer() {
    const [audio] = useState(() => {
        if (typeof Audio !== "undefined") {
            const newAudio = new Audio('/audio/Home - Bluesky Creations.mp3');
            newAudio.loop = true; // Menetapkan audio untuk loop
            return newAudio;
        }
    });

    const { activeSection } = useUserContext()
    const playAudio = () => {
        audio?.play()
            .catch((error) => console.error("Error playing the audio", error));
        // Menghapus event listener setelah audio diputar
        window.removeEventListener('click', playAudio);
    };

    useEffect(() => {
        // Fungsi untuk memulai audio


        // Menambahkan event listener untuk klik pertama
        window.addEventListener('click', playAudio);

        return () => {
            window.removeEventListener('click', playAudio);
        };
    }, [audio]);

    useEffect(() => {
        if (activeSection === SECTION.COLLABORATION) {
            audio?.pause();
        } else {
            audio?.play();
        }
    }, [activeSection]);

    return null; // Komponen ini tidak perlu me-render apa-apa
};