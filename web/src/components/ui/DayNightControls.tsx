import React from 'react'
import { useUserContext } from '@/context/UserContext'
import { FloatButton } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import style from '@/styles/style.module.sass'

export default function DayNightControls() {
    const { isNight, setIsNight } = useUserContext()
    return (
        <FloatButton
            onClick={() => setIsNight(!isNight)}
            className={style.button_night}
            shape='circle'
            icon={isNight ? <SunOutlined /> : <MoonOutlined />}
        />
    )
}
