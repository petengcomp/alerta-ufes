import React from "react";
import { jsPDF } from "jspdf";
import styles from '../../../styles/components/Report/Generatepdf.module.css'

export function Generatepdf(props){
    const generatePdf = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        const canvas = document.getElementsByTagName("canvas")[0];
        if (canvas) {
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");

            doc.addImage(pngUrl, doc.internal.pageSize.width/5, 60, 120, 80);
        }
        doc.setFontSize(20);
        doc.setFont("Roboto", "none", "bold");
        doc.text("Relatório", doc.internal.pageSize.width/2, 20, null, null, 'center');
        doc.setFontSize(18);
        doc.text("Gráfico do total de alertas por categoria", doc.internal.pageSize.width/2, 40, null, null, 'center');
        doc.addPage();
        doc.setFontSize(14);
        doc.setFont("Roboto", "none", 500);
        props.alerts.map((alert, index)=>{
            if(index !== 0 && index % 2 === 0){
                doc.addPage();
            }
            doc.text(`${JSON.stringify(alert).replaceAll(',', ',\n')}`, 20, 20+(index%2)*100, null, null);

        });

        doc.save(`${props.title}.pdf`);
    
    };

    return(
        <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={generatePdf}>Gerar PDF</button>
        </div>
    )
}