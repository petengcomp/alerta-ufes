import styles from '../../../styles/components/Report/DownloadReport.module.css';
import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import { jsPDF } from "jspdf";

import moment from 'moment';

export function DownloadReport() {
    const [alertList, setAlertList] = useState([]);
    const [limitedAlertList, setlimitedAlertList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [resposta, setResposta] = useState('');
    const [categoria, setCategoria] = useState('');
    const [toDownload, setToDownload] = useState([]);



    async function getCategories() {
        let token;
        let id;

        if (typeof window !== "undefined") {

            id = localStorage.getItem("ALERTAUFESuserCampusId");
            token = localStorage.getItem("ALERTAUFESuserToken");
            
        }
        try {
            const response = await api.get(`v1/campi/categories/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }});
            setCategories(response.data.categories);
        }
        catch (err) {
            console.log(err);
        }
    }


    async function getFeedbacks() {
        let token;
        let id;

        if (typeof window !== "undefined") {

            id = localStorage.getItem("ALERTAUFESuserCampusId");
            token = localStorage.getItem("ALERTAUFESuserToken");
            
        }
        try {
            const response = await api.get(`v1/campi/feedbacks/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }});
            setFeedbacks(response.data.feedbacks);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(async () => {
        await getCategories();
        await getFeedbacks();
        await getAlerts();
    }, [])

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
            setAlertList(aux);
            setlimitedAlertList(aux);
        }
        catch (err) {
            console.log(err);
        }
    }


    async function getReportInfo(){
        let token;
        let id;
        let string_categoria = `${categoria === ''? '': 'category_id='+ categoria}`;
        let string_resposta = `${resposta === ''? '': 'feedback_id='+ resposta}`;
        let string_inicio = `${startDate === ''? '': 'initial_period='+ moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS")+'Z'}`;
        let string_final = `${endDate === ''? '': 'final_period='+ moment(endDate).format("YYYY-MM-DDTHH:mm:ss.SSS")+'Z'}`;

        let string = `${string_inicio}${(string_inicio !== '') && (string_final !== '' || string_categoria!=='' || string_resposta !== '' ) ? '&': ''}${string_categoria}${(string_categoria !== '') && (string_final !== '' || string_resposta !== '')? '&': ''}${string_resposta}${(string_resposta !== '') && (string_final !== '') ? '&': ''}${string_final}`
        
        if (typeof window !== "undefined") {

            id = localStorage.getItem("ALERTAUFESuserCampusId");
            token = localStorage.getItem("ALERTAUFESuserToken");
            
        }

        try {
            const response = await api.get(`v1/campi/reports/${id}${string !== ''? '?'+ string: ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(string);
            console.log(response.data);
            setToDownload(response.data);
        }
        catch (err) {
            console.log(err);
        }

    }

    const generatePdf = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF({
            orientation: "landscape"
        });

        const canvas = document.getElementsByTagName("canvas")[0];
        if (canvas) {
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");

                doc.addImage(pngUrl, doc.internal.pageSize.width/6, doc.internal.pageSize.height/5, 200, 160);
        }
        doc.setFontSize(20);
        doc.setFont("Roboto", "none", "bold");
        doc.text("Relatório", doc.internal.pageSize.width/2, 20, null, null, 'center');
        doc.setFontSize(18);
        doc.text("Gráfico do total de alertas por categoria", doc.internal.pageSize.width/2, 40, null, null, 'center');

        doc.setFontSize(14);
        doc.setFont("Roboto", "none", 500);
        toDownload.map((alert, index)=>{
            if(index % 50 === 0){
                doc.addPage("a4", "portrait");
            }
            doc.text(`${alert.responser.login}  ${alert.requester.login}  ${alert.feedback!==null?alert.feedback.name:"---------------"}  ${alert.category!==null? alert.category.name: "--------------"}  ${alert.status}  ${moment(alert.data).format("DD/MM/YYYY")}`, 20, 20+(index%50)*10, null, null);

        });

        doc.save(`Relatório.pdf`);
    
    };

    const clickFunction= () => {
        getReportInfo();
        generatePdf();
    }


    return (
        <div className={styles.card}>
            <p className={styles.title}>Baixar Relatório</p>
            <div className={styles.invisibleBox}>
                <div className={styles.firstColumn}>
                    <label className={styles.firstColumnText}>CATEGORIA</label>
                    <select value={categoria} className={styles.firstColumnField} onChange={e => {setCategoria(e.target.value)}}>
                        <option value="">Escolha uma Categoria</option>
                        {/* {categories && categories.map((category, index) => { return <option key={index} value={category} >{category}</option> })} */}
                        {(categories).map((category, index) =>
                            <option key={index} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    <label className={styles.firstColumnText}>RESPOSTA RAPIDA</label>
                    <select value={resposta} onChange={e => setResposta(e.target.value)} className={styles.firstColumnField}>
                        <option value="">Escolha uma resposta</option>
                        {/* {feedbacks && feedbacks.map((feedback, index) => { return <option key={index} value={feedback} >{feedback}</option> })} */}
                        {(feedbacks).map((feedback, index) =>
                            <option key={index} value={feedback.id}>{feedback.name}</option>
                        )}
                    </select>
                    <label className={styles.firstColumnText}>DATA DE INICIO</label>
                    <input className={styles.firstColumnField} value={startDate} type="date" onChange={e=> setStartDate(e.target.value)}></input>
                    <label className={styles.firstColumnText}>DATA DE FIM</label>
                    <input className={styles.firstColumnField} value={endDate} type="date" onChange={e=> setEndDate(e.target.value)} ></input>
                </div>
            </div>
            <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={clickFunction}>Gerar PDF</button>
        </div>
            {/* <Generatepdf title="Relatorio" alerts={limitedAlertList} /> */}
        </div>
    )
}