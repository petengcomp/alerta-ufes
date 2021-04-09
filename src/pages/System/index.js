import { Header } from '../../components/Header';
import { Categories } from '../../components/System/Categories';
import { QuickAnswers } from '../../components/System/QuickAnswers';
import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/System.module.css';

export default function System() {
  return (
    <div className={globalStyles.container}>
      <Header 
        title="Sistema"
        description="Gerenciamento de categorias e respostas rápidas"
      />

      <div className={styles.systemCards}>
        <Categories />
        <QuickAnswers />  
      </div>
      
    </div>
  )
}
  