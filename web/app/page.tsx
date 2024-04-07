
import { Suspense } from "react"
import style from "../styles/style.module.sass"
import Scene from "@/components/Scene"
import Navbar from "@/components/ui/navbar/Navbar"
import AudioPlayer from "@/components/ui/audio_player/AudioPlayer"
import { Spin } from "antd"

export default function Page() {
  return (
    <div className={style.home}>
      <Suspense fallback={<Loading />} >
        <Scene />
      </Suspense>
      <Navbar />
      <AudioPlayer />
    </div>
  )
}

const Loading = () => (
  <div className={style.loading}>
    <Spin size="large" />
  </div>
)