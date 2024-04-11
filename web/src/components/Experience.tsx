"use client";
import { Environment, Text3D, OrbitControls, PerspectiveCamera, Plane, SpotLight, Stars, OrthographicCamera, ContactShadows, RoundedBox, Sky, Html, CameraControls } from "@react-three/drei";
import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
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
import { UserProvider, useUserContext } from "@/context/UserContext";
import { sectionData } from "@/consts";
import Leva from "./Leva";
import Scenes from "./models/scenes/Scenes";
import AudioPlayer from "./ui/audio_player/AudioPlayer";

import Markers from "./ui/markers/Markers";

const baseColor = "#7dc0ff"

export default function Experience() {
    return (
        <UserProvider>
            <AudioPlayer />
            <Sections />
            <Suspense >
                <Canvas shadows className="main-canvas">
                    <Scene />
                </Canvas>
            </Suspense>
        </UserProvider>
    )
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
            setInitialScene(true)
        }
    }, [cameraControlsRef.current, initialScene]);



    return (
        <Suspense>
            {camera &&
                <>
                    {process.env.NODE_ENV === 'development' &&
                        <Leva />
                    }
                    <CameraControls
                        ref={cameraControlsRef}
                        camera={camera}
                        maxPolarAngle={1.2}
                        maxDistance={120}
                        minDistance={25}
                    />
                    {/* <OrbitControls maxPolarAngle={1.2} maxDistance={120} maxZoom={5} onChange={handleOrbitChange} camera={camera} /> */}
                    <PerspectiveCamera makeDefault position={[75, 25, 30]} fov={55} />

                    <directionalLight
                        castShadow
                        position={[15, 65, 15]}
                        intensity={.7}
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

                    <fog attach="fog" args={["#9fc8e1", 165, 210]} />




                </>
            }
        </Suspense>
    )
}

const BaseEnvirontment = () => {
    return (
        <Environment background  >
            <mesh castShadow receiveShadow>
                <sphereGeometry args={[100, 100, 100]} />
                <meshBasicMaterial color={baseColor} side={THREE.BackSide} />
            </mesh>
        </Environment>
    )
}

