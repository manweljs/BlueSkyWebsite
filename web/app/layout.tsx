import { Layout } from '@/components/dom/Layout'
import "antd/dist/reset.css"
import s from "@/styles/style.module.sass"
import Wrapper from './Wrapper'
import dynamic from 'next/dynamic'

import { cls } from '@/utils'


export const metadata = {
  title: 'BlueSky Creations',
  description: 'Optimal decision making, making the uncertain more certain.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={cls(s.bluesky)}>
      <head />
      <body>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  )
}
