import * as THREE from 'three'

export type PositionType = [number, number, number] | THREE.Vector3

export interface SectionType {
    index: number
    id: string
    title: string
    lookAt: {
        pos: PositionType
        target: PositionType
    },
    icon: {
        url: string
        position: PositionType
    },
    contents?: {
        title: string
        paragraph: string[]
    }
}