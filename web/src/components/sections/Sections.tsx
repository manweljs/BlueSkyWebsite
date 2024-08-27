"use client";
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/hooks/UserContext'
import SectionBody from './SectionBody'
import Drawer from '@/components/ui/Drawer'
import Mining from './Mining'

export default function Sections() {
    const { activeSection, setActiveSection, cameraControlsRef } = useUserContext()
    const [showDrawer, setShowDrawer] = useState(false);

    const handleClose = () => {
        setActiveSection(0)
    }

    useEffect(() => {
        if (!cameraControlsRef.current) return;
        cameraControlsRef.current.setLookAt(
            ...sectionData[activeSection].lookAt.pos,
            ...sectionData[activeSection].lookAt.target,
            true,

        )
    }, [cameraControlsRef, activeSection]);

    useEffect(() => {
        if (activeSection > 0) {
            const timer = setTimeout(() => {
                setShowDrawer(true);
            }, 600);

            return () => clearTimeout(timer);
        }
        setShowDrawer(false);
    }, [activeSection]);

    const drawerWidth = window.innerWidth > 1600 ? 900 : 800;

    return (
        <Drawer open={showDrawer} onClose={handleClose} width={drawerWidth} >
            {activeSection > 0 &&
                sectionData[activeSection].children
            }
        </Drawer>
    )
}

const ICON_Y = 10

