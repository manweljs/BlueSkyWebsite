import { useUserContext } from '@/hooks/UserContext'
import { FloatButton } from 'antd'
import React from 'react'
import { isMobile } from 'react-device-detect'
import s from './Ui.module.sass'
import { FIcon } from './FIcon'

export default function PlayerModeOption() {
    const { playerMode, setPlayerMode } = useUserContext()
    return (
        <>
            {!isMobile &&
                <FloatButton
                    onClick={() => setPlayerMode(prev => !prev)}
                    className={s.button_player_mode}
                    shape='circle'
                    icon={playerMode ? <FIcon name='fi-rr-user' pointer /> : <FIcon name='fi-rr-user' pointer />}
                />
            }
        </>
    )
}
