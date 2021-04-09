import { useContext } from 'react';
import { AlertInfoContext } from '../../../contexts/AlertInfoContexts';
import styles from '../../../styles/components/Map/NotAnswered.module.css';

export function NotAnswered(){
    const { 
        showNotAnswered,
    } = useContext(AlertInfoContext)

    return(
        <div className={styles.notAnsweredContainer}>      
            <h1>NÃO ATENDIDO</h1> 
            <h3>Henrique Paulino Cruz</h3>     
            <h3>(28) 99972-0210</h3>

            <h5>RESPOSTA RÁPIDA</h5>

            <div className={styles.notAnsweredButtons}>
                <button className={styles.notAnsweredButtonCancel} onClick={showNotAnswered}>
                    <h3 >CANCELAR</h3>
                </button>
                <button className={styles.notAnsweredButtonSave} onClick={showNotAnswered}>
                    <h3>SALVAR</h3>
                </button>
            </div>
        </div>
    )

}