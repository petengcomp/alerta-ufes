import { createContext, useState } from "react";

export const AlertInfoContext = createContext();

export function AlertInfoProvider({children}) {
    const [isNotAnswered, setIsNotAnswered] = useState(false);

    function showNotAnswered() {
        setIsNotAnswered(!isNotAnswered);
    }

    return (
        <AlertInfoContext.Provider value={{ 
            isNotAnswered,
            showNotAnswered,
         }}>
            {children}
        </AlertInfoContext.Provider>
    )
}