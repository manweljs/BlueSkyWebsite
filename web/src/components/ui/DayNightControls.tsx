import React from 'react'
import { useUserContext } from '@/context/UserContext'
import { FloatButton } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import style from '@/styles/style.module.sass'
import { isMobile } from 'react-device-detect'

export default function DayNightControls() {
    const { isNight, setIsNight, streetLightLoaded } = useUserContext()
    return (
        <>
            {streetLightLoaded && !isMobile &&
                <FloatButton
                    onClick={() => setIsNight(!isNight)}
                    className={style.button_night}
                    shape='circle'
                    icon={isNight ? <SunOutlined /> : <MoonOutlined />}
                />
            }
        </>
    )
}
