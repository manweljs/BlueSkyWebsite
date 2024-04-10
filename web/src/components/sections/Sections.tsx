import React, { useEffect, useState } from 'react'
import Collaboration from './Collaboration'
import { Drawer } from 'antd'
import { useUserContext } from '@/context/UserContext'
import style from "@/style.module.sass"
import { SECTION, sectionData } from '@/consts'

export default function Sections() {
    const { activeSection, setActiveSection, cameraControlsRef } = useUserContext()
    const [showDrawer, setShowDrawer] = useState(false);

    const handleClose = () => {
        setActiveSection(null)
    }

    useEffect(() => {
        if (!cameraControlsRef.current) return;

        switch (activeSection) {
            case SECTION.COLLABORATION:
                cameraControlsRef.current.setLookAt(
                    ...sectionData.collaboration.lookAt.pos,
                    ...sectionData.collaboration.lookAt.target,
                    true
                )
                break;
            default:
                cameraControlsRef.current.setLookAt(
                    ...sectionData.default.lookAt.pos,
                    ...sectionData.default.lookAt.target,
                    true
                )
                break;
        }

    }, [cameraControlsRef, activeSection]);

    useEffect(() => {
        if (activeSection !== null) {
            const timer = setTimeout(() => {
                setShowDrawer(true);
            }, 400);

            return () => clearTimeout(timer);
        }
        setShowDrawer(false);
    }, [activeSection]);

    return (
        <div className={style.drawer}>
            <Drawer open={showDrawer} onClose={handleClose} width={800} >
                <Collaboration />
            </Drawer>
        </div>
    )
}
