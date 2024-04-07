/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/vehicles/CarBox.glb -o src/components/models/vehicles/CarBox.tsx -r public/ 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh980636007008: THREE.Mesh
    mesh980636007008_1: THREE.Mesh
  }
  materials: {
    Base: THREE.MeshStandardMaterial
    Primary: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'CarBoxTravel001'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function CarBox(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/vehicles/CarBox.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    actions['CarBoxTravel001'].play()
    return () => {
      actions['CarBoxTravel001'].stop()
    }
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CarBox" position={[14.921, 0.617, -44.757]} rotation={[0, -1.554, 0]}>
          <mesh name="mesh980636007008" geometry={nodes.mesh980636007008.geometry} material={materials.Base} />
          <mesh name="mesh980636007008_1" geometry={nodes.mesh980636007008_1.geometry} material={materials.Primary} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/vehicles/CarBox.glb')