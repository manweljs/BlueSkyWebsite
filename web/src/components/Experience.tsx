"use client";

import { PerspectiveCamera, CameraControls, useProgress, Stats, Html, KeyboardControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { BlueSky } from "@/components/models/BlueSky";
import { Island } from "./models/floors/Island";
import BuildingCollection from "./models/buildings/BuildingCollection";
import { Text001 } from "./models/texts/Text001";
import { Beach } from "./models/beach/Beach";
import Sections from "./sections/Sections";
import { useUserContext } from "@/context/UserContext";
import { sectionData, preloadingTime, Controls } from "@/consts";
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
import { Col, ConfigProvider, theme } from "antd";
import { useFPS } from "./hooks/useFPS";
import { Quality } from "@/types";
import AnimatedObjects from "./models/animatedObjects";
import ModeControls from "./ui/ModeControls";
import { Adventurer } from "./models/player/Adventurer";
import { MeshCollider, Physics, RigidBody } from "@react-three/rapier";
import { BusPlayer } from "./models/player/BusPlayer";



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
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
        }}
        >
            <AudioPlayer />
            <DayNightControls />
            <Sections />
            <LoadingExperience />
            <Navbar />
            <ModeControls />
            <ControlGuide />
            <KeyboardControls
                map={[
                    { name: Controls.forward, keys: ["ArrowUp", "w", "W"] },
                    { name: Controls.backward, keys: ["ArrowDown", "s", "S"] },
                    { name: Controls.left, keys: ["ArrowLeft", "a", "A"] },
                    { name: Controls.right, keys: ["ArrowRight", "d", "D"] },
                    { name: Controls.jump, keys: ["Space"] },
                ]}
            >
                <Canvas shadows className="main-canvas" >
                    <Stats className={style.stats} />
                    <Scene />
                </Canvas>
            </KeyboardControls>

        </ConfigProvider >
    )
}



const Scene = () => {
    const { camera: mainCamera } = useThree()
    const { camera, setCamera, cameraControlsRef, setLoadingProgress, setQuality, quality, qualitySet, setQualitySet, userPreference } = useUserContext()
    const [initialScene, setInitialScene] = useState(false)


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
            cameraControlsRef.current.zoom(camera.zoom / 4, true)
            setInitialScene(true)
        }
    }, [cameraControlsRef.current, initialScene]);





    return (
        <>
            {camera &&
                <>
                    <CameraControls
                        ref={cameraControlsRef}
                        camera={camera}
                        maxPolarAngle={1.2}
                        maxDistance={100}
                        minDistance={10}
                        makeDefault
                    />

                    <PerspectiveCamera zoom={2.5} />

                    <Text001 />
                    <BlueSky />
                    <AnimatedObjects />
                    <Beach />
                    <Island />
                    <Streetlights />
                    <Scenes />
                    <Markers />
                    <TreesAndRocks />

                    <Physics gravity={[0, -9.81, 0]} >
                        <BuildingCollection />

                        <RigidBody type="fixed" colliders="trimesh">
                            <RoadAndFloors />
                        </RigidBody>

                        {/* <BusPlayer /> */}
                    </Physics>
                    <Bloom mipmapBlur luminanceThreshold={1} />

                    {!isMobile && quality > 1 &&
                        <EffectComposer
                            depthBuffer
                            autoClear
                        >
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