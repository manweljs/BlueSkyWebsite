import React, { Suspense } from 'react'
import { TrainGate } from './TrainGate'

export default function BuildingCollection() {
    return (
        <Suspense>
            <TrainGate />
        </Suspense>
    )
}
