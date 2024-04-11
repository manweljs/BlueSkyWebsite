import React, { useEffect, useRef } from 'react'
import style from "@/styles/style.module.sass"
import { Drawer } from 'antd'
import YouTube from 'react-youtube';
import { useUserContext } from '@/context/UserContext';
import { SECTION, sectionData } from '@/consts';

const videoId = "HtiGijgbmZU"

export default function CollaborationSection() {

    const contents = sectionData[1].contents

    const ref = useRef(null);
    const { activeSection } = useUserContext()

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    useEffect(() => {
        const stopVideo = () => {
            if (ref.current) { // Memastikan referensi dan player tersedia
                ref.current.internalPlayer.stopVideo();
            }
        };

        const playVideo = () => {
            if (ref.current) { // Memastikan referensi dan player tersedia
                ref.current.internalPlayer.playVideo();
            }
        };

        if (activeSection === 1) {
            playVideo()
        } else {
            stopVideo()
        }

    }, [activeSection]);

    return (
        <div className={style.collaboration}>

            <YouTube videoId={videoId} opts={opts} ref={ref} />
            <h2 className={style.h2}>{contents.title}</h2>
            {
                contents.paragraph.map((p, i) => <p key={i} style={{ marginBottom: ".75rem" }} >{p}</p>)
            }

        </div>
    )
}

