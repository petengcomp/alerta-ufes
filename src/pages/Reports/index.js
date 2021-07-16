import React,{useState} from 'react';
import { Header } from '../../components/Header';
import { GraphicReport } from '../../components/Reports/GraphicReport';
import { DownloadReport } from '../../components/Reports/DownloadReport';
import { AlertReport } from '../../components/Reports/AlertReport';
import {Scrollbars} from 'react-custom-scrollbars-2'
import globalStyles from '../../styles/pages/Global.module.css';
import styles from '../../styles/pages/Reports.module.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../../services/api';

export default function Reports() {
  const [dateInitial,SetDateInitial] = useState('');
  const [dateFinal,SetDateFinal] = useState('');

  const MySwal = withReactContent(Swal);

  async function handleClickInterval(){
    let formValues = [];
    await MySwal.fire({  
      html:<div>
              <strong>INTERVALO DE DATAS</strong>     
              <span>
                  <label>DATA DE INÍCIO</label>
                  <input placeholder={dateInitial==''? "dd/mm/aaaa": dateInitial} type="date" id="dateInitial"></input>
              </span> 
              <span>  
                  <label>DATA DE FIM</label>
                  <input placeholder={dateFinal==''? "dd/mm/aaaa": dateFinal} type="date" id="dateFinal"></input>
              </span>
              
          </div>,
      background: '#EBEFF2',
      backdrop: 'rgba(0,0,0,0.7)',
      customClass: `${styles.intervalModal}`,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#345580',
      cancelButtonColor: '#FFF',
      confirmButtonText:'SALVAR',
      cancelButtonText:'CANCELAR',
      preConfirm: () => {
        formValues[0] = document.getElementById('dateInitial').value
        formValues[1] = document.getElementById('dateFinal').value
      }          
    }).then( async (value) => {
      if (value.isConfirmed) {
          SetDateInitial(formValues[0]);
          SetDateFinal(formValues[1]);
      }
  }) 
  }

  function Interval(){
    return(<button onClick={() => handleClickInterval()} className={styles.intervalButton}>SELECIONAR INTERVALO</button>)
  }

  return (
    <div className={globalStyles.container}>
      <Header 
        title="Relatórios"
        description="Visualização gráfica e tabelada de todos os alertas emitidos"
        child={<Interval/>}
      />
      <Scrollbars style={{width:"100%", height:"100%"}} >
        <div  className={styles.reportsBox}>
            <div className={styles.firstLine}>
              <GraphicReport/>
              <DownloadReport/>
            </div>
            <AlertReport startDate={dateInitial} endDate={dateFinal} />
        </div>
      </Scrollbars>
    </div>
  )
}
