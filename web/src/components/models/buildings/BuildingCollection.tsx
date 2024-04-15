import React from 'react'
import { Office } from './Office'
import { Stores } from './Stores'
import { Houses } from './Houses'
import { MainBuildings } from './MainBuildings'

export default function BuildingCollection() {
    return (
        <>
            <Office />
            <Stores />
            <Houses />
            <MainBuildings />
        </>
    )
}
