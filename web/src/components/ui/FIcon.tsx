import React from 'react'
import s from "./Ui.module.sass"
import { cls } from '@/utils'

interface Props {
    name: string
    size?: string | number
    color?: string
    primary?: boolean
    muted?: boolean
    pointer?: boolean
    className?: string
}
export function FIcon({
    name,
    size = '1rem',
    color,
    primary = false,
    muted = false,
    pointer = false,
    className
}: Props) {
    const fontSize = typeof size === 'number' ? `${size}px` : size;
    color = primary ? 'var(--primary)' : color;
    const cursor = pointer ? 'pointer' : 'default';

    return <i className={cls(`fi ${name}`, s.ficon, muted && s.muted, className)} style={{ fontSize, color, cursor }} />;
}