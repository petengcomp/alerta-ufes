import styles from '../../../styles/components/Report/AlertReport.module.css';

export function AlertReport(){
    return(
       <div className={styles.card}>
           <text className={styles.title}>Alertas</text>
           <div className={styles.grid}>
                <div className={styles.header}>
                    <text>Usuário</text>
                    <text>Data de Emissão</text>
                    <text>Data Finalizado</text>
                    <text>Status</text>
                    <text>Ações</text>
                </div>
                <div className={styles.row}>
                    <text>Fulano de tal</text>
                    <text>05/10/2019</text>
                    <text>05/10/2019</text>
                    <text>Status</text>
                    <text>Ações</text>
                </div>
           </div>

       </div>
    )

}