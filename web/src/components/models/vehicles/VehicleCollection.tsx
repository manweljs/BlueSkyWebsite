import React from 'react'
import { Bus } from './Bus'
import { Train } from './Train'

export default function VehicleCollection() {
    return (
        <group>
            <Bus />
            <Train />
        </group>
    )
}
