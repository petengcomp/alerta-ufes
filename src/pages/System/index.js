import { Header } from '../../components/Header';
import { Categories } from '../../components/System/Categories';
import { Delete } from '../../components/System/Delete';
import { QuickAnswers } from '../../components/System/QuickAnswers';
import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/System.module.css';
import { useContext } from 'react';
import { SystemContext } from '../../contexts/SystemContexts';
import { Edit } from '../../components/System/Edit';


export default function System() {
  
  const { 
    isEditCategories,
    isEditAnswer,
    isDeleteCategories,
    isDeleteAnswer,
  } = useContext(SystemContext)

  return (
    <div className={globalStyles.container}>
      <Header 
        title="Sistema"
        description="Gerenciamento de categorias e respostas rápidas"
      />

      {isDeleteCategories && <Delete type="categoria"/>}
      {isEditCategories && <Edit type="categoria"/>}

      {isDeleteAnswer && <Delete type="resposta"/>}
      {isEditAnswer && <Edit type="resposta"/>}
      

      <div className={styles.systemCards}>
        <Categories />
        <QuickAnswers />  
      </div>
      
    </div>
  )
}
  