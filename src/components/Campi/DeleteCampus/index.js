import { useContext } from 'react';
import { CampiContext } from '../../../contexts/CampiContexts';
import styles from '../../../styles/components/Campi/Delete.module.css';

export function DeleteCampus(props){
    const { 
        showDeleteCampus
    } = useContext(CampiContext)

    return(
        <div className={styles.deleteContainer}>      
            <h1>EXCLUIR CAMPUS</h1>
            <h4>Você está prestes à excluir um campus e todas as informações dele, está certo disso?</h4> 

            <div className={styles.deleteButtons}>
                <button className={styles.deleteButtonCancel} onClick={showDeleteCampus}>
                    <h3>CANCELAR</h3>
                </button>
                <button className={styles.deleteButtonSave} onClick={showDeleteCampus}>
                    <h3>EXCLUIR</h3>
                </button>
            </div>
        </div>
    )

}