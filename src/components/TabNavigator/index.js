import styles from '../../styles/components/TabNavigator.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';

export function TabNavigator(){
    const router = useRouter();
    const [userType, setUserType] = useState('');

    useEffect(()=>{
        setUserType(localStorage.getItem("ALERTAUFESuserType"))
    }, [])

    return(
        <div className={styles.tabNavigatorContainer}>
            <div className={styles.tabNavigatorTopbar}>
                <img width="170px" src="icons/logo.svg" alt="Notificação" />
            </div>
            <div className={styles.tabNavigatorPages}>
               <p className={styles.tabNavigatorTitles}>Páginas</p>
                
                {
                    userType != "admin" &&
                    <Link href="/Map">                    
                        <a className={router.pathname == "/Map" ? styles.active : ""}>
                            <img width="25px" src="icons/location.svg" alt="Localização" />
                            Mapa
                        </a>
                    </Link> 
                }

                {
                    userType != "admin" &&
                    <Link href="/Reports">
                        <a className={router.pathname == "/Reports" ? styles.active : ""}>
                            <img width="25px" src="icons/docs.svg" alt="Documentos" />
                            Relatórios
                        </a>
                    </Link> 
                }

                {
                    userType != "admin" &&
                    <Link href="/System">
                        <a className={router.pathname == "/System" ? styles.active : ""}>
                            <img width="25px" src="icons/menu.svg" alt="Menu" />
                            Sistema
                        </a>
                    </Link> 
                }

                {
                    userType != "atendente" && 
                    <Link href="/Campi">
                        <a className={router.pathname == "/Campi" ? styles.active : ""}>
                            <img width="25px" src="icons/campi.svg" alt="Campi" />
                            Campi
                        </a>
                    </Link> 
                }
                
            </div>
            
        </div>
    )

}