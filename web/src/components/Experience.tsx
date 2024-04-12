"use client";
import { Environment, PerspectiveCamera, Stars, Html, CameraControls, useProgress } from "@react-three/drei";
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



const baseColor = "#9fd0fd"
const nightColor = "#0a0e24"




const Experience = () => {
    return (
        <>
            <AudioPlayer />
            <DayNightControls />
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


    const { isNight, setIsNight } = useUserContext()

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
                        // maxDistance={100}
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
                    <BaseEnvironment />
                    <Scenes />
                    <Markers />
                    <TreesAndRocks />
                    <RoadAndFloors />
                    <Bloom mipmapBlur luminanceThreshold={1} />

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

const BaseEnvironment = () => {
    const { isNight } = useUserContext();
    const ref = useRef(null);
    const lightRef = useRef(null);
    const { scene } = useThree(); // Hook dari react-three-fiber untuk mengakses scene
    const [environmentColor, setEnvironmentColor] = useState(new THREE.Color(baseColor));
    const [intensity, setIntensity] = useState(1); // Intensitas cahaya default

    // Warna target berdasarkan siang atau malam
    const targetColor = new THREE.Color(isNight ? nightColor : baseColor);
    const targetIntensity = isNight ? 0.6 : 1; // Target intensitas untuk malam dan siang

    useEffect(() => {
        scene.fog = new THREE.Fog(environmentColor, 130, 200);
    }, []);

    useFrame(() => {
        if (ref.current && scene.fog) {
            ref.current.material.color.lerp(targetColor, 0.05);
            setEnvironmentColor(ref.current.material.color);
            scene.fog.color.set(environmentColor);

            if (lightRef.current) {
                // Lerp intensitas cahaya secara manual
                lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.05;
            }
        }
    });

    useFrame(() => {
        if (ref.current && scene.fog) {
            ref.current.material.color.lerp(targetColor, 0.05);
            setEnvironmentColor(ref.current.material.color);
            scene.fog.color.set(environmentColor);

            if (lightRef.current) {
                // Lerp intensitas cahaya secara manual
                lightRef.current.intensity += (targetIntensity - lightRef.current.intensity) * 0.05;
                setIntensity(lightRef.current.intensity);
            }
        }
    });

    return (
        <>
            {isNight && <Stars radius={300} speed={1} count={300} saturation={0.9} fade={true} factor={5} depth={0.1} />}

            <directionalLight
                ref={lightRef}
                castShadow
                position={[15, 65, 15]}
                intensity={intensity}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.2}
                shadow-camera-far={500}
                shadow-camera-left={-130}
                shadow-camera-right={130}
                shadow-camera-top={130}
                shadow-camera-bottom={-130}
                color={isNight ? "#5b8fff" : "white"}
            />
            <Environment background>

                <mesh ref={ref}>
                    <sphereGeometry args={[800, 800, 800]} />
                    <meshBasicMaterial color={environmentColor} side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
};
export default Experience