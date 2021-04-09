import { useContext } from 'react';
import { AlertInfoContext } from '../../../contexts/AlertInfoContexts';
import styles from '../../../styles/components/Map/RecentAlert.module.css';

export function RecentAlert(){
    const { 
        showNotAnswered,
    } = useContext(AlertInfoContext)

    return(
        <div className={styles.recentAlertContainer}>
            <div className={styles.recentAlertTop}>
                Alertas não finalizados
            </div>
            <div className={styles.recentAlertInfo}>
                <div onClick={showNotAnswered}>
                   <img width="30px" src="icons/pin-red.svg" alt="Pino vermelho" />
                    5min atrás 
                </div>

                <div>
                   <img width="30px" src="icons/pin-yellow.svg" alt="Pino vermelho" />
                    7min atrás 
                </div>

                <div>
                   <img width="30px" src="icons/pin-yellow.svg" alt="Pino vermelho" />
                    10min atrás 
                </div>

                <div>
                   <img width="30px" src="icons/pin-yellow.svg" alt="Pino vermelho" />
                    20min atrás 
                </div>
                
            </div>
            
        </div>
    )

}