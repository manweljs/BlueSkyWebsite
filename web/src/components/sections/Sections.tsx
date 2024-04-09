import React, { useState } from 'react'
import Collaboration from './Collaboration'
import { Drawer } from 'antd'
import { useUserContext } from '@/context/UserContext'
import style from "@/style.module.sass"

export default function Sections() {
    const { activeSection, setActiveSection } = useUserContext()

    const handleClose = () => {
        setActiveSection(null)
    }

    return (
        <div className={style.drawer}>
            <Drawer open={activeSection !== null} onClose={handleClose} width={800} >
                <Collaboration />
            </Drawer>
        </div>
    )
}
