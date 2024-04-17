import React from 'react'
import style from "@/styles/style.module.sass"
import { Radio, Select } from 'antd'
import { useUserContext } from '@/context/UserContext'
import { Quality } from '@/types'

const options = [
    { value: 0, label: "Low" },
    { value: 1, label: "Med" },
    { value: 2, label: "High" },
]
export default function ModeControls() {

    const { setQuality, quality } = useUserContext()

    const handleChange = (value: Quality) => {
        setQuality(value)
    }

    return (
        <div className={style.mode_control}>
            <Radio.Group
                buttonStyle="solid"
                value={quality}
                onChange={(e) => handleChange(e.target.value)}>
                {options.map((option, index) => (
                    <Radio.Button
                        key={index}
                        value={option.value}>{option.label}</Radio.Button>
                ))}
            </Radio.Group>
        </div>
    )
}
