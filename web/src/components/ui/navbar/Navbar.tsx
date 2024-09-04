import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/hooks/UserContext'
import NavbarMenu from './NavbarMenu'
import s from "./Navbar.module.sass"
import { cls } from '@/utils'
import { usePathname } from 'next/navigation'


export default function Navbar() {
    const { quality, isNight, openNav, navigate } = useUserContext()
    const q = quality === 2 ? "High" : quality === 1 ? "Medium" : "Low"

    const path = usePathname()

    const logoUrl = isNight ? "/img/bluesky-logo-white.svg" : "/img/bluesky-logo.svg"

    return (
        <React.Fragment>

            <NavbarMenu />
            <div className={s.navbar}
            >
                <a className={s.logo} href='/'>
                    <img src={logoUrl} alt="logo" />
                </a>
                {path === "/" &&
                    <Hamburger />
                }


            </div>
        </React.Fragment>
    )
}


const Hamburger = () => {
    const { openNav, setOpenNav } = useUserContext()

    return (
        <div className={cls(s.hamburger, openNav && s.open)}
            onClick={() => setOpenNav(prev => !prev)}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}
