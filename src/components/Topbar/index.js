import { useContext } from 'react';
import { TopbarContext } from '../../contexts/TopbarContexts';
import styles from '../../styles/components/Topbar.module.css';
import { AlertInfoContext } from '../../contexts/AlertInfoContexts';

export function Topbar(){
    const {  
        qtdAlerts 
    } = useContext(AlertInfoContext)

    const { 
        showNotification,
        LogoutProfile,
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
                width="30px" 
                src="icons/log-out.svg" 
                alt="Logout" 
                onClick={LogoutProfile}
            />
        </div>
    )

}