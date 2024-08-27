

import React, { useEffect } from "react";
import { motion, AnimatePresence as Presence, useAnimation } from "framer-motion";

export const AnimatePresence = Presence;

interface MotionProps {
    children: React.ReactNode,
    direction: "up" | "down" | "left" | "right",
    className?: string,
    delay?: number,
    distance?: number,
    style?: React.CSSProperties,
    play?: boolean,
    type?: "div" | "li",
    amount?: number | "some" | "all",

}

const delayFragment = 0.1;
const easeInOutQuart = [0.76, 0, 0.24, 1];
const easeInOutCirc = [1, 0, .15, 1]


export const anim = (variants: any, custom?: any) => {
    return {
        initial: "initial",
        whileInView: "enter",
        exit: "exit",
        variants,
        custom,

    }

}

/**
 * Slide component for animating elements in a specific direction.
 *
 * @param {MotionProps} props - The motion props for the Slide component.
 * @returns {JSX.Element} The rendered Slide component.
 */
export const Slide = (props: MotionProps) => {
    const { children, direction, delay, distance = 20, type, amount = "some" } = props;

    let x = 0;
    let y = 0;

    if (direction === "left") {
        x = distance;
    } else if (direction === "right") {
        x = -distance;
    } else if (direction === "up") {
        y = distance;
    } else if (direction === "down") {
        y = -distance;
    }

    const variants = {
        initial: {
            opacity: 0,
            y: y,
            x: x,
        },
        enter: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.5,
                ease: easeInOutQuart,
                delay: delay ? delay * delayFragment : 0,
            },
        },
        exit: {
            opacity: 0,
            y: y,
            x: y,
            transition: {
                duration: 0.5,
                ease: easeInOutQuart,
            },
        },

    }

    switch (type) {
        case "li":
            return (
                <motion.li
                    {...anim(variants)}
                    {...props}
                    viewport={{ once: true, amount: amount }}
                >
                    {children}
                </motion.li>
            );
        default:
            return (
                <motion.div
                    {...anim(variants)}
                    {...props}
                    viewport={{ once: true, amount: amount }}
                >
                    {children}
                </motion.div>
            );
    }

}

/**
 * Component for creating a masked motion effect.
 *
 * @param {MotionProps} props - The motion props.
 * @returns {JSX.Element} The masked motion component.
 */
export const Mask = (props: MotionProps) => {
    const { children, direction, delay = 0 } = props;
    const variants = {
        initial: {
            clipPath: getInitialClipPath(direction),
        },
        enter: {
            clipPath: "inset(0%)",
            transition: {
                duration: 0.4,
                ease: easeInOutQuart,
                delay: delay * delayFragment,
            },
        },
        exit: {
            clipPath: getInitialClipPath(direction),
            transition: {
                duration: 0.65,
                ease: easeInOutCirc,
            }
        }
    };

    function getInitialClipPath(direction: string) {
        switch (direction) {
            case "left":
                return "inset(0% 0% 0% 100%)";
            case "right":
                return "inset(0% 100% 0% 0%)";
            case "up":
                return "inset(100% 0% 0% 0%)";
            case "down":
                return "inset(0% 0% 100% 0%)";
            default:
                return "inset(0% 0% 0% 0%)";
        }
    }

    return (
        <motion.div
            {...anim(variants)}
            viewport={{ once: true }}
            {...props}
        >
            {children}
        </motion.div>
    );
};


/**
 * Renders a row with motion effects.
 *
 * @param props - The motion props.
 * @returns The rendered row component.
 */
export const Row = (props: MotionProps) => {
    const { children, delay = 0, play = true, distance = 15 } = props;
    const controls = useAnimation();

    useEffect(() => {
        play && controls.start({
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: easeInOutQuart,
                delay: delay * delayFragment
            }
        });

    }, [play, controls]);

    return (
        <motion.tr
            initial={{
                opacity: play ? 0 : 1,
                x: play ? distance : 0,
            }}
            animate={controls}
            {...props}
        >
            {children}
        </motion.tr>
    );
}


const Motion = {
    Slide,
    Mask,
    Row,
};
export default Motion;