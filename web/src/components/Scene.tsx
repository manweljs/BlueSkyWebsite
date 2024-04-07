"use client";
import { Environment, Text3D, OrbitControls, PerspectiveCamera, Plane, SpotLight, Stars, OrthographicCamera, ContactShadows, RoundedBox, Sky } from "@react-three/drei";
import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { BlueSky } from "@/components/models/BlueSky";
import { BlueSkyStatue } from "@/components/models/BlueSkyStatue";
import { Island } from "./models/floors/Island";
import VehicleCollection from "./models/vehicles/VehicleCollection";
import BuildingCollection from "./models/buildings/BuildingCollection";
import { Text001 } from "./models/texts/Text001";




const baseColor = "#7dc0ff"
const primaryColor = "#0062ff"

function CameraController() {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(75, 10, 30); // Mengatur posisi kamera
        camera.updateProjectionMatrix(); // Memperbarui matriks proyeksi kamera setelah mengubah properti
    }, [camera]);

    return null;
}

export default function Scene() {
    return (
        <Suspense >
            <Canvas shadows className="main-canvas">
                <CameraController />
                <OrbitControls maxPolarAngle={1.2} maxDistance={120} maxZoom={5} />
                <PerspectiveCamera makeDefault position={[-5, 30, 45]} fov={45} />

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
                <Island />
                <VehicleCollection />
                <BuildingCollection />
                <BaseEnvirontment />

                <fog attach="fog" args={["#9fc8e1", 130, 210]} />
                {/* Warna, jarak awal, jarak akhir */}
            </Canvas>
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