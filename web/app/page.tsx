"use client";
import { Environment, Lightformer, MeshReflectorMaterial, OrbitControls, PerspectiveCamera, Plane, SpotLight, Stars } from "@react-three/drei";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import style from "../styles/style.module.sass"
import { degreeToRadian } from "utils";
import * as THREE from "three";

export default function Page() {
  return (
    <div className={style.home}>
      <Canvas shadows>
        {/* <ambientLight /> */}
        <OrbitControls />
        <PerspectiveCamera makeDefault fov={100} position={[6, 2, 6]} />

        {/* <directionalLight color={"white"} position={[2, 2, 2]} intensity={.7} /> */}
        <SpotLight
          position={[0, 15, 0]}
          distance={20}
          angle={0.5}
          attenuation={1}
          penumbra={1}
          decay={.1}
          intensity={.5}
          color={"#ffffff"}
        />

        <Cube position={[0, 5, 0]} />

        <BasePlane />

        <Environment background  >
          <mesh>
            <sphereGeometry args={[50, 100, 100]} />
            <meshBasicMaterial color={"#55bffc"} side={THREE.BackSide} />
          </mesh>
        </Environment>

      </Canvas>
    </div>
  )
}

const Cube = ({ position }: { position: Vector3 }) => {
  const ref = useRef(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += 0.02
    ref.current.rotation.y += 0.02
    ref.current.rotation.z += 0.02
    const floorHeight = 3;
    const amplitude = 1;
    ref.current.position.y = Math.sin(Date.now() * 0.001) * amplitude + floorHeight;
  })

  return (
    <mesh ref={ref} position={position} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#0062ff"} />
    </mesh>
  )
}

const BasePlane = () => {
  return (
    <mesh rotation={[degreeToRadian(-90), 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial color={"#70cbff"} />
    </mesh>
  )
}

const BaseEnvirontment = () => {
  return (
    <Environment background>
      <mesh>
        <sphereGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"#55bffc"} />
      </mesh>
    </Environment>
  )
}