"use client";
import React, { useState } from 'react'
import style from "@/styles/style.module.sass"
import { Button } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { useUserContext } from '@/hooks/UserContext';


export default function ControlGuide() {
    const [showGuide, setShowGuide] = useState(true)
    const { startExperience } = useUserContext();
    return (
        <AnimatePresence mode='wait'>
            {showGuide &&
                <motion.div
                    className={style.control_guide}
                    initial={{ y: 500, opacity: 0 }}
                    animate={{
                        y: startExperience ? 0 : 500,
                        opacity: 1,
                        transition: { duration: 0.75, type: "spring", delay: 2 }
                    }}
                    exit={{ y: 500, opacity: 0, transition: { duration: 0.5, type: "spring" } }}
                >
                    <div className={style.controls}>
                        {contents.controls.map((control, index) => (
                            <div key={index} className={style.control}>
                                <div className={style.icon_box}>
                                    {control.icon}
                                </div>
                                <p>{control.title}</p>
                            </div>
                        ))}
                    </div>
                    <Button type="primary" shape="round" style={{ width: "100%" }}
                        onClick={() => setShowGuide(false)}
                    >Got it!</Button>

                </motion.div>
            }
        </AnimatePresence>
    )
}

const contents = {
    title: "Control Guide",
    controls: [
        {
            title: "Left click and drag to rotate",
            icon: <img src="/icons/left_click.svg" alt="" />
        },
        {
            title: "Scroll to zoom in and out",
            icon: <img src="/icons/scroll.svg" alt="" />
        },
        {
            title: "Right click and drag to move",
            icon: <img src="/icons/right_click.svg" alt="" />
        },

    ]
}
