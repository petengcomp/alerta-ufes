import { createContext, useState } from "react";

export const SystemContext = createContext();

export function SystemProvider({children}) {
    const [isEditCategories, setIsEditCategories] = useState(false);
    const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [isDeleteCategories, setIsDeleteCategories] = useState(false);
    const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);

    function showEditCategories() {
        setIsEditCategories(!isEditCategories);
    }

    function showDeleteCategories() {
        setIsDeleteCategories(!isDeleteCategories);
    }

    function showEditAnswer() {
        setIsEditAnswer(!isEditAnswer);
    }

    function showDeleteAnswer() {
        setIsDeleteAnswer(!isDeleteAnswer);
    }

    return (
        <SystemContext.Provider value={{ 
            isEditCategories,
            isEditAnswer,
            isDeleteCategories,
            isDeleteAnswer,
            showEditCategories,
            showEditAnswer,
            showDeleteCategories,
            showDeleteAnswer
         }}>
            {children}
        </SystemContext.Provider>
    )
}