/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/vehicles/SpeedBoat.glb -o src/components/models/vehicles/SpeedBoat.tsx -r public/ 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import Smoke from '../Smoke'

type GLTFResult = GLTF & {
  nodes: {
    Plane158: THREE.Mesh
    Plane158_1: THREE.Mesh
    Icosphere006: THREE.Mesh
  }
  materials: {
    Base: THREE.MeshStandardMaterial
    Primary: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'Action' | 'Action.001'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function SpeedBoat(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/vehicles/SpeedBoat.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['Action.001']?.play()
    actions['Action']?.play()

  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="BoatTravel001">

        <group name="SpeedBoat" position={[11.721, -0.749, 69.166]} rotation={[0, 1.44, 0]}>
          <mesh name="Plane158" geometry={nodes.Plane158.geometry} material={materials.Base} />
          <mesh name="Plane158_1" geometry={nodes.Plane158_1.geometry} material={materials.Primary} />
          <mesh name="Icosphere006" geometry={nodes.Icosphere006.geometry} material={nodes.Icosphere006.material} position={[2.123, -0.414, -0.068]} scale={0.113} />
        </group>
      </group>
      {/* <Smoke position={} /> */}
    </group>
  )
}

useGLTF.preload('/models/vehicles/SpeedBoat.glb')