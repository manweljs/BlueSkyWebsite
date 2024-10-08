import { ICON_SIZE, PRIMARY_COLOR } from '@/consts'
import { PositionType, SectionType } from '@/types'
import React, { useRef, useState } from 'react'
// import { Tooltip } from 'antd'
import Image from 'next/image'
import { useUserContext } from '@/hooks/UserContext'
import s from './Ui.module.sass'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { sectionData } from '@/components/sections/Sections'
import { Tooltip } from 'antd'
import { font } from '@/Wrapper'
import { cls } from '@/utils'
import { FIcon } from './FIcon'


export default function Markers() {
    const { setActiveSection, activeSection, openNav } = useUserContext()
    return (
        <>
            {Object.keys(sectionData).map((key: string, index: number) => {
                if (index === 0) return
                const section = sectionData[index] as SectionType

                const opacity = openNav ? 0 : (activeSection > 0 && activeSection !== index) ? 0 : 1

                return (

                    <Marker
                        key={index}
                        position={section.icon.position}
                        onClick={() => setActiveSection(index)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: opacity }}
                            transition={{ duration: 0.3 }}
                        >
                            <Tooltip
                                title={section.title}
                                color={PRIMARY_COLOR}
                                arrow={false}
                                overlayClassName={cls(s.marker_tooltip, font.className)}
                            >
                                <div className={s.marker_icon}
                                    onClick={() => setActiveSection(index)}
                                >
                                    {/* <Image
                                        src={section.icon.url}
                                        width={ICON_SIZE}
                                        height={ICON_SIZE}
                                        onClick={() => setActiveSection(index)}
                                        alt={key}
                                    /> */}
                                    <FIcon
                                        name={section.icon.name}
                                        size={110}
                                        pointer
                                    />
                                </div>
                            </Tooltip>
                        </motion.div>

                    </Marker>
                )
            })}

        </>
    )
}

export const Marker = (props: {
    children: React.ReactNode
    position?: PositionType
    rotation?: THREE.Euler | [number, number, number]
    scale?: number
    onClick?: () => void
}) => {
    const { children, onClick } = props;
    const ref = useRef(null)
    const [isOccluded, setOccluded] = useState<boolean>(false)
    const [isInRange, setInRange] = useState<boolean>(true)
    const isVisible = isInRange && !isOccluded


    return (
        <group ref={ref} {...props} >
            <Html
                as='div' // Wrapping element (default: 'div')
                transform // If true, applies matrix3d transformations (default=false)
                sprite // Renders as sprite, but only in transform mode (default=false)
                onClick={onClick}
                style={{ cursor: 'pointer' }}
                distanceFactor={10} // If set, will multiply the scale factor by this amount (default=0)
                zIndexRange={[100, 0]}

            >
                {children}
            </Html>
        </group>
    )
}