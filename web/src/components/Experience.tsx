"use client";
import { Environment, PerspectiveCamera, Stars, Html, CameraControls, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
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



const baseColor = "#9fd0fd"
const nightColor = "#0a0e24"



const Experience = () => {
    return (
        <>
            <AudioPlayer />
            <Sections />
            <LoadingExperience />
            <Navbar />
            <ControlGuide />
            <Canvas shadows className="main-canvas">
                <Suspense fallback={<LoadingModel />} >
                    <Scene />


                </Suspense>
            </Canvas>
        </>

    )
}

const LoadingModel = () => {
    const { progress } = useProgress()
    // console.log('progress', progress)
    return <Html center>{progress} % loaded</Html>
}


const Scene = () => {
    const { camera: mainCamera } = useThree()

    const { isNight } = useUserContext()

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
                    {process.env.NODE_ENV === 'development' &&
                        <Leva />
                    }
                    <CameraControls
                        ref={cameraControlsRef}
                        camera={camera}
                        maxPolarAngle={1.2}
                        maxDistance={100}
                        minDistance={25}

                        makeDefault
                    />

                    <PerspectiveCamera zoom={2} />

                    <directionalLight
                        castShadow
                        position={[15, 65, 15]}
                        intensity={isNight ? 0.1 : 1}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-near={0.2}
                        shadow-camera-far={500}
                        shadow-camera-left={-130}
                        shadow-camera-right={130}
                        shadow-camera-top={130}
                        shadow-camera-bottom={-130}
                    />

                    <Text001 />
                    <BlueSky />
                    <BlueSkyStatue />
                    <VehicleCollection />
                    <BuildingCollection />
                    <WindMils />
                    <Beach />
                    <Island />
                    <BaseEnvirontment />
                    <Scenes />
                    <Markers />
                    <TreesAndRocks />
                    <RoadAndFloors />
                    <Bloom mipmapBlur luminanceThreshold={1} />
                    <fog attach="fog" args={[isNight ? nightColor : baseColor, 130, 200]} />

                    <EffectComposer

                    >
                        <DepthOfField
                            focusDistance={0.02}
                            focalLength={0.15}
                            bokehScale={2}
                        />
                    </EffectComposer>


                </>
            }
        </>
    )
}

const BaseEnvirontment = () => {
    const { isNight } = useUserContext()
    return (
        <>
            {isNight && <Stars radius={300} speed={1} count={300} saturation={9} fade factor={5} depth={0.1} />}
            <Environment background  >
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[500, 500, 500]} />
                    <meshBasicMaterial color={isNight ? nightColor : baseColor} side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    )
}


export default Experience