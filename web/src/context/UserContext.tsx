import { SECTION } from '@/consts';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { checkIfNight } from 'utils';

type ActiveSectionType = number | null | undefined;

// Mendefinisikan tipe untuk konteks
interface UserContextType {
    activeSection: ActiveSectionType
    setActiveSection: (param: ActiveSectionType) => void
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined
    setCamera: (param: THREE.PerspectiveCamera | THREE.OrthographicCamera) => void
    cameraControlsRef?: any
    startExperience?: boolean
    setStartExperience?: (param: boolean) => void
    isNight?: boolean
    setIsNight?: (param: boolean) => void
    streetLightLoaded?: boolean
    setStreetLightLoaded?: (param: boolean) => void
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
    const [isNight, setIsNight] = useState<boolean>(checkIfNight());
    const [streetLightLoaded, setStreetLightLoaded] = useState<boolean>(false);
    const cameraControlsRef = useRef(null)

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
        setStreetLightLoaded
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


