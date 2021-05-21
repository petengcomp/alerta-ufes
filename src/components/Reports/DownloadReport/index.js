import styles from '../../../styles/components/Report/DownloadReport.module.css';
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import React, {useState} from 'react';

export function DownloadReport() {
    const [marked1, setMarked1] = useState(false);
    const [marked2, setMarked2] = useState(false);
    const [marked3, setMarked3] = useState(false);
    const [marked4, setMarked4] = useState(false);
    
    return (
        <div className={styles.card}>
            <text className={styles.title}>Baixar Relatório</text>
            <div className={styles.invisibleBox}>
                <div className={styles.firstColumn}>
                    <text className={styles.firstColumnText}>CATEGORIA</text>
                    <select className={styles.firstColumnField}>
                        <option value="furto">FURTO</option>
                    </select>
                    <text className={styles.firstColumnText}>RESPOSTA RAPIDA</text>
                    <select className={styles.firstColumnField}>
                        <option value="a caminho">ESTAMOS A CAMINHO</option>
                    </select>
                    <text className={styles.firstColumnText}>DATA DE INICIO</text>
                    <input className={styles.firstColumnField}></input>
                    <text className={styles.firstColumnText}>DATA DE FIM</text>
                    <input className={styles.firstColumnField}></input>
                </div>
                <div className={styles.secondColumn}>
                    <div onClick={()=>setMarked1(!marked1)} >
                        {marked1 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <text className={styles.secondColumnText}>Todas as categorias</text>
                    </div>
                    <div onClick={()=>setMarked2(!marked2)}>
                        {marked2 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <text className={styles.secondColumnText}>Todas as respostas</text>
                    </div>
                    <div onClick={()=>setMarked3(!marked3)}>
                        {marked3 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <text className={styles.secondColumnText}>Todas as datas</text>
                    </div>
                    <div onClick={()=>setMarked4(!marked4)}>
                        {marked4 ? <MdCheckBox className={styles.icon}></MdCheckBox> : <MdCheckBoxOutlineBlank className={styles.icon}></MdCheckBoxOutlineBlank>}
                        <text className={styles.secondColumnText}>Data atual</text>
                    </div>
                </div>
            </div>
            <button className={styles.button}><text className={styles.buttonText}>BAIXAR</text></button>
        </div>
    )
}