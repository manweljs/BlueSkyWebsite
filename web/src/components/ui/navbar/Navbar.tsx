import React from 'react'
import style from "@/styles/style.module.sass"
import { useUserContext } from '@/context/UserContext'


export default function Navbar() {
    const { quality, isNight } = useUserContext()
    const q = quality === 2 ? "High" : quality === 1 ? "Medium" : "Low"
    return (
        <div className={style.navbar}
        >
            <div className={style.logo}>
                <img src={isNight ? "/img/bluesky-logo-white.svg" : "/img/bluesky-logo.svg"} alt="logo" />
            </div>
            <div className={style.quality_info} style={{ color: isNight ? "white" : "black" }}>
                <p>{q} Mode</p>
            </div>

        </div>
    )
}
