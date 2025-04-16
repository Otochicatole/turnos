'use client';
import React, { createContext, useState, useContext } from 'react';

interface NavBarContextProps {
    isHovered: boolean;
    setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBarContext = createContext<NavBarContextProps | undefined>(undefined);

export const NavBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavBarContext.Provider value={{ isHovered, setIsHovered }}>
            {children}
        </NavBarContext.Provider>
    );
};

export const useNavBarContext = () => {
    const context = useContext(NavBarContext);
    if (!context) {
        throw new Error('useNavBarContext must be used within a NavBarProvider');
    }
    return context;
};