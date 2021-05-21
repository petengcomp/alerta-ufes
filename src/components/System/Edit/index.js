import { useContext } from 'react';
import { SystemContext } from '../../../contexts/SystemContexts';
import styles from '../../../styles/components/System/Edit.module.css';

export function Edit(props){
    const { 
        showEditCategories,
        showEditAnswer,
    } = useContext(SystemContext)

    return(
        <div className={styles.editContainer}>      
            {props.type === "categoria" ? <h1>EDITAR CATEGORIA</h1> : <h1>EDITAR RESPOSTA</h1>}

            <div className={styles.editInput}>
                {props.type === "categoria" ? <h5>CATEGORIA</h5> : <h5>RESPOSTA RÁPIDA</h5>}
                <input defaultValue="ROUBO"></input>    
            </div>

            <div className={styles.editButtons}>
                <button className={styles.editButtonCancel} 
                    onClick={props.type === "categoria" ? showEditCategories: showEditAnswer}>
                    <h3 >CANCELAR</h3>
                </button>
                <button className={styles.editButtonSave} 
                    onClick={props.type === "categoria" ? showEditCategories: showEditAnswer}>
                    <h3>SALVAR</h3>
                </button>
            </div>
        </div>
    )

}