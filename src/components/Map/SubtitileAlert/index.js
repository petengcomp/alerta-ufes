import styles from '../../../styles/components/Map/SubtitleAlert.module.css';

export function SubtitleAlert(){
    return(
        <div className={styles.SubtitleAlertContainer}>
            <div className={styles.SubtitleAlertInfo}>
                <img width="160px" src="icons/alert-finished.svg" alt="Alerta finalizado" />
                <img width="160px" src="icons/alert-answered.svg" alt="Alerta respondido" />
                <img width="160px" src="icons/alert-not-answered.svg" alt="Alerta não respondido" />
            </div>
        </div>
    )

}