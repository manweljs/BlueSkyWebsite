"use client";
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import style from '@/styles/style.module.sass'
import { Button } from 'antd';
import { useUserContext } from '@/context/UserContext';

const waitTime = 5000;

export default function LoadingExperience() {
    const [isLoading, setIsLoading] = useState(true);
    const { setStartExperience, startExperience } = useUserContext();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, waitTime);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <AnimatePresence>
            {!startExperience && (
                <motion.div className={style.loading_experience}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: !isLoading ? .95 : 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                >
                    <MyIcon />
                    {!isLoading && (
                        <motion.div>
                            <Button
                                className={style.button_enter}
                                onClick={() => { setStartExperience(true) }}
                                shape="round"
                                ghost
                            >
                                Enter
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}


const strokeAnimation = {
    animate: {
        pathLength: 1,
        transition: {
            default: { duration: waitTime / 1000, ease: "easeInOut" },
        }
    }
};

const MyIcon = () => (
    <svg className={style.main_icon} viewBox="-0.5 -0.5 35 35">
        <motion.path
            d="M16,0a16,16,0,0,1,.014,32,17.124,17.124,0,0,1-2.021-.12,4.274,4.274,0,0,1-.786-.2c-.2-1.84-.515-3.347-.787-4.96-.447-.013-.393.013-1.166.24,0-.173,4.014-1.853,5.79-3.16.176-.12.122-.133-.027-.32-.041-.053.081-.133.136-.173.637-.48,1.193-.894,1.328-1.014.244-.213.895-.653.963-.946.312-1.147,3.064-6.147,4.312-9.534.041-.133-.163-.493-.095-.653a11.315,11.315,0,0,0,.312-1.147l.691-.44.272.24L27.661,8.16a9.829,9.829,0,0,0-1.193-1.88c-.827.533-1.641,1.067-2.468,1.6-.217.133.163.827.258.987a.7.7,0,0,1-.38-.494l-4,2.427-.163.28L16.3,13.36c-.257-.52-1.6.507-1.762.653a.754.754,0,0,0-.272.654l-.122.053-.081-.093-.271.173.529,1.12.339-.173-.041-.094c.122.094.095.094.352.094a13.523,13.523,0,0,1,.611,3.413c.1,1.32-3.987,2.293-4.936,2.533a4.01,4.01,0,0,1,.054-1.066.67.67,0,0,1-.3-.24c.339.053,1.722.133,1.925-.654.041-.16-.027-.2-.027-.293-.054-.747.163-.44.122-.867a.82.82,0,0,1-.135-.173c0-.08.122-.253.054-.453-.081-.28-.217-.12-.244-.574.217-.493.2-.293.339-.613.041-.093-.014-.133-.122-.173-.61-.294-.556-.334-.854-1.174a7.094,7.094,0,0,0-.57-1.186c-.027-.054-.637-.054-.746-.28.3.28,1.655-.32,1.478-.854a1.027,1.027,0,0,1-.908,0,3.618,3.618,0,0,0,.678-1.426c-1.6.933-2.6.52-4.407.986A5.667,5.667,0,0,0,4.719,13.88a1.245,1.245,0,0,0-.082.587,2.08,2.08,0,0,1,.041-1.187,3.654,3.654,0,0,0-.786,1.707,3.893,3.893,0,0,0,.094,4.08c1.411,1.96,2.726,1.08,3.282,2.133-.2.173-.2.293-.5.4a4.163,4.163,0,0,0-1.288.493,1.152,1.152,0,0,0-.651,1.054c-.529.28-1.044.573-1.112.613-1.3.733-.637,1.507-.217,2.253A16.021,16.021,0,0,1,16,0Zm7.241,10.48c-.3.653-.6,1.307-.746,1.267-.122-.027-.163-.334-.217-.64a.509.509,0,0,0-.176-.334l.352.214Zm-1.356.867c-.014.573-.461,1.106-.1,1.76.19.36-2.576,3.92-3.81,5.613-.055.08.379,1.547.312,1.6s-1.872-4.453-2.116-5.093c-.04-.08.136-.4.1-.494l.054-.12,4.014-2.453.136.053.732-.44Z"
            initial={{ pathLength: 0 }}
            animate={strokeAnimation.animate}
            fill={"none"}
            stroke="#ffffff" // Or your chosen color
            strokeWidth="0.25"
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
        />
    </svg>
);