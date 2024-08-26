"use client";

import { PerspectiveCamera, CameraControls, useProgress, KeyboardControls, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { BlueSky } from "@/components/models/BlueSky";
import { Island } from "./models/floors/Island";
import BuildingCollection from "./models/buildings/BuildingCollection";
import { Text001 } from "./models/texts/Text001";
import { Beach } from "./models/beach/Beach";
import { useUserContext } from "@/context/UserContext";
import Scenes from "./models/scenes/Scenes";
import Markers from "./ui/Markers";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { TreesAndRocks } from "./models/trees/TreesAndRocks";
import { RoadAndFloors } from "./models/floors/RoadAndFloors";
import { isMobile } from "react-device-detect";
import BaseEnvironment from "./BaseEnvironment";
import { Streetlights } from "./models/streetlights/Streetlights";
import AnimatedObjects from "./models/animatedObjects";
import { Physics, RigidBody } from "@react-three/rapier";
import CarPlayer, { controls, spawn } from "./models/player/CarPlayer";
import { sectionData } from "./sections/Sections";

export const Scene = () => {
    const { camera: mainCamera } = useThree()
    const { camera, setCamera, cameraControlsRef, setLoadingProgress, quality, playerMode } = useUserContext()
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

    const resetCamera = (initial = false) => {
        if (!cameraControlsRef.current) return
        cameraControlsRef.current.setLookAt(
            ...sectionData[0].lookAt.pos,
            ...sectionData[0].lookAt.target,

        )

        if (initial) {
            cameraControlsRef.current.zoom(camera.zoom / 4, true)
        }
    }

    useEffect(() => {
        if (cameraControlsRef.current && !initialScene) {
            // console.log('cameraControlsRef', cameraControlsRef)
            console.log('initialize')
            resetCamera(true)
            setInitialScene(true)
        }
    }, [cameraControlsRef.current, initialScene]);

    useEffect(() => {
        if (!playerMode && initialScene) {
            resetCamera()
        }
    }, [playerMode]);

    if (!camera) return null

    return (
        <React.Fragment>

            {!playerMode &&
                <>
                    <CameraControls
                        ref={cameraControlsRef}
                        camera={camera}
                        maxPolarAngle={1.2}
                        maxDistance={100}
                        minDistance={10}
                        makeDefault
                        dampingFactor={2}
                    />
                    <Markers />
                </>
            }

            {playerMode &&
                <>
                    <OrbitControls makeDefault />
                    <PerspectiveCamera zoom={2.5} />
                </>
            }


            <Text001 />
            <BlueSky />
            <AnimatedObjects />
            <Beach />
            <Streetlights />
            <Scenes />
            <TreesAndRocks />

            <Physics gravity={[0, -9.81, 0]} debug={playerMode} >

                <BuildingCollection />
                {playerMode &&
                    <KeyboardControls map={controls} >
                        <CarPlayer position={spawn.position} rotation={spawn.rotation} />
                    </KeyboardControls>
                }

                <RigidBody type="fixed" colliders="trimesh">
                    <Island />
                    <RoadAndFloors />
                </RigidBody>

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

        </React.Fragment>
    )
}
