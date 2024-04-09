import React from 'react'
import { Bus } from './Bus'
import { Train } from './Train'
import { AirPlaneBoarding } from './AirPlaneBoarding'
import { AirPlaneTakeOff } from './AirPlaneTakeOff'
import { CarBox } from './CarBox'
import { SpeedBoat } from './SpeedBoat'

export default function VehicleCollection() {
    return (
        <group>
            <Bus />
            <CarBox />
            <Train />
            <AirPlaneBoarding />
            <AirPlaneTakeOff />
            <SpeedBoat />
        </group>
    )
}
