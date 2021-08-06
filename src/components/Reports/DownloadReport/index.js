import styles from '../../../styles/components/Report/DownloadReport.module.css';
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import React, { useState, useEffect } from 'react';
import api from '../../../services/api'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import {Generatepdf} from '../GeneratePdf'

export function DownloadReport() {

    const [marked1, setMarked1] = useState(false);
    const [marked2, setMarked2] = useState(false);
    const [marked3, setMarked3] = useState(false);
    const [marked4, setMarked4] = useState(false); // Marcado se quiser a data atual
    const [categories, setCategories] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);

    const pdfStyles = StyleSheet.create({
        page: {
          flexDirection: 'row',
          backgroundColor: '#E4E4E4'
        },
        section: {
          margin: 10,
          padding: 10,
          flexGrow: 1
        }
      });
      

    const MyDocument = () =>{
        return(<Document >
            <Page size="A4" style={pdfStyles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
                </Page>
           
        </Document>);
    }

    function PDF(){
        return(<PDFViewer id="PDF">
            <MyDocument/>
        </PDFViewer>);
    }

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

    }, [])

    return (
        <div className={styles.card}>
            <p className={styles.title}>Baixar Relatório</p>
            <div className={styles.invisibleBox}>
                <div className={styles.firstColumn}>
                    <label className={styles.firstColumnText}>CATEGORIA</label>
                    <select className={styles.firstColumnField}>
                        <option value="">Escolha uma Categoria</option>
                        {/* {categories && categories.map((category, index) => { return <option key={index} value={category} >{category}</option> })} */}
                        {(categories).map((category, index) =>
                            <option key={index} value={category.name}>{category.name}</option>
                        )}
                    </select>
                    <label className={styles.firstColumnText}>RESPOSTA RAPIDA</label>
                    <select className={styles.firstColumnField}>
                        <option value="">Escolha uma resposta</option>
                        {/* {feedbacks && feedbacks.map((feedback, index) => { return <option key={index} value={feedback} >{feedback}</option> })} */}
                        {(feedbacks).map((feedback, index) =>
                            <option key={index} value={feedback.name}>{feedback.name}</option>
                        )}
                    </select>
                    <label className={styles.firstColumnText}>DATA DE INICIO</label>
                    <input className={styles.firstColumnField} type="date" ></input>
                    <label className={styles.firstColumnText}>DATA DE FIM</label>
                    <input className={styles.firstColumnField} type="date" ></input>
                </div>
                {/* <div className={styles.secondColumn}>
                    <div onClick={() => setMarked1(!marked1)} >
                        {marked1 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <label className={styles.secondColumnText}>Todas as categorias</label>
                    </div>
                    <div onClick={() => setMarked2(!marked2)}>
                        {marked2 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <label className={styles.secondColumnText}>Todas as respostas</label>
                    </div>
                    <div onClick={() => setMarked3(!marked3)}>
                        {marked3 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <label className={styles.secondColumnText}>Todas as datas</label>
                    </div>
                    <div onClick={() => setMarked4(!marked4)}>
                        {marked4 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <label className={styles.secondColumnText}>Data atual</label>
                    </div>
                </div> */}
            </div>
            <Generatepdf title="Relatorio" />
        </div>
    )
}