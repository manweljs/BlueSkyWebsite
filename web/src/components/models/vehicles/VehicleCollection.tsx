import React from 'react'
import { Bus } from './Bus'
import { Train } from './Train'
import { AirPlaneBoarding } from './AirPlaneBoarding'
import { AirPlaneTakeOff } from './AirPlaneTakeOff'

export default function VehicleCollection() {
    return (
        <group>
            <Bus />
            <Train />
            <AirPlaneBoarding />
            <AirPlaneTakeOff />
        </group>
    )
}
