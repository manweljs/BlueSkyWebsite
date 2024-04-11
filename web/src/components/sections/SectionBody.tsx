import React, { useEffect, useRef } from 'react'
import style from "@/styles/style.module.sass"
import YouTube from 'react-youtube';
import { ContentType } from '@/types';

const videoId = "HtiGijgbmZU"

export default function SectionBody(props: {
    contents: ContentType
}) {

    const { contents } = props

    const ref = useRef(null);

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

        if (contents.videoId) {
            playVideo()
        } else {
            stopVideo()
        }

    }, [contents.videoId]);

    return (
        <div className={style.collaboration}>

            {contents.videoId &&
                <YouTube videoId={contents.videoId} opts={opts} ref={ref} />
            }

            <h2 className={style.h2}>{contents.title}</h2>
            {
                contents.paragraph.map((p, i) => <p key={i} style={{ marginBottom: ".75rem", fontSize: "1rem" }} >{p}</p>)
            }

        </div>
    )
}

