import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';

const size = .1;
const count = 100;
const moveSpeed = 0.5;

const Smoke = ({ position }: { position: THREE.Vector3 }) => {
    const { size: canvasSize, viewport, camera } = useThree();
    const meshRef = useRef(null);
    const [pos, setPos] = useState(position);


    useEffect(() => {
        setPos(position);

    }, [position]);


    const [positions, velocities] = useMemo(() => {
        const positions = [];
        const velocities = [];

        for (let i = 0; i < count; i++) {
            positions.push(pos.clone());
            velocities.push(new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() * 0.02) + 0.01,
                (Math.random() - 0.5) * 0.02
            ));
        }

        return [positions, velocities];
    }, [count, pos]);

    useFrame(() => {
        if (meshRef.current) {
            const dummy = new THREE.Object3D();
            for (let i = 0; i < count; i++) {
                positions[i].add(velocities[i]);
                if (positions[i].y > 5 || positions[i].y < -5) {
                    positions[i].copy(pos);
                }

                dummy.position.copy(positions[i]);
                dummy.updateMatrix();
                meshRef.current.setMatrixAt(i, dummy.matrix);
            }
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <primitive attach="geometry" object={new THREE.BoxGeometry(size, size, size)} />
            <meshBasicMaterial attach="material" color="orange" />
        </instancedMesh>

    );
};

export default Smoke;
