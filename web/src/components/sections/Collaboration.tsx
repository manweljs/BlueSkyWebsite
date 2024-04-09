import React, { useEffect, useRef } from 'react'
import style from "@/style.module.sass"
import { Drawer } from 'antd'
import YouTube from 'react-youtube';
import { useUserContext } from '@/context/UserContext';
import { SECTION } from '@/consts';

const videoId = "HtiGijgbmZU"

export default function Collaboration() {

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

        if (activeSection === SECTION.COLLABORATION) {
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

const contents = {
    title: "Coles and IBM Collaboration",
    paragraph: [
        `BlueSky Creations, in proud collaboration with Coles and IBM, is leading the charge in technological innovation, 
        revolutionizing how businesses approach decision-making with unmatched efficiency.`,

        `Leveraging the power of IBM Cplex and our innovative algorithms, we've crafted advanced solutions 
        tailored to overcome today's operational challenges. We invite you to explore the future of operational 
        excellence with us and witness firsthand how our collaboration is propelling success across various industries.`
    ]


}