import { Header } from '../../components/Header';
import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/Campi.module.css'
import { CampiRegistered } from '../../components/Campi/CampiRegistered'
import { DeleteCampus } from '../../components/Campi/DeleteCampus';
import { useContext } from 'react';
import { CampiContext } from '../../contexts/CampiContexts';

export default function Campi() {
  const { 
    isDeleteCampus,
  } = useContext(CampiContext)

  return (
    <div className={globalStyles.container}>
      <Header
        title="Campi"
        description="Gerenciamento de campi e usuários atendentes"
      />
      <div className={styles.registeredCard}>
        <CampiRegistered />
        {isDeleteCampus && <DeleteCampus />}
      </div>
      
    </div>
  )
}
  