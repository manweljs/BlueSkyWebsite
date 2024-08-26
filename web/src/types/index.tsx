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
        name: string
        position: PositionType
    },
    contents?: ContentType
}

export interface ContentType {
    title: string
    videoId: string
    paragraph: string[]
}

export type Quality = 0 | 1 | 2

export type UserPreference = "performance" | "auto" | "quality" | undefined