import React from 'react'
import { Office } from './Office'
import { Stores } from './Stores'
import { Houses } from './Houses'
import { MainBuildings } from './MainBuildings'
import { useUserContext } from '@/context/UserContext'
import { BlueSkyStatue } from './BlueSkyStatue'

export default function BuildingCollection() {

    const { quality } = useUserContext()
    const castShadow = (quality >= 1) ? true : false

    return (
        <>
            <Office castShadow={castShadow} />
            <Stores castShadow={castShadow} />
            <Houses castShadow={castShadow} />
            <MainBuildings castShadow={castShadow} />
            <BlueSkyStatue />
        </>
    )
}
