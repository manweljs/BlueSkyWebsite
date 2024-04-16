import React from 'react'
import { Bus } from './Bus'
import { Train } from './Train'
import { AirPlaneBoarding } from './AirPlaneBoarding'
import { AirPlaneTakeOff } from './AirPlaneTakeOff'
import { CarBox } from './CarBox'
import { SpeedBoat } from './SpeedBoat'
import { useUserContext } from '@/context/UserContext'

export default function VehicleCollection() {
    const { quality } = useUserContext();
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
