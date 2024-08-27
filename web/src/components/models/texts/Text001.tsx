/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/texts/Text001.glb -o src/components/models/texts/Text001.tsx -s -k -r public/ 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useHelper } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { materials } from '@/consts/materials'
import { useUserContext } from '@/hooks/UserContext'
import { useControls } from 'leva'

type GLTFResult = GLTF & {
  nodes: {
    TextBlueSkyCreation: THREE.Mesh
    textlamp: THREE.Mesh
    textlamp001: THREE.Mesh
  }
  materials: {
    Base: THREE.MeshStandardMaterial
  }
}

type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

const lightColor = "#0084ff";
const lightIntensity = 2;

export function Text001(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/models/texts/Text001.glb') as GLTFResult
  const { isNight } = useUserContext()
  const spotlightRef = useRef(null);

  const { quality } = useUserContext();


  // useHelper(spotlightRef, THREE.SpotLightHelper);

  // const { posX, posY, posZ, targetX, targetY, targetZ, distance } = useControls('Text Spotlight', {
  //   posX: { value: -35, min: -100, max: 100 },
  //   posY: { value: 0, min: 0, max: 100 },
  //   posZ: { value: -24.879, min: -100, max: 100 },

  //   targetX: { value: -100, min: -100, max: 100 },
  //   targetY: { value: 8, min: 0, max: 100 },
  //   targetZ: { value: -40, min: -100, max: 100 },
  //   distance: { value: 50, min: 0, max: 100 }

  // }, { collapsed: true });


  useEffect(() => {
    if (spotlightRef.current) {
      spotlightRef.current.target.position.set(-100, 8, -40);
      spotlightRef.current.target.updateMatrixWorld();

    }
  }, [spotlightRef.current]);
  return (
    <group {...props} dispose={null}>
      <mesh name="TextBlueSkyCreation" castShadow geometry={nodes.TextBlueSkyCreation.geometry} material={materials.Base} position={[-64.903, 9.534, -32.665]} />

      <spotLight
        ref={spotlightRef}
        position={[-35, 0, -25]}
        intensity={isNight ? lightIntensity : 0}
        angle={Math.PI / 2.8}
        penumbra={0.5}
        decay={0}
        distance={50}
        color={lightColor}
        castShadow={quality > 1}

      />
    </group>
  )
}

useGLTF.preload('/models/texts/Text001.glb')
