import React from 'react'
import { WindMils } from './WindMils'
import { Bus } from './Bus'
import { CarBox } from './CarBox'
import { Train } from './Train'
import { AirPlaneBoarding } from './AirPlaneBoarding'
import { AirPlaneTakeOff } from './AirPlaneTakeOff'
import { SpeedBoat } from './SpeedBoat'
import { Bus002 } from './Bus002'
import { TruckContainer } from './TruckContainer'

export default function AnimatedObjects() {
    return (
        <>
            <WindMils />
            <Bus />
            <Bus002 />
            <TruckContainer />
            <CarBox />
            <Train />
            <AirPlaneBoarding />
            <AirPlaneTakeOff />
            <SpeedBoat />
        </>
    )
}
