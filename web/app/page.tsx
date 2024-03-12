"use client";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import style from "../styles/style.module.sass"

export default function Page() {

  return (
    <div className={style.home}>
      <Canvas>
        <ambientLight />
        <pointLight position={[20, 30, 50]} intensity={5} decay={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={.2} decay={0.2} />
        <OrbitControls />
        <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
        <Stars />
        <Cube />
      </Canvas>
    </div>
  )
}

const Cube = () => {
  const ref = useRef(null)

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial color={"#0062ff"} />
    </mesh>
  )
}