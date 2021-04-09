import { Header } from '../../components/Header';
import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/Campi.module.css'
import { CampiRegistered } from '../../components/Campi/CampiRegistered'

export default function Campi() {
  return (
    <div className={globalStyles.container}>
      <Header
        title="Campi"
        description="Gerenciamento de campi e usuários atendentes"
      />
      <div className={styles.registeredCard}>
        <CampiRegistered />
      </div>
      
    </div>
  )
}
  