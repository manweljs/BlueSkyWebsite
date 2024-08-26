import React from 'react'
import { Drawer as AntdDrawer, DrawerProps } from 'antd'
import s from "./Ui.module.sass"

interface Props extends DrawerProps {
    children: React.ReactNode;
    open: boolean;
}

export default function Drawer({
    children,
    open,
    ...props
}: Props) {
    return (
        <AntdDrawer
            className={s.drawer}
            open={open}
            {...props}
            classNames={{ mask: s.drawer_mask, wrapper: s.drawer_wrapper, content: s.drawer_content }}
        >
            {children}
        </AntdDrawer>
    )
}
