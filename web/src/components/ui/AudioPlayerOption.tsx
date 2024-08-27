"use client"

import { useUserContext } from '@/hooks/UserContext';
import { FloatButton } from 'antd';
import React, { useEffect, useState } from 'react'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import s from './Ui.module.sass'

export function AudioPlayerOption() {

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
    const [userPaused, setUserPaused] = useState(false);


    useEffect(() => {
        // Kontrol play/pause berdasarkan startExperience dan activeSection, dengan mempertimbangkan userPaused
        if (startExperience && activeSection !== 1 && !userPaused) {
            setPlay(true);
        } else {
            setPlay(false);
        }
    }, [startExperience, activeSection, userPaused]);



    useEffect(() => {
        // Efek untuk mengatur play atau pause pada elemen audio
        if (audio) {
            if (play) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [audio, play]);

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

    const handleUserPaused = () => {
        setUserPaused(!userPaused);
        setPlay(!play);
    }

    return (
        <FloatButton
            onClick={() => handleUserPaused()}
            className={s.button_audio}
            shape='circle'
            icon={play ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
        />
    )
};