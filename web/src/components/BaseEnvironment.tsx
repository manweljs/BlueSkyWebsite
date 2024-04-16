import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUserContext } from '@/context/UserContext';
import { Stars } from '@react-three/drei';
import { isMobile } from 'react-device-detect';

const daySky = "#a4cfff";
const dayLight = "#b4d2ff";
const nightSky = "#000b49";
const nightLight = "#6170a1";
const directionalLightIntensity = 0.75;
const ambientLightIntensity = 2;

const BaseEnvironment = () => {
    const { isNight, quality } = useUserContext();

    const speed = isNight ? 0.1 : 0.05;
    const skyRef = useRef(null);
    const ambientLightRef = useRef(null);
    const directionalLightRef = useRef(null);

    const skyColorRef = useRef(new THREE.Color(daySky)); // Ref untuk menyimpan warna langit
    const ambientLightColorRef = useRef(new THREE.Color(dayLight)); // Ref untuk warna ambientLight
    const directionalLightColorRef = useRef(new THREE.Color(dayLight)); // Ref untuk warna directionalLight
    const fogColorRef = useRef(new THREE.Color(daySky)); // Ref untuk warna fog
    const targetZPosition = isNight ? -50 : 50;
    const { scene } = useThree();

    // Atur warna awal berdasarkan waktu (siang atau malam)

    useEffect(() => {
        const newSkyColor = isNight ? nightSky : daySky;
        const newLightColor = isNight ? nightLight : dayLight;

        skyColorRef.current.set(newSkyColor);
        ambientLightColorRef.current.set(newLightColor);
        directionalLightColorRef.current.set(newLightColor);

        if (!isMobile) {
            fogColorRef.current.set(newSkyColor);
            scene.fog = new THREE.Fog(fogColorRef.current, 120, 200); // Inisialisasi fog
            scene.background = new THREE.Color(newSkyColor); // Update background color directly

        }

        if (quality < 1) {
            scene.fog = null;
        }

        // Set the colors directly without interpolation for mobile
        if (isMobile) {
            if (skyRef.current) {
                skyRef.current.material.color.set(newSkyColor);
            }
            if (ambientLightRef.current) {
                ambientLightRef.current.color.set(newLightColor);
            }
            if (directionalLightRef.current) {
                directionalLightRef.current.color.set(newLightColor);
                directionalLightRef.current.position.set(15, 65, targetZPosition);
            }
        }
    }, [isNight, scene, isMobile, quality]);



    useFrame(() => {
        if (!isMobile) {
            if (skyRef.current) {
                skyRef.current.material.color.lerp(skyColorRef.current, speed); // Animasi warna langit
            }
            if (ambientLightRef.current) {
                ambientLightRef.current.color.lerp(ambientLightColorRef.current, speed);
            }
            if (directionalLightRef.current) {
                directionalLightRef.current.color.lerp(directionalLightColorRef.current, speed);
                directionalLightRef.current.position.lerp(new THREE.Vector3(15, 65, targetZPosition), 0.05);
            }
            if (scene.fog) {
                scene.fog.color.lerp(fogColorRef.current, speed);
            }
            scene.background = skyColorRef.current; // Mengatur background scene secara manual
        }
    });

    return (
        <>
            {isNight && <Stars radius={200} depth={30} count={(quality + 1) * 250} factor={4} fade />}
            <ambientLight
                ref={ambientLightRef}
                color={ambientLightColorRef.current}
                intensity={ambientLightIntensity}
            />
            <directionalLight
                ref={directionalLightRef}
                castShadow={quality >= 1}
                position={[15, 65, 50]}
                intensity={directionalLightIntensity}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={500}
                shadow-camera-left={-130}
                shadow-camera-right={130}
                shadow-camera-top={130}
                shadow-camera-bottom={-130}
                color={directionalLightColorRef.current}
            />

            {/* <mesh ref={skyRef}>
                <sphereGeometry args={[800, 800, 800]} />
                <meshBasicMaterial attach="material" color={skyColorRef.current} side={THREE.BackSide} />
            </mesh> */}
        </>
    );
};

export default BaseEnvironment;
