import { Header } from '../../components/Header';
import { GraphicReport } from '../../components/Reports/GraphicReport';
import { DownloadReport } from '../../components/Reports/DownloadReport';
import { AlertReport } from '../../components/Reports/AlertReport';

import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/Reports.module.css';

export default function Reports() {
  return (
    <div className={globalStyles.container}>
      <Header 
        title="Relatórios"
        description="Visualização gráfica e tabelada de todos os alertas emitidos"
      />
      <div className={styles.reportsBox}>
        <div className={styles.firstLine}>
          <GraphicReport/>
          <DownloadReport/>
        </div>
        <AlertReport/>
      </div>
    </div>
  )
}
