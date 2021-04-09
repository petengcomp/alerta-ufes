import styles from '../../styles/components/TabNavigator.module.css';
import Link from 'next/link';
import { useRouter } from "next/router";

export function TabNavigator(){
    const router = useRouter();

    return(
        <div className={styles.tabNavigatorContainer}>
            <div className={styles.tabNavigatorTopbar}>
                <img width="170px" src="icons/logo.svg" alt="Notificação" />
            </div>
            <div className={styles.tabNavigatorPages}>
               <p className={styles.tabNavigatorTitles}>Páginas</p>
                
                <Link href="/Map">                    
                    <a className={router.pathname == "/Map" ? styles.active : ""}>
                        <img width="25px" src="icons/location.svg" alt="Localização" />
                        Mapa
                    </a>
                </Link> 
                

                <Link href="/Reports">
                    <a className={router.pathname == "/Reports" ? styles.active : ""}>
                        <img width="25px" src="icons/docs.svg" alt="Documentos" />
                        Relatórios
                    </a>
                </Link> 

                <Link href="/System">
                    <a className={router.pathname == "/System" ? styles.active : ""}>
                        <img width="25px" src="icons/menu.svg" alt="Menu" />
                        Sistema
                    </a>
                </Link> 

                <Link href="/Campi">
                    <a className={router.pathname == "/Campi" ? styles.active : ""}>
                        <img width="25px" src="icons/campi.svg" alt="Campi" />
                        Campi
                    </a>
                </Link> 
            </div>
            
        </div>
    )

}