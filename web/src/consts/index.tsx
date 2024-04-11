
export enum SECTION {
    COLLABORATION = "collaboration",
    ABOUT = "about",
    OPTIMIZING = "optimizing"
}

const ICON_Y = 10

export const ICON_SIZE = 100

export const PRIMARY_COLOR = "#02488f"


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
            url: "/img/collaboration.png",
            position: [-8, ICON_Y, 32]
        },
        contents: {
            title: "Coles and IBM Collaboration",
            paragraph: [
                `BlueSky Creations, in proud collaboration with Coles and IBM, is leading the charge in technological innovation, 
                revolutionizing how businesses approach decision-making with unmatched efficiency.`,

                `Leveraging the power of IBM Cplex and our innovative algorithms, we've crafted advanced solutions 
                tailored to overcome today's operational challenges. We invite you to explore the future of operational 
                excellence with us and witness firsthand how our collaboration is propelling success across various industries.`
            ]
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
            url: "/img/about.png",
            position: [-15, ICON_Y, 0]
        },
        contents: {
            title: "Who we are and what we stand for",
            paragraph: [
                `At BlueSky Creations, we are passionate about using technology to solve complex business problems.`,

                `We push the boundaries of what's possible in AI, machine learning, and optimization to help you optimize
                your business and create a better world for everyone.`
            ]
        }
    },

    {
        index: 3,
        id: "optimizing",
        title: "Optimizing",
        lookAt: {
            pos: [30, 20, -25],
            target: [15, 5, -55]
        },
        icon: {
            url: "/img/optimizing.png",
            position: [-5, ICON_Y, -60]
        },
        contents: {
            title: "Optimizing your business",
            paragraph: [
                `We specialize in developing custom optimization solutions that help you make better decisions, faster.`,

                `Optimize your business with the power of IBM CPLEX technology
                Route your way to success with our routing optimization algorithms Keep your inventory optimized with Meta OPT’s 
                inventory optimization tools. Simplify your scheduling with our intuitive scheduling software. 
                Need something else optimized? Our user-friendly platform enables you to submit your data and receive optimized results in just minutes. 
                With the ability to integrate GPT technology and chatbots, 
                Meta OPT is always evolving to meet your needs.`
            ]
        }
    }
]