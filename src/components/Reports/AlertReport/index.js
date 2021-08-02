import styles from '../../../styles/components/Report/AlertReport.module.css';
import { useState, useEffect, useDebugValue } from 'react'
import api from '../../../services/api';
import moment from 'moment';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

import format from 'telefone/format';

import Swal from 'sweetalert2';

export function AlertReport(props) {

    const [nRows, setNRows] = useState(5);
    const [page, setPage] = useState(0);
    const [alertList, setAlertList] = useState([]);
    const [limitedAlertList, setlimitedAlertList] = useState([]);
    const [fixedAlertList, setFixedAlertList] = useState([]);  // salvar a lista inteira
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    function handleClickView(alerta){
        let status;
        if(alerta.status === 'não respondido')
            status = "styles.naorespondido"
        if(alerta.status === 'respondido')
            status = "styles.respondido"
        if(alerta.status === 'finalizado')
            status = "styles.final"
        
        console.log(status)
        Swal.fire({  
            html:
                `<div>`+
                    `<strong>${alerta.status}</strong>`+      
                    `<h2 id="swal-input1" type="text" placeholder="">${alerta.requester.login}</h2>` +
                    `<h2 id="swal-input1" type="text" placeholder="">${format(alerta.requester.cellphone)}</h2>` +
                    '<span>' +
                        '<label>RESPOSTA RÁPIDA</label>'+
                        '<p>'+  
                            `${alerta.feedback? alerta.feedback.name : "-"}`+    
                        '</p>'+   
                    '</span>' +
                    '<span>' +
                        '<label>CATEGORIAS</label>'+
                        '<p>'+  
                            `${alerta.category? alerta.category.name : "-"}`+    
                        '</p>'+  
                    '</span>' +
                    '<span>' +
                        '<label>DESCRIÇÃO</label>'+
                        `<p>${alerta.description? alerta.description : "-"}</p>`+   
                    '</span>' +
                `<div>`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            customClass: `${styles.finalizado} ${alerta.status === "não respondido"? styles.naorespondido : alerta.status === "respondido" && styles.respondido}`,
            focusConfirm: false,
            confirmButtonColor: '#FFF',
            confirmButtonText:'FECHAR',           
        })
    }

    async function getAlerts() {
        let token;
        let id;

        if (typeof window !== "undefined") {

            id = localStorage.getItem("ALERTAUFESuserCampusId");
            token = localStorage.getItem("ALERTAUFESuserToken");
            
        }
        try {
            const response = await api.get(`v1/campi/alerts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let aux = response.data.alerts;
            // aux.sort((a, b)=>{
                
            //     let ast = a.status;
            //     let av = 0;
            //     let bst = b.status;
            //     let bv = 0;
            //     if(ast === "finalizado"){
            //         av = 3;
            //     }else if(ast === "respondido"){
            //         av = 2;
            //     }else if(ast === "não respondido"){
            //         av = 1;
            //     }
            //     if(bst === "finalizado"){
            //         bv = 3;
            //     }else if(ast === "respondido"){
            //         bv = 2;
            //     }else if (bst === "não respondido"){
            //         bv = 1;
            //     }
            //     return av-bv;
            // });
            console.log(aux);
            setFixedAlertList(aux);
            setAlertList(aux);
            setlimitedAlertList(aux.slice(nRows*page, nRows*(page+1)));
        }
        catch (err) {
            console.log(err);
        }
    }

    function changePage(num){
        if(num === -1 && page === 0){
            return;
        }
        if(num === 1 && (page+1)*nRows > alertList.length){
            return;
        };
        const newPage = page+num;
        setPage(newPage);
        setlimitedAlertList(alertList.slice(nRows*newPage, nRows*(newPage+1)));
    }

    function changeNRows(event){
        let value = event.target.value;
        setNRows(value);
        setlimitedAlertList(alertList.slice(value*page, value*(page+1)));
    }

    useEffect(async () => {
        await getAlerts();
    }, []);

    function filterBydate(){
        if(props.startDate === '' && props.endDate === ''){
            console.log("AEO0");
            console.log(fixedAlertList);
            setAlertList(fixedAlertList);
            setlimitedAlertList(fixedAlertList.slice(nRows*page, nRows*(page+1)));
            return;
        }
        const auxArray = fixedAlertList.filter((alert, index)=>{
            return (moment(alert.createdAt).isAfter(props.startDate, "DD-MM-YYYY") && moment(alert.createdAt).isBefore(props.endDate, "DD-MM-YYYY"));
        })
        console.log(auxArray);
        setAlertList(auxArray);
        setlimitedAlertList(auxArray.slice(nRows*page, nRows*(page+1)));
    }

    useEffect(async ()=>{
        setEnd(props.endDate);
        setStart(props.startDate);
        filterBydate();
    }, [props.startDate, props.endDate]);


    return (
        <div className={styles.card}>
            <p className={styles.title}>Alertas</p>
            <div className={styles.grid}>
                <div className={styles.header}>
                    <p>Usuário</p>
                    <p>Data de Emissão</p>
                    <p>Data Finalizado</p>
                    <p>Status</p>
                    <p>Ações</p>
                </div>
                {(limitedAlertList).map((alert, index)=>{return (
                    <div key={index} className={styles.row}>
                        <p className={styles.rowText}>{alert.requester.login}</p>
                        <p className={styles.rowText}>{moment(alert.createdAt).format("DD/MM/YYYY")}</p>
                        <p className={styles.rowText}>{alert.status !== "finalizado"? "-" :moment(alert.updatedAt).format("DD/MM/YYYY")}</p>
                        <div className={styles.rowCell}><div className={styles.status}>{alert.status==="finalizado"? 
                            <div className={styles.finished} >FINALIZADO</div>:
                            alert.status==="respondido"? 
                                <div className={styles.answered}>RESPONDIDO</div>:
                                <div className={styles.waiting}>AGUARDANDO</div>
                        }</div></div>
                        <div className={styles.rowCell}><div className={styles.status}>{
                            <button onClick={() => handleClickView(alert)} className={styles.button} >VISUALIZAR</button>
                        }</div></div>
                    </div>)})}
            </div>
            <div className={styles.tableFooter}>
                <div >
                    <p>Linhas por página:</p>
                    <select onChange={(e)=>changeNRows(e)} defaultValue={5}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div >
                    <p>{`${(1+(page*nRows))}-${((page+1)*nRows)>alertList.length?alertList.length:(page+1)*nRows} de ${alertList.length} alertas`}</p>
                    <div className={styles.footerButton} onClick={()=>changePage(-1)}>
                        <MdChevronLeft  size={32}/>
                    </div>
                    <div className={styles.footerButton} onClick={()=>changePage(1)}>
                        <MdChevronRight size={32}/>
                    </div>
                </div>
            </div>

        </div>
    )

}