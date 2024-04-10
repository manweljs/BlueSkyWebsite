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
import Smoke from "./models/Smoke";
import Sections from "./sections/Sections";
import { UserProvider, useUserContext } from "@/context/UserContext";
import Marker from "./ui/Marker";
import { sectionData } from "@/consts";
import Leva from "./Leva";
import Scenes from "./models/scenes/Scenes";
import AudioPlayer from "./ui/audio_player/AudioPlayer";


const baseColor = "#7dc0ff"
const primaryColor = "#0062ff"

const defaultPos = [75, 10, 30]
const changePos = [50, 20, 10]

function CameraController(props: {
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera
    update?: any
}) {

    const { camera, update } = props;
    const [pos, setPos] = useState(null)

    useEffect(() => {
        //@ts-ignore

        camera.position.set(...defaultPos); // Mengatur posisi kamera
        camera.updateProjectionMatrix(); // Memperbarui matriks proyeksi kamera setelah mengubah properti

    }, [camera]);



    useEffect(() => {
        if (update) {
            setPos(update)
        }
    }, [update]);

    return null
    // (
    //     <>
    //         {process.env.NODE_ENV === 'development' && pos &&
    //             <Html
    //                 type="div"
    //                 style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
    //                 center

    //             >
    //                 <div style={{ position: "fixed", top: 10, right: 20, textAlign: "right" }}>
    //                     <h1>Camera</h1>
    //                     <p>position: {camera.position.toArray().join(', ')}</p>
    //                     <p>rotation: {camera.rotation.toArray().join(', ')}</p>
    //                 </div>
    //             </Html >

    //         }
    //     </>

    // )
}



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
                ...sectionData.default.lookAt.pos,
                ...sectionData.default.lookAt.target,

            )
            setInitialScene(true)
        }
    }, [cameraControlsRef.current, initialScene]);



    return (
        <Suspense>
            {camera &&
                <>
                    <Leva active={false} />
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

