import { createContext, useState } from "react";

export const CampiContext = createContext();

export function CampiProvider({children}) {
    const [isDeleteCampus, setIsDeleteCampus] = useState(false);

    function showDeleteCampus() {
        setIsDeleteCampus(!isDeleteCampus);
    }

    return (
        <CampiContext.Provider value={{ 
            isDeleteCampus,
            showDeleteCampus
         }}>
            {children}
        </CampiContext.Provider>
    )
}