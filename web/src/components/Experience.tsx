"use client";
import { Environment, PerspectiveCamera, Stars, Html, CameraControls, useProgress, PerformanceMonitor, Stats } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
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
import Leva from "./Leva";
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


const Experience = () => {

    const { isNight } = useUserContext()
    return (
        <ConfigProvider
            theme={{
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
                <Suspense fallback={<LoadingModel />} >
                    <Scene />
                </Suspense>
            </Canvas>

        </ConfigProvider>

    )
}

const LoadingModel = () => {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}


const Scene = () => {
    const { camera: mainCamera } = useThree()
    const { camera, setCamera, cameraControlsRef } = useUserContext()
    const [initialScene, setInitialScene] = useState(false)

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



    return (
        <>
            {camera &&
                <>

                    {/* {process.env.NODE_ENV === 'development' &&
                        <Leva />
                    } */}
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


                    {!isMobile &&
                        <EffectComposer>
                            <DepthOfField
                                focusDistance={0.02}
                                focalLength={0.15}
                                bokehScale={2}
                            />
                        </EffectComposer>
                    }

                    <PerformanceMonitor ms={60} />
                    <BaseEnvironment />


                </>
            }
        </>
    )
}


export default Experience