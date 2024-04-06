/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/car/Bus.glb 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Bus.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Bus004" position={[-8.313, 0.827, -9.488]}>
          <mesh name="Plane124" geometry={nodes.Plane124.geometry} material={materials.Primary} />
          <mesh name="Plane124_1" geometry={nodes.Plane124_1.geometry} material={materials.Base} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Bus.glb')
