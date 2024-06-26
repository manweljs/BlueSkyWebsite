import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd'
import { useUserContext } from '@/context/UserContext'
import style from "@/styles/style.module.sass"
import { sectionData } from '@/consts'
import SectionBody from './SectionBody'

export default function Sections() {
    const { activeSection, setActiveSection, cameraControlsRef } = useUserContext()
    const [showDrawer, setShowDrawer] = useState(false);

    const handleClose = () => {
        setActiveSection(0)
    }

    useEffect(() => {
        if (!cameraControlsRef.current) return;
        cameraControlsRef.current.setLookAt(
            ...sectionData[activeSection].lookAt.pos,
            ...sectionData[activeSection].lookAt.target,
            true
        )
    }, [cameraControlsRef, activeSection]);

    useEffect(() => {
        if (activeSection > 0) {
            const timer = setTimeout(() => {
                setShowDrawer(true);
            }, 400);

            return () => clearTimeout(timer);
        }
        setShowDrawer(false);
    }, [activeSection]);



    return (
        <>
            <div className={style.drawer}>
                <Drawer open={showDrawer} onClose={handleClose} width={800} >
                    {activeSection > 0 &&
                        <SectionBody contents={sectionData[activeSection].contents} />
                    }
                </Drawer>
            </div>
        </>
    )
}

