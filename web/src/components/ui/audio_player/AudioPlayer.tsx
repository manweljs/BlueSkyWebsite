"use client"

import { useUserContext } from '@/context/UserContext';
import { FloatButton } from 'antd';
import React, { useEffect, useState } from 'react'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import style from '@/styles/style.module.sass'

export default function AudioPlayer() {

    const num = Math.floor(Math.random() * 7) + 1;
    const audioUrl = `/audio/audio0${num}.mp3`;
    const { startExperience, activeSection } = useUserContext()
    const [audio] = useState(() => {
        if (typeof Audio !== "undefined") {
            const newAudio = new Audio(audioUrl);
            newAudio.loop = true; // Menetapkan audio untuk loop
            return newAudio;
        }
    });

    const [play, setPlay] = useState(false);


    useEffect(() => {
        if (activeSection === 1) {
            setPlay(false);
        } else {
            startExperience && audio?.play();
            setPlay(true);
        }
    }, [activeSection, startExperience]);

    useEffect(() => {
        // Fungsi untuk menghandle visibility change
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                if (play) {
                    audio?.play();
                }
            } else {
                audio?.pause();
            }
        };

        // Menambahkan event listener ketika komponen di-mount
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Pemutaran atau penjedaan audio berdasarkan state `play`
        if (play) {
            audio?.play();
        } else {
            audio?.pause();
        }

        // Cleanup function untuk menghapus event listener
        return () => {
            audio?.pause();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [play, audio]);

    return (
        <FloatButton
            onClick={() => setPlay(!play)}
            className={style.button_audio}
            shape='circle'
            icon={play ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        />
    )
};