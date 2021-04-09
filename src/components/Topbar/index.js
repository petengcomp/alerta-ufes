import { useContext } from 'react';
import { TopbarContext } from '../../contexts/TopbarContexts';
import styles from '../../styles/components/Topbar.module.css';


export function Topbar(){
    const { 
        showNotification,
        showProfile,
    } = useContext(TopbarContext)

    return(
        <div className={styles.topbarContainer}>
            <img 
                width="30px" 
                src="icons/notification.svg" 
                alt="Notificação"   
                onClick={showNotification}
            />
            <img 
                width="70px" 
                src="icons/avatar.svg" 
                alt="Avatar" 
                onClick={showProfile}
            />
        </div>
    )

}