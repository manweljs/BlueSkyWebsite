/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/windmils/Windmils.glb -o src/components/models/windmils/Windmils.tsx -r public/ -s 
*/

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    WindMill: THREE.Mesh
    WindMillTurbin001: THREE.Mesh
    WindMill001: THREE.Mesh
    WindMillTurbin002: THREE.Mesh
    WindMill002: THREE.Mesh
    WindMillTurbin003: THREE.Mesh
    WindMill003: THREE.Mesh
    WindMillTurbin004: THREE.Mesh
    WindMill004: THREE.Mesh
    WindMillTurbin005: THREE.Mesh
    WindMill005: THREE.Mesh
    WindMillTurbin006: THREE.Mesh
    WindMill006: THREE.Mesh
    WindMillTurbin007: THREE.Mesh
    WindMill007: THREE.Mesh
    WindMillTurbin008: THREE.Mesh
    WindMill008: THREE.Mesh
    WindMillTurbin009: THREE.Mesh
  }
  materials: {
    Base: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type ActionName = 'WindMilTurbin.002' | 'WindMilTurbin.003' | 'WindMilTurbin.004' | 'WindMilTurbin.005' | 'WindMilTurbin.006' | 'WindMilTurbin.007' | 'WindMilTurbin.008' | 'WindMilTurbin.009' | 'WindMilTurbin.010'
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}
type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>>

export function WindMils(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials, animations } = useGLTF('/models/windmils/Windmils.glb') as GLTFResult
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    // Menyimpan semua timeout IDs untuk dibersihkan nanti
    const timeouts = [];

    // Fungsi helper untuk menjadwalkan animasi dengan delay
    const scheduleAnimation = (actionName: string) => {
      const delay = Math.floor(Math.random() * 800);
      const timeoutId = setTimeout(() => {
        actions[actionName]?.play();
      }, delay);
      timeouts.push(timeoutId);
    };

    // Jadwalkan animasi dengan delay yang berbeda
    scheduleAnimation('WindMilTurbin.002'); // No delay for the first one
    scheduleAnimation('WindMilTurbin.003'); // Delay 100ms
    scheduleAnimation('WindMilTurbin.004');
    scheduleAnimation('WindMilTurbin.005');
    scheduleAnimation('WindMilTurbin.006');
    scheduleAnimation('WindMilTurbin.007');
    scheduleAnimation('WindMilTurbin.008');
    scheduleAnimation('WindMilTurbin.009');
    scheduleAnimation('WindMilTurbin.010');

    // Bersihkan timeout saat komponen di-unmount
    return () => {
      timeouts.forEach(clearTimeout);
      Object.values(actions).forEach(action => action.stop());
    };
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="WindMill" castShadow geometry={nodes.WindMill.geometry} material={materials.Base} position={[-47.844, 4.406, 56.283]} rotation={[-3.14, 0.558, -3.132]} scale={1.363}>
          <mesh name="WindMillTurbin001" castShadow geometry={nodes.WindMillTurbin001.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill001" castShadow geometry={nodes.WindMill001.geometry} material={materials.Base} position={[-45.973, 2.192, 58.52]} rotation={[-3.14, 0.602, -3.132]} scale={1.363}>
          <mesh name="WindMillTurbin002" castShadow geometry={nodes.WindMillTurbin002.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill002" castShadow geometry={nodes.WindMill002.geometry} material={materials.Base} position={[-46.4, 4.524, 53.63]} rotation={[3.139, 0.873, -3.129]} scale={1.363}>
          <mesh name="WindMillTurbin003" castShadow geometry={nodes.WindMillTurbin003.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill003" castShadow geometry={nodes.WindMill003.geometry} material={materials.Base} position={[-75.421, 15.103, 16.252]} rotation={[3.129, 1.179, -3.121]} scale={1.363}>
          <mesh name="WindMillTurbin004" castShadow geometry={nodes.WindMillTurbin004.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill004" castShadow geometry={nodes.WindMill004.geometry} material={materials.Base} position={[-76.388, 15.46, 22.595]} rotation={[3.14, 0.807, -3.13]} scale={1.363}>
          <mesh name="WindMillTurbin005" castShadow geometry={nodes.WindMillTurbin005.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill005" castShadow geometry={nodes.WindMill005.geometry} material={materials.Base} position={[-76.646, 15.485, 19.328]} rotation={[3.14, 0.807, -3.13]} scale={1.363}>
          <mesh name="WindMillTurbin006" castShadow geometry={nodes.WindMillTurbin006.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill006" castShadow geometry={nodes.WindMill006.geometry} material={materials.Base} position={[39.128, 1.164, -83.122]} rotation={[3.14, 0.807, -3.13]} scale={1.363}>
          <mesh name="WindMillTurbin007" castShadow geometry={nodes.WindMillTurbin007.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill007" castShadow geometry={nodes.WindMill007.geometry} material={materials.Base} position={[39.534, 1.123, -77.55]} rotation={[3.14, 0.807, -3.13]} scale={1.363}>
          <mesh name="WindMillTurbin008" castShadow geometry={nodes.WindMillTurbin008.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
        <mesh name="WindMill008" castShadow geometry={nodes.WindMill008.geometry} material={materials.Base} position={[45.593, 2.932, -77.551]} rotation={[3.14, 0.807, -3.13]} scale={1.363}>
          <mesh name="WindMillTurbin009" castShadow geometry={nodes.WindMillTurbin009.geometry} material={materials.Base} position={[0.001, 2.724, 0.342]} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/windmils/Windmils.glb')
