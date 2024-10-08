/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/vehicles/AirPlaneTakeOff.glb -o src/components/models/vehicles/AirPlaneTakeOff.tsx -r public/ 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useUserContext } from '@/hooks/UserContext'
import { materials } from '@/consts/materials'

type GLTFResult = GLTF & {
  nodes: {
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
  }
  materials: {
    Base: THREE.MeshStandardMaterial
    Primary: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'AirPlaneBoarding' | 'AirPlaneTakeOff'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function AirPlaneTakeOff(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, animations } = useGLTF('/models/animatedObjects/AirPlaneTakeOff.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)
  const { quality } = useUserContext()

  useEffect(() => {
    if (quality > 1) {
      actions['AirPlaneTakeOff'].play()
      return () => {
        actions['AirPlaneTakeOff'].stop()
      }
    }
  }, [quality]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {quality > 1 &&
          <group name="airplane" position={[158.768, 30.858, -111]} rotation={[-2.725, -1.271, 3.05]}>
            <mesh name="Cube003" geometry={nodes.Cube003.geometry} material={materials.Base} castShadow />
            <mesh name="Cube003_1" geometry={nodes.Cube003_1.geometry} material={materials.Primary} castShadow />
          </group>
        }
      </group>
    </group>
  )
}

useGLTF.preload('/models/animatedObjects/AirPlaneTakeOff.glb')
