"use client";

import { PerspectiveCamera, CameraControls, useProgress, Stats } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { BlueSky } from "@/components/models/BlueSky";
import { BlueSkyStatue } from "@/components/models/BlueSkyStatue";
import { Island } from "./models/floors/Island";
import VehicleCollection from "./models/vehicles/VehicleCollection";
import BuildingCollection from "./models/buildings/BuildingCollection";
import { Text001 } from "./models/texts/Text001";
import { WindMils } from "./models/windmils/Windmils";
import { Beach } from "./models/beach/Beach";
import Sections from "./sections/Sections";
import { useUserContext } from "@/context/UserContext";
import { sectionData } from "@/consts";
import Scenes from "./models/scenes/Scenes";
import AudioPlayer from "./ui/audio_player/AudioPlayer";
import Markers from "./ui/markers/Markers";
import Navbar from "./ui/navbar/Navbar";
import ControlGuide from "./ui/ControlGuide";
import LoadingExperience from "./ui/LoadingExperience";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { TreesAndRocks } from "./models/trees/TreesAndRocks";
import { RoadAndFloors } from "./models/floors/RoadAndFloors";
import DayNightControls from "./ui/DayNightControls";
import { isMobile } from "react-device-detect";
import BaseEnvironment from "./BaseEnvironment";
import style from "@/styles/style.module.sass"
import { Streetlights } from "./models/streetlights/Streetlights";
import { ConfigProvider, theme } from "antd";
import { useFPS } from "./hooks/useFPS";
import { Quality } from "@/types";


const Experience = () => {

    return (
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
        }}
        >
            <AudioPlayer />
            <DayNightControls />
            <Sections />
            <LoadingExperience />
            <Navbar />
            <ControlGuide />

            <Canvas shadows className="main-canvas" >
                <Stats className={style.stats} />
                <Scene />
            </Canvas>

        </ConfigProvider >
    )
}


const timeCheck = 3;

const Scene = () => {
    const { camera: mainCamera } = useThree()
    const { camera, setCamera, cameraControlsRef, setLoadingProgress, setQuality, quality } = useUserContext()
    const [initialScene, setInitialScene] = useState(false)
    const [qualitySet, setQualitySet] = useState(false)

    const { progress } = useProgress()

    useEffect(() => {
        setLoadingProgress(progress)
    }, [progress])
    useEffect(() => {
        if (mainCamera) {
            setCamera(mainCamera)

        }
    }, [mainCamera]);

    useEffect(() => {
        if (cameraControlsRef.current && !initialScene) {
            // console.log('cameraControlsRef', cameraControlsRef)
            console.log('initialize')
            cameraControlsRef.current.setLookAt(
                ...sectionData[0].lookAt.pos,
                ...sectionData[0].lookAt.target,

            )
            cameraControlsRef.current.zoom(camera.zoom / 3, true)
            setInitialScene(true)
        }
    }, [cameraControlsRef.current, initialScene]);


    useFPS((fps) => {
        if (!qualitySet) {
            let quality: Quality = 0;
            if (fps <= 15) {
                quality = 0;
            } else if (fps > 15 && fps <= 25) {
                quality = 1;
            } else {
                quality = 2;
            }
            setQuality(0);
            setQualitySet(true);
            console.log(`Average FPS over ${timeCheck} seconds:`, fps);
        }
    }, timeCheck * 1000);

    return (
        <>
            {camera &&
                <>
                    <CameraControls
                        ref={cameraControlsRef}
                        camera={camera}
                        maxPolarAngle={1.2}
                        maxDistance={100}
                        minDistance={25}
                        makeDefault
                    />

                    <PerspectiveCamera zoom={2} />

                    <Text001 />
                    <BlueSky />
                    <BlueSkyStatue />
                    <VehicleCollection />
                    <BuildingCollection />
                    <WindMils />
                    <Beach />
                    <Island />
                    <Streetlights />
                    <Scenes />
                    <Markers />
                    <TreesAndRocks />
                    <RoadAndFloors />
                    <Bloom mipmapBlur luminanceThreshold={1} />

                    {!isMobile && quality > 1 &&
                        <EffectComposer>
                            <DepthOfField
                                focusDistance={0.02}
                                focalLength={0.15}
                                bokehScale={2}
                            />
                        </EffectComposer>
                    }

                    <BaseEnvironment />
                </>
            }
        </>
    )
}



export default Experience