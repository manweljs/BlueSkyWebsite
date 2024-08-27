"use client";

import { Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
// import Sections from "./sections/Sections";
import { useUserContext } from "@/hooks/UserContext";
import { AudioPlayerOption } from "./ui/AudioPlayerOption";
import Navbar from "./ui/navbar/Navbar";
import ControlGuide from "./ui/ControlGuide";
import LoadingExperience from "./ui/LoadingExperience";
import { DayNightOption } from "./ui/DayNightOption";
import { isMobile } from "react-device-detect";
import style from "@/styles/style.module.sass"
import { ConfigProvider, theme } from "antd";
import { useFPS } from "./hooks/useFPS";
import { Quality } from "@/types";
import { QualityOption } from "./ui/QualityOption";
import { Scene } from "./Scene";
import PlayerModeOption from "./ui/PlayerModeOption";

import dynamic from "next/dynamic";
const Sections = dynamic(() => import('./sections/Sections'), { ssr: false })

const Experience = () => {

    const { userPreference, setQuality } = useUserContext()
    const [run, setRun] = useState(true);

    useEffect(() => {
        console.log('userPreference changed', userPreference)
        setRun(userPreference === undefined)
    }, [userPreference]);

    useFPS((fps: number) => {
        console.log('fps', fps)
        handleQualitySetup(fps)
    }, run);

    const handleQualitySetup = (fps: number) => {
        if (!userPreference || !fps) return

        if (userPreference === 'quality') {
            setQuality(2)
            return
        }

        if (userPreference === 'performance') {
            setQuality(0)
            return
        }

        if (userPreference === 'auto') {
            let q: Quality;
            if (fps <= 15) {
                q = 0;
            } else if (isMobile) {
                q = 1;
            } else if (fps > 15 && fps <= 25) {
                q = 1;
            } else {
                q = 2;
            }
            setQuality(q);
        }

    }


    return (
        <React.Fragment>
            <AudioPlayerOption />
            <DayNightOption />
            {process.env.NEXT_PUBLIC_MODE === 'development' &&
                <>
                    <Stats className={style.stats} />
                    <QualityOption />
                </>

            }

            {/* <PlayerModeOption /> */}
            <ControlGuide />

            <Sections />
            <LoadingExperience />
            <Navbar />

            <Canvas shadows className="main-canvas" >
                <Scene />
            </Canvas>
        </React.Fragment>
    )
}






export default Experience