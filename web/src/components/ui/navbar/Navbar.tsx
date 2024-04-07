import React from 'react'
import style from "./style.module.sass"


export default function Navbar() {
    return (
        <div className={style.navbar}
        >
            <div className={style.logo}>
                <img src="/img/bluesky-logo.png" alt="logo" />
            </div>


        </div>
    )
}
