import { createContext, useState } from "react";

export const SystemContext = createContext();

export function SystemProvider({children}) {
    const [isEditCategories, setIsEditCategories] = useState(false);
    const [isEditAnswer, setIsEditAnswer] = useState(false);
    const [isDeleteCategories, setIsDeleteCategories] = useState(false);
    const [isDeleteAnswer, setIsDeleteAnswer] = useState(false);
    const [itemSelected, setItemSelected] = useState(-1);
    const [categorias, setCategorias] = useState([
        {id: 0, name: "categoria 1"},
        {id: 1, name: "categoria 2"},
        {id: 2, name: "categoria 3"},
        {id: 3, name: "categoria 4"},
        {id: 4, name: "categoria 5"}
    ]);

    function showEditCategories() {
        setIsEditCategories(!isEditCategories);
    }

    function showDeleteCategories(index) {
        setItemSelected(index);
        setIsDeleteCategories(!isDeleteCategories);
    }

    function showEditAnswer() {
        setIsEditAnswer(!isEditAnswer);
    }

    function showDeleteAnswer() {
        setIsDeleteAnswer(!isDeleteAnswer);
    }

    function deleteCategory(){
        if(itemSelected > -1){
            categorias.splice(itemSelected, 1);
        }
        setItemSelected(-1);
        setIsDeleteCategories(!isDeleteCategories);
    }

    return (
        <SystemContext.Provider value={{ 
            itemSelected,
            categorias,
            isEditCategories,
            isEditAnswer,
            isDeleteCategories,
            isDeleteAnswer,
            showEditCategories,
            showEditAnswer,
            showDeleteCategories,
            showDeleteAnswer,
            deleteCategory
         }}>
            {children}
        </SystemContext.Provider>
    )
}