export const sectionData = [

    {
        index: 0,
        id: "default",
        title: "Home",
        lookAt: {
            pos: [75, 25, 30],
            target: [0, 0, 0]
        }

    },

    {
        index: 1,
        id: "collaboration",
        title: "Collaboration",
        lookAt: {
            pos: [4, 12, 0],
            target: [-20, 0, 30]
        },
        icon: {
            name: "fi-tr-heart-partner-handshake",
            position: [-8, ICON_Y, 32]
        },
        contents: {
            title: "Coles and IBM Collaboration",
            videoId: "HtiGijgbmZU",
            paragraph: [
                `BlueSky Creations, in proud collaboration with Coles and IBM, is leading the charge in technological innovation, 
                revolutionizing how businesses approach decision-making with unmatched efficiency.`,

                `Leveraging the power of IBM Cplex and our innovative algorithms, we've crafted advanced solutions 
                tailored to overcome today's operational challenges. We invite you to explore the future of operational 
                excellence with us and witness firsthand how our collaboration is propelling success across various industries.`
            ],
        }
    },

    {
        index: 2,
        id: "about",
        title: "About",
        lookAt: {
            pos: [15, 15, 10],
            target: [3, 10, 0]
        },
        icon: {
            name: "fi-tr-bank",
            position: [-15, ICON_Y, 0]
        },
        contents: {
            title: "Who we are and what we stand for",
            videoId: null,
            paragraph: [
                `At BlueSky Creations, we are passionate about using technology to solve complex business problems.`,

                `We push the boundaries of what's possible in AI, machine learning, and optimization to help you optimize
                your business and create a better world for everyone.`
            ],
        }
    },

    {
        index: 3,
        id: "optimizing",
        title: "Optimizing",
        lookAt: {
            pos: [30, 15, -100],
            target: [-25, 5, -60]
        },
        icon: {
            name: "fi-tr-rocket-lunch",
            position: [-5, ICON_Y, -60]
        },
        contents: {
            title: "Optimizing your business",
            videoId: null,
            paragraph: [
                `We specialize in developing custom optimization solutions that help you make better decisions, faster.`,

                `Optimize your business with the power of IBM CPLEX technology
                Route your way to success with our routing optimization algorithms Keep your inventory optimized with Meta OPT’s 
                inventory optimization tools. Simplify your scheduling with our intuitive scheduling software.`,

                `Need something else optimized? Our user-friendly platform enables you to submit your data and receive optimized results in just minutes. 
                With the ability to integrate GPT technology and chatbots, 
                Meta OPT is always evolving to meet your needs.`
            ]
        }
    },

    {
        index: 4,
        id: "recruitment",
        title: "Recruitment",
        lookAt: {
            pos: [10, 20, -20],
            target: [0, 3, -40]
        },
        icon: {
            name: "fi-tr-corporate-alt",
            position: [-12, ICON_Y, -33]
        },
        contents: {
            title: "The most complete HR & talent management software solution",
            videoId: null,
            paragraph: [
                `SquirrelHR is a complete cloud-based HR, workforce management and payroll platform for teams of any size.`,

                `Squirrel exists to enable people management professionals to engage, manage and retain their top talent. 
                From hiring through to payroll, and an employee’s first day to their last, 
                Squirrel not only makes all people management processes pain free, but enjoyable.`
            ]
        }
    },
    {
        index: 5,
        id: "distributionCenter",
        title: "Distribution Center",
        lookAt: {
            pos: [35, 8, -30],
            target: [25, 5, -65]
        },
        icon: {
            name: "fi-tr-warehouse-alt",
            position: [15, ICON_Y, -52]
        },
        contents: {
            title: "Unlock the full potential of your Distribution Centre Operations",
            videoId: null,
            paragraph: [
                `Improve the performance, efficiency, and cost-effectiveness of your data center operations. 
                Get customized solutions that meet your specific needs from our team of experts.`,

                `OptimizeDC is designed to provide you with the best results and take your data center operations to the next level.`
            ]
        }
    },
    {
        index: 6,
        id: "nursing",
        title: "Nursing",
        lookAt: {
            pos: [5, 10, -10],
            target: [-10, 5, -28]
        },
        icon: {
            name: "fi-tr-hospital",
            position: [-17, ICON_Y, -20]
        },
        contents: {
            title: "Make your labor hire business more efficient and effective",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },
    {
        index: 7,
        id: "concert",
        title: "Concert",
        lookAt: {
            pos: [20, 9, 30],
            target: [6.5, 5, 38]
        },
        icon: {
            name: "fi-tr-stage-concert",
            position: [6.5, ICON_Y, 48]
        },
        contents: {
            title: "Make your labor hire business more efficient and effective",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },

    {
        index: 8,
        id: "ndis",
        title: "NDIS",
        lookAt: {
            pos: [-1, 5, -10],
            target: [17, 5, -14]
        },
        icon: {
            name: "fi-tr-hr-group",
            position: [15, ICON_Y, -18]
        },
        contents: {
            title: "Make your labor hire business more efficient and effective",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },

    {
        index: 9,
        id: "sport",
        title: "Sport",
        lookAt: {
            pos: [15, 18, -25],
            target: [8, 8, -33]
        },
        icon: {
            name: "fi-tr-court-sport",
            position: [0, ICON_Y, -33]
        },
        contents: {
            title: "Make your labor hire business more efficient and effective",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },
    {
        index: 10,
        id: "mining",
        title: "Mining",
        lookAt: {
            pos: [-15, 25, -10],
            target: [-95, 0, 30]
        },
        icon: {
            name: "fi-tr-excavator",
            position: [-61, ICON_Y + 5, 30]
        },
        children: <Mining />
    },
    {
        index: 11,
        id: "transport",
        title: "Transport",
        lookAt: {
            pos: [5, 10, 15],
            target: [15, 6, 30]
        },
        icon: {
            name: "fi-tr-train-station",
            position: [23, ICON_Y, 30]
        },
        contents: {
            title: "Make your labor hire business more efficient and effective",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },
    {
        index: 12,
        id: "event",
        title: "Event",
        lookAt: {
            pos: [-20, 15, 100],
            target: [5, 5, 70]
        },
        icon: {
            name: "fi-tr-umbrella-beach",
            position: [-6, ICON_Y, 70]
        },
        contents: {
            title: "Hospitality & Events Management",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },
    {
        index: 13,
        id: "blog",
        title: "Blog",
        lookAt: {
            pos: [0, 8, -20],
            target: [25, 5, -35]
        },
        icon: {
            name: "fi-tr-train-station",
            position: [15, ICON_Y, -35]
        },
        contents: {
            title: "Blog",
            videoId: null,
            paragraph: [
                `Empower employers, agents, and candidates with our AI-powered solutions. 
                Transform the way you operate in the dynamic world of temporary and on-demand labor acquisition and provision. 
                Enjoy genuine efficiencies in the labor hire industry with our comprehensive suite of products.`,

                `Small business or large enterprise? Our advanced analytics, optimization algorithms, 
                and artificial intelligence can help you flourish in the labor market.`
            ]
        }
    },
]

