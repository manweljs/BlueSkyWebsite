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
            id='drawer'
            className={s.drawer}
            open={open}
            {...props}
            classNames={{
                mask: s.drawer_mask,
                wrapper: s.drawer_wrapper,
                content: s.drawer_content,
                header: s.drawer_header,
                body: s.drawer_body
            }}

        >
            {children}
        </AntdDrawer>
    )
}
