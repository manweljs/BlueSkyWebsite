
export enum SECTION {
    COLLABORATION = "collaboration",
    ABOUT = "about"
}

export const ICON_SIZE = 120

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
        }
    }
}