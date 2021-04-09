import { Header } from '../../components/Header';
import globalStyles from '../../styles/pages/Global.module.css';

export default function Reports() {
  return (
    <div className={globalStyles.container}>
      <Header 
        title="Relatórios"
        description="Visualização gráfica e tabelada de todos os alertas emitidos"
      />
    </div>
  )
}
