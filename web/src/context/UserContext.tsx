import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActiveSectionType = string | null | undefined;

// Mendefinisikan tipe untuk konteks
interface UserContextType {
    activeSection: ActiveSectionType
    setActiveSection: (param: ActiveSectionType) => void
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

    return (
        <UserContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </UserContext.Provider>
    );
};