import React from 'react'
import { useUserContext } from '@/hooks/UserContext'
import { FloatButton } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import style from './Ui.module.sass'
import { isMobile } from 'react-device-detect'

export function DayNightOption() {
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
