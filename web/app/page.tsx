
import { Suspense } from "react"
import style from "../styles/style.module.sass"
import Navbar from "@/components/ui/navbar/Navbar"
import AudioPlayer from "@/components/ui/audio_player/AudioPlayer"
import { Spin } from "antd"
import Experience from "@/components/Experience"
import ControlGuide from "@/components/ui/ControlGuide"

export default function Page() {
  return (
    <div className={style.home}>
      <Experience />
      <Navbar />
      <AudioPlayer />
      <ControlGuide />
    </div>
  )
}

const Loading = () => (
  <div className={style.loading}>
    <Spin size="large" />
  </div>
)