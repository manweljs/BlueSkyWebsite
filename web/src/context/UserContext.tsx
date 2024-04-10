import { SECTION } from '@/consts';
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import * as THREE from 'three';

type ActiveSectionType = string | null | undefined;

// Mendefinisikan tipe untuk konteks
interface UserContextType {
    activeSection: ActiveSectionType
    setActiveSection: (param: ActiveSectionType) => void
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera | undefined
    setCamera: (param: THREE.PerspectiveCamera | THREE.OrthographicCamera) => void
    cameraControlsRef?: any
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
    const cameraControlsRef = useRef(null)

    const updateCamera = (pos: THREE.Vector3, rot: THREE.Vector3) => {
        camera.position.set(pos.x, pos.y, pos.z);
        camera.rotation.set(rot.x, rot.y, rot.z);
        camera.updateProjectionMatrix();

    }

    useEffect(() => {
        handleUpdateCamera(camera, activeSection);
    }, [activeSection]);

    const value = {
        activeSection,
        setActiveSection,
        camera,
        setCamera,
        cameraControlsRef
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};


const handleUpdateCamera = (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera, activeSection: string) => {

    if (!camera) return;

    switch (activeSection) {
        case SECTION.COLLABORATION:
            camera.position.set(30, 5, -10);
            break;
        default:
            camera.position.set(75, 10, 30);
    }
    camera.updateProjectionMatrix();

}