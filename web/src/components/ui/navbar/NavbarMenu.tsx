import React, { useState } from 'react'
import s from "./Navbar.module.sass"
import { motion } from 'framer-motion'
import { useUserContext } from '@/hooks/UserContext'
import { cls } from '@/utils'
import Motion from '../Motion'
import { sectionData } from '@/components/sections/Sections'

export default function NavbarMenu() {
    const { openNav } = useUserContext()
    return (
        <div className={cls(s.navbar_menu, openNav && s.open)}>
            {openNav && <Menu />}
        </div>
    )
}

const Menu = () => {
    const { setActiveSection, setOpenNav } = useUserContext()
    return (
        <div className={s.menu}>
            <ul>
                {sectionData.map((item, index) => {
                    if (item.index === 0) return
                    return (
                        <Motion.Slide
                            type='li'
                            direction='up'
                            key={index}
                            delay={index * 0.3}
                        >
                            <div onClick={() => {
                                setOpenNav(false)
                                setActiveSection(item.index)
                            }}>
                                {item.title}
                            </div>
                        </Motion.Slide>
                    )

                })}
            </ul>
        </div>
    )
}

