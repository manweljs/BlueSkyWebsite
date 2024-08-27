"use client"

import { UserProvider } from '@/hooks/UserContext'
import { App, ConfigProvider, theme } from 'antd'
import React from 'react'
import { Bai_Jamjuree } from "next/font/google";
export const font = Bai_Jamjuree({ subsets: ["latin"], weight: ['400', '700', '600', '500'] });

export default function Wrapper({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <ConfigProvider
                prefixCls="bluesky"

                theme={{
                    algorithm: theme.defaultAlgorithm,
                    token: {
                        fontFamily: font.style.fontFamily,

                    }
                }}

            >
                <App>
                    {children}
                </App>
            </ConfigProvider>
        </UserProvider>
    )
}
