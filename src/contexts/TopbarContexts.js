import { createContext, useState } from "react";

export const TopbarContext = createContext();

export function TopbarProvider({children}) {
    const [isActiveNotification, setIsActiveNotification] = useState(false);
    const [isActiveProfile, setIsActiveProfile] = useState(false);

    function showNotification() {
        setIsActiveNotification(!isActiveNotification);
    }

    function showProfile() {
        setIsActiveProfile(!isActiveProfile);
        alert('Perfil')
    }

    return (
        <TopbarContext.Provider value={{ 
            isActiveNotification,
            isActiveProfile,
            showNotification,
            showProfile,
         }}>
            {children}
        </TopbarContext.Provider>
    )
}