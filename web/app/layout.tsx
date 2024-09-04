import { Layout } from '@/components/dom/Layout'
import "antd/dist/reset.css"
import s from "@/styles/style.module.sass"
import Wrapper from './Wrapper'
import dynamic from 'next/dynamic'
import "bsblog/dist/style.css"

import { cls } from '@/utils'


export const metadata = {
  title: 'BlueSky Creations',
  description: 'Optimal decision making, making the uncertain more certain.',
}

export default function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === 'development'
  return (
    <html lang='en' className={cls(s.bluesky)} suppressHydrationWarning={isDev}>
      <head />
      <body>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
