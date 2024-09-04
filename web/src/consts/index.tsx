
export enum SECTION {
    COLLABORATION = "collaboration",
    ABOUT = "about",
    OPTIMIZING = "optimizing"
}

export const BSBLOG_API_URL = "https://api.pluvoo.com"
export const appId = 'dd71e5e9-1904-4500-86c7-f5b4e8f03986'

export const ICON_SIZE = 100

export const PRIMARY_COLOR = "#0054ff"
export const BRAND_COLOR = "#02488f"

export const preloadingTime = process.env.NODE_ENV === "development" ? 1 : 4;


export enum Controls {
    forward = 'forward',
    backward = 'backward',
    left = 'left',
    right = 'right',
    jump = 'jump',
}


