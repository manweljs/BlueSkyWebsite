import { Html } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import * as THREE from 'three'

export default function Marker(props: {
    children: React.ReactNode
    position: THREE.Vector3
    scale: number
    onClick?: () => void
}) {
    const { children, onClick } = props;
    const ref = useRef(null)
    const [isOccluded, setOccluded] = useState<boolean>(false)
    const [isInRange, setInRange] = useState<boolean>(true)
    const isVisible = isInRange && !isOccluded


    return (
        <group ref={ref} {...props} >
            <Html
                as='div' // Wrapping element (default: 'div')
                transform // If true, applies matrix3d transformations (default=false)
                sprite // Renders as sprite, but only in transform mode (default=false)
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            >
                {children}
            </Html>
        </group>
    )
}
