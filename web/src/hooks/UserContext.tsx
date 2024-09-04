import { Quality, UserPreference } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { checkIfNight } from '@/utils';
import { CameraControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';

type ActiveSectionType = number | null | undefined;



// Mendefinisikan tipe untuk konteks
interface UserContextType {
    activeSection: ActiveSectionType
    setActiveSection: React.Dispatch<React.SetStateAction<ActiveSectionType>>
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined
    setCamera: React.Dispatch<React.SetStateAction<THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined>>
    cameraControlsRef?: any
    startExperience?: boolean
    setStartExperience?: React.Dispatch<React.SetStateAction<boolean>>
    isNight?: boolean
    setIsNight?: React.Dispatch<React.SetStateAction<boolean>>
    streetLightLoaded?: boolean
    setStreetLightLoaded?: React.Dispatch<React.SetStateAction<boolean>>,
    loadingProgress?: number
    setLoadingProgress?: React.Dispatch<React.SetStateAction<number>>
    quality: Quality
    setQuality: React.Dispatch<React.SetStateAction<Quality>>
    qualitySet: boolean
    setQualitySet: React.Dispatch<React.SetStateAction<boolean>>
    deviceFPSRate?: number
    setDeviceFPSRate?: React.Dispatch<React.SetStateAction<number | undefined>>
    userPreference: UserPreference
    setUserPreference: React.Dispatch<React.SetStateAction<UserPreference>>
    playerMode: boolean
    setPlayerMode: React.Dispatch<React.SetStateAction<boolean>>
    openNav: boolean
    setOpenNav: React.Dispatch<React.SetStateAction<boolean>>
    navigate: (path: string, blank?: boolean) => void
}

// Membuat context dengan tipe yang didefinisikan
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook untuk menggunakan UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

// Mendefinisikan props untuk UserProvider
interface UserProviderProps {
    children: ReactNode;
}

// Membuat UserProvider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [activeSection, setActiveSection] = useState<ActiveSectionType>(null);
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined>(undefined);
    const [startExperience, setStartExperience] = useState<boolean>(false);
    const [isNight, setIsNight] = useState<boolean>(false);
    const [streetLightLoaded, setStreetLightLoaded] = useState<boolean>(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [quality, setQuality] = useState<Quality>(2);
    const [userPreference, setUserPreference] = useState<UserPreference>(undefined);
    const [qualitySet, setQualitySet] = useState(false)
    const [deviceFPSRate, setDeviceFPSRate] = useState<number | undefined>(undefined)
    const [playerMode, setPlayerMode] = useState(false)
    const [openNav, setOpenNav] = useState(false)

    const router = useRouter()
    const navigate = (path: string, blank?: boolean) => {
        if (blank) {
            window.open(path, '_blank')
            return
        }
        router.push(path)
    }

    useEffect(() => {
        handleUserPreferenceChange(userPreference)
    }, [userPreference]);

    const cameraControlsRef = useRef(null)

    useEffect(() => {
        const isNight = checkIfNight()
        if (isMobile) {
            setIsNight(false)
            return
        }
        setIsNight(isNight)
    }, [isMobile]);

    const value = {
        activeSection,
        setActiveSection,
        camera,
        setCamera,
        cameraControlsRef,
        startExperience,
        setStartExperience,
        isNight,
        setIsNight,
        streetLightLoaded,
        setStreetLightLoaded,
        loadingProgress,
        setLoadingProgress,
        quality,
        setQuality,
        userPreference,
        setUserPreference,
        qualitySet,
        setQualitySet,
        deviceFPSRate,
        setDeviceFPSRate,
        playerMode,
        setPlayerMode,
        openNav,
        setOpenNav,
        navigate
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


const handleUserPreferenceChange = (preference: UserPreference) => {
    console.log('userPreference', preference)
}


