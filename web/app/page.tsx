
import { Suspense } from "react"
import style from "../styles/style.module.sass"
import Scene from "@/components/Scene"

export default function Page() {
  return (
    <div className={style.home}>
      <Suspense >
        <Scene />
      </Suspense>
    </div>
  )
}
