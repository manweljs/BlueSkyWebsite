
export enum SECTION {
    COLLABORATION = "collaboration",
    ABOUT = "about"
}

export const ICON_SIZE = 100

export const PRIMARY_COLOR = "#02488f"


export const sectionData = {
    default: {
        title: "Home",
        lookAt: {
            pos: [75, 25, 30],
            target: [0, 0, 0]
        }
    },

    collaboration: {
        title: "Collaboration",
        lookAt: {
            pos: [4, 12, 0],
            target: [-20, 0, 30]
        },
        iconUrl: "/img/collaboration.png",
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

    about: {
        title: "About",
        lookAt: {
            pos: [15, 15, 10],
            target: [3, 10, 0]
        },
        iconUrl: "/img/about.png",
        contents: {
            title: "Who we are and what we stand for",
            paragraph: [
                `At BlueSky Creations, we are passionate about using technology to solve complex business problems.`,

                `We push the boundaries of what's possible in AI, machine learning, and optimization to help you optimize
                your business and create a better world for everyone.`
            ]
        }
    }
}