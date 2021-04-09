import styles from '../../../styles/components/System/QuickAnswers.module.css';

export function QuickAnswers(){
    return(
        <div className={styles.quickanswersContainer}>
            <h1>Respostas Rápidas</h1>
            <div className={styles.quickanswersTop}>
                <div className={styles.quickanswersSearch}>
                    <label>Categoria</label>
                    <input defaultValue="ESTAMOS À CAMINHO"></input>
                    <select id="categorias" name="categorias">
                        <option value="Resposta rápida1">Resposta rápida1</option>
                        <option value="Resposta rápida2">Resposta rápida2</option>
                        <option value="Resposta rápida3">Resposta rápida3</option>
                        <option value="Resposta rápida4">Resposta rápida4</option>
                    </select>
                </div>
                <button className={styles.quickanswersButton}>Adicionar</button>
            </div>
            <div className={styles.quickanswersActionBox}>
                <div className={styles.quickanswersActionBoxTitle}>
                    <h3>Nome</h3>
                    <h3>Ações</h3>
                </div>
                <div className={styles.quickanswersActionArea}>
                    <h4>Resposta rápida1</h4>
                    <div className={styles.quickanswersActionAreaButtons}>
                        <button className={styles.quickanswersButtonEdit}>EDITAR</button>
                        <button className={styles.quickanswersButtonDelete}>EXCLUIR</button>
                    </div>
                </div>
                <div className={styles.quickanswersActionArea}>
                    <h4>Resposta rápida2</h4>
                    <div className={styles.quickanswersActionAreaButtons}>
                        <button className={styles.quickanswersButtonEdit}>EDITAR</button>
                        <button className={styles.quickanswersButtonDelete}>EXCLUIR</button>
                    </div>
                </div>
                <div className={styles.quickanswersActionArea}>
                    <h4>Resposta rápida3</h4>
                    <div className={styles.quickanswersActionAreaButtons}>
                        <button className={styles.quickanswersButtonEdit}>EDITAR</button>
                        <button className={styles.quickanswersButtonDelete}>EXCLUIR</button>
                    </div>
                </div>
                <div className={styles.quickanswersActionArea}>
                    <h4>Resposta rápida4</h4>
                    <div className={styles.quickanswersActionAreaButtons}>
                        <button className={styles.quickanswersButtonEdit}>EDITAR</button>
                        <button className={styles.quickanswersButtonDelete}>EXCLUIR</button>
                    </div>
                </div>
            </div>
        </div>
    )

}