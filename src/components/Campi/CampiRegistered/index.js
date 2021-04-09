import styles from '../../../styles/components/Campi/CampiRegistered.module.css';

export function CampiRegistered(){
    return(
        <div className={styles.campiregisteredContainer}>
            
            <div className={styles.campiregisteredTop}>
                <h1>Campi Cadastrados</h1>
                <button className={styles.campiregisteredButton}>Cadastrar Campus</button>
            </div>
            <div className={styles.campiregisteredActionBox}>
                <div className={styles.campiregisteredActionBoxTitle}>
                    <h3>Nome</h3>
                    <h3>Quantidade de atendentes</h3>
                    <h3>Ações</h3>
                </div>
                <div className={styles.campiregisteredActionArea}>
                    <h4>Campus 1</h4>
                    <h4>5</h4>
                    <div className={styles.campiregisteredActionAreaButtons}>
                        <button className={styles.campiregisteredButtonEdit}>EDITAR</button>
                        <button className={styles.campiregisteredButtonDelete}>EXCLUIR</button>
                        <button className={styles.campiregisteredButtonAttendant}>ATENDENTES</button>
                    </div>
                </div>
                <div className={styles.campiregisteredActionArea}>
                    <h4>Campus 2</h4>
                    <h4>12</h4>
                    <div className={styles.campiregisteredActionAreaButtons}>
                        <button className={styles.campiregisteredButtonEdit}>EDITAR</button>
                        <button className={styles.campiregisteredButtonDelete}>EXCLUIR</button>
                        <button className={styles.campiregisteredButtonAttendant}>ATENDENTES</button>
                    </div>
                </div>
                <div className={styles.campiregisteredActionArea}>
                    <h4>Campus 3</h4>
                    <h4>22</h4>
                    <div className={styles.campiregisteredActionAreaButtons}>
                        <button className={styles.campiregisteredButtonEdit}>EDITAR</button>
                        <button className={styles.campiregisteredButtonDelete}>EXCLUIR</button>
                        <button className={styles.campiregisteredButtonAttendant}>ATENDENTES</button>
                    </div>
                </div>
                <div className={styles.campiregisteredActionArea}>
                    <h4>Campus 4</h4>
                    <h4>4</h4>
                    <div className={styles.campiregisteredActionAreaButtons}>
                        <button className={styles.campiregisteredButtonEdit}>EDITAR</button>
                        <button className={styles.campiregisteredButtonDelete}>EXCLUIR</button>
                        <button className={styles.campiregisteredButtonAttendant}>ATENDENTES</button>
                    </div>
                </div>

                <div className={styles.campiregisteredActionArea}>
                    <h4>Campus 5</h4>
                    <h4>0</h4>
                    <div className={styles.campiregisteredActionAreaButtons}>
                        <button className={styles.campiregisteredButtonEdit}>EDITAR</button>
                        <button className={styles.campiregisteredButtonDelete}>EXCLUIR</button>
                        <button className={styles.campiregisteredButtonAttendant}>ATENDENTES</button>
                    </div>
                </div>
            </div>
        </div>
    )

}