import { useContext } from 'react';
import { SystemContext } from '../../../contexts/SystemContexts';
import styles from '../../../styles/components/System/Delete.module.css';

export function Delete(props){
    const { 
        showDeleteCategories,
        showDeleteAnswer
    } = useContext(SystemContext)

    return(
        <div className={styles.deleteContainer}>      
            {props.type === "categoria" ? <h1>EXCLUIR CATEGORIA</h1> : <h1>EXCLUIR RESPOSTA</h1> }
            
            {props.type === "categoria" ? 
                <h4>Você está prestes à excluir uma categoria, está certo disso?</h4> :
                <h4>Você está prestes à excluir uma resposta rápida, está certo disso?</h4>         
            }

            <div className={styles.deleteButtons}>
                <button className={styles.deleteButtonCancel} 
                    onClick={props.type === "categoria" ? showDeleteCategories : showDeleteAnswer}>
                    <h3>CANCELAR</h3>
                </button>
                <button className={styles.deleteButtonSave} 
                    onClick={props.type === "categoria" ? showDeleteCategories : showDeleteAnswer}>
                    <h3>EXCLUIR</h3>
                </button>
            </div>
        </div>
    )

}