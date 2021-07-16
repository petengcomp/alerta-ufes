import { createContext, useState } from "react";
import {useRouter} from 'next/router';
export const TopbarContext = createContext();
import Swal from "sweetalert2";

export function TopbarProvider({children}) {
    const [isActiveNotification, setIsActiveNotification] = useState(false);
    const [isActiveProfile, setIsActiveProfile] = useState(false);
    const router = useRouter()

    function showNotification() {
        setIsActiveNotification(!isActiveNotification);
    }

    function showProfile() {
        setIsActiveProfile(!isActiveProfile);
        alert('Perfil')
    }

    function LogoutProfile(){
        Swal.fire({
            title: 'Deseja mesmo sair?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim'
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('ALERTAUFESuserToken');
                router.push('/');
            }
          })
        
    }

    return (
        <TopbarContext.Provider value={{ 
            isActiveNotification,
            isActiveProfile,
            showNotification,
            showProfile,
            LogoutProfile,
         }}>
            {children}
        </TopbarContext.Provider>
    )
}