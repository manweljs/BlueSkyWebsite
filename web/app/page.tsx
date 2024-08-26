

import APP from "@/App"
import style from "@/styles/style.module.sass"
import { cls } from "@/utils";
import "@flaticon/flaticon-uicons/css/all/all.css"
import { Bai_Jamjuree } from "next/font/google";
const font = Bai_Jamjuree({ subsets: ["latin"], weight: ['400', '700', '600', '500'] });

export default function page() {
  return (
    <div className={cls(style.home, font.className)}>
      <APP />
    </div>
  )
}

