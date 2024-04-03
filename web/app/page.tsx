"use client";
import { Environment, Text3D, OrbitControls, PerspectiveCamera, Plane, SpotLight, Stars, OrthographicCamera, ContactShadows, RoundedBox } from "@react-three/drei";
import { Canvas, Vector3, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import style from "../styles/style.module.sass"
import { degreeToRadian } from "utils";
import * as THREE from "three";
import { Car } from "../src/components/models/Car";
import { Husky } from "@/components/models/Husky";
import { Physics, RigidBody } from "@react-three/rapier";
import { TransformControls } from "three-stdlib";
import { Island } from "@/components/models/Island";
import { BlueSky } from "@/components/models/BlueSky";

const baseColor = "#8dc2ff"
const primaryColor = "#0062ff"

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(75, 10, 30); // Mengatur posisi kamera
    camera.updateProjectionMatrix(); // Memperbarui matriks proyeksi kamera setelah mengubah properti
  }, [camera]);

  return null;
}


export default function Page() {
  return (
    <div className={style.home}>
      <Suspense>
        <Canvas shadows>
          <CameraController />
          <OrbitControls maxPolarAngle={1.2} />
          <PerspectiveCamera makeDefault position={[-5, 30, 45]} fov={45} />

          <directionalLight

            castShadow
            position={[5, 15, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.2}
            shadow-camera-far={500}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
          />

          {/* <directionalLight
            castShadow
            position={[0, 10, 0]}
            intensity={2}
            shadow-mapSize={[1024, 1024]}
            color={"#bcdbff"}
          /> */}

          {/* <spotLight
            position={[0, 10, 0]}
            intensity={300}
            angle={180}
            penumbra={1}
            castShadow
            color={"#bcdbff"} /> */}

          <BlueSky />


          {/* <Car scale={6} position={[0, 8, 0]} /> */}
          {/* <Physics gravity={[0, -5, 0]} colliders="hull"  >

            <RigidBody colliders={"hull"} >
              <Husky scale={.5} />
            </RigidBody>


            <RigidBody type="fixed"  >
              <Island scale={1} position={[-2, -1, 6]} rotation={[0, .9, 0]} />
            </RigidBody>



          </Physics> */}

          <BaseEnvirontment />
        </Canvas>
      </Suspense>
    </div>
  )
}

const BasePlane = () => {
  return (
    <mesh rotation={[-degreeToRadian(90), 0, 0]} receiveShadow >
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
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