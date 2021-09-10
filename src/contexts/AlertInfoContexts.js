import { createContext, useState } from "react";

import Swal from 'sweetalert2';

import api from "../services/api";

import styles from '../styles/contexts/AlertInfo.module.css'

export const AlertInfoContext = createContext();

export function AlertInfoProvider({children}) {
    const [isNotAnswered, setIsNotAnswered] = useState(false);
    const [feedbacks, setFeedbacks] = useState([])
    const [categories, setCategories] = useState([])
    const [alerts, setAlerts] = useState([]);
    const [qtdAlerts, setQtdAlerts] = useState(0)

    function showNotAnswered() {
        setIsNotAnswered(!isNotAnswered);
    }

    function atualizaQtdAlerts(){  
        setQtdAlerts(alerts.length)        
    }

    async function getFeedbacks(){
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        let campusId = localStorage.getItem('ALERTAUFESuserCampusId');

        try{
            const response = await api.get(`v1/campi/feedbacks/${campusId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            setFeedbacks(response.data.feedbacks)
        }catch(err){
            console.log(err.message)
        }
    }

    async function getCategorias(){
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        let campusId = localStorage.getItem('ALERTAUFESuserCampusId');

        try{
            const response = await api.get(`v1/campi/categories/${campusId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            setCategories(response.data.categories)
        }catch(err){
            console.log(err.message)
        }
    }

    async function handleClickAlert(alerta){
        let formValues, formValues2, formValues3;
        let number;
        if(alerta.requester.cellphone === 10)
            number = `(${alerta.requester.cellphone.substring(0, 2)}) ${alerta.requester.cellphone.substring(2, 6)}-${alerta.requester.cellphone.substring(6, 11)}`;
        else
            number = `(${alerta.requester.cellphone.substring(0, 2)}) ${alerta.requester.cellphone.substring(2, 7)}-${alerta.requester.cellphone.substring(7, 12)}`;
        
        if(alerta.status == "não respondido"){
            await Swal.fire({  
                html:
                    `<div>`+
                        `<strong>${(alerta.status).toUpperCase()}</strong>`+      
                        `<h2 id="swal-input1" type="text" placeholder="">${alerta.requester.login}</h2>` +
                        `<h2 id="swal-input1" type="text" placeholder="">${number}</h2>` +
                        '<label>RESPOSTA RÁPIDA</label>'+
                        '<select id="select">'+
                            `${(feedbacks).map((feedback, index) => {return(
                                `<option key={${index}} value={${feedback.id}}>${(feedback.name).toUpperCase()}</option>`
                            )})} `+    
                        '</select>'+                          
                    `<div>`,
                background: '#EBEFF2',
                backdrop: 'rgba(0,0,0,0.7)',
                customClass: `${styles.naoRespondido}`,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonColor: '#345580',
                cancelButtonColor: '#FFF',
                confirmButtonText:'SALVAR',
                cancelButtonText:'CANCELAR',
                preConfirm: () => {
                    formValues = document.getElementById('select').value
                }
            }).then(async (value) => {
                if (value.isConfirmed) {
                    formValues = formValues.split("").filter(n => (Number(n) || n == 0)).join(""); 
                    
                    const id = localStorage.getItem('ALERTAUFESuserCampusId');
                    let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                    
                    try{
                        const response = await api.put(`/v1/alerts/${alerta.id}`,{
                            campus_id: id,
                            feedback_id: formValues,
                            requester_id: alerta.requester_id,
                            responser_id: 29, //! MIRELLY TIROU O OBRIGATORIO? NAO SEI, DEIXA ASISM
                            latitude: alerta.latitude,
                            longitude: alerta.longitude,
                            precise_location: 1,
                            status: "respondido",
                        },{
                            headers: {
                                'Authorization': `Bearer ${tokenValue}`
                            }
                        })
                         
                        const responseFeedback = await api.post(`/v1/feedbacks/send/${formValues}`,{
                            requester_id: alerta.requester_id,
                        },{
                            headers: {
                                'Authorization': `Bearer ${tokenValue}`
                            }
                        })

                    }catch(err){
                        console.log(err.message)
                    }
                }
            })    
        }
        
        if(alerta.status == "respondido"){
            await Swal.fire({  
                html:
                    `<div>`+
                        `<strong>${alerta.status}</strong>`+      
                        `<h2 id="swal-input1" type="text" placeholder="">${alerta.requester.login}</h2>` +
                        `<h2 id="swal-input1" type="text" placeholder="">${number}</h2>` +
                        '<span>' +
                        '<label>RESPOSTA RÁPIDA</label>'+
                        '<p>'+  
                            `${(alerta.feedback.name).toUpperCase()}`+    
                        '</p>'+   
                        '</span>' +  
                        '<label>CATEGORIAS</label>'+
                        '<select id="select2">'+
                            `${(categories).map((alert, index) => {return(
                                `<option key={${index}} value={${alert.id}}>${(alert.name).toUpperCase()}</option>`
                            )})} `+    
                        '</select>'+ 
                        '<label>DESCRIÇÃO</label>'+
                        '<textarea id="description"></textarea>'+   
                    `<div>`,
                background: '#EBEFF2',
                backdrop: 'rgba(0,0,0,0.7)',
                customClass: `${styles.respondido} `,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonColor: '#345580',
                cancelButtonColor: '#FFF',
                confirmButtonText:'SALVAR',
                cancelButtonText:'CANCELAR',
                preConfirm: () => {                 
                    formValues2 = document.getElementById('select2').value
                    formValues3 = document.getElementById('description').value
                }
            }).then(async (value) => {
                if (value.isConfirmed) {
                    formValues2 = formValues2.split("").filter(n => (Number(n) || n == 0)).join(""); 

                    const id = localStorage.getItem('ALERTAUFESuserCampusId');
                    let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                    
                    try{
                        const response = await api.put(`/v1/alerts/${alerta.id}`,{
                            campus_id: id,
                            feedback_id: alerta.feedback.id,
                            category_id: formValues2,
                            description : formValues3,
                            requester_id: alerta.requester_id,
                            responser_id: 29,
                            latitude: alerta.latitude,
                            longitude: alerta.longitude,
                            precise_location: 1,
                            status: "finalizado",
                        },{
                            headers: {
                                'Authorization': `Bearer ${tokenValue}`
                            }
                        }) 
                    }catch(err){
                        console.log(err.response.data.message)
                    }

                }
            })  
        }

        if(alerta.status == "finalizado"){
            await Swal.fire({  
                html:
                    `<div>`+
                        `<strong>${alerta.status}</strong>`+      
                        `<h2 id="swal-input1" type="text" placeholder="">${alerta.requester.login}</h2>` +
                        `<h2 id="swal-input1" type="text" placeholder="">${number}</h2>` +
                        '<span>' +
                            '<label>RESPOSTA RÁPIDA</label>'+
                            '<p>'+  
                                `${alerta.feedback.name}`+    
                            '</p>'+   
                        '</span>' + 
                        '<span>' +
                            '<label>CATEGORIAS</label>'+
                            '<p>'+  
                                `${alerta.category.name}`+    
                            '</p>'+  
                        '</span>' +
                        '<span>' +
                            '<label>DESCRIÇÃO</label>'+
                            `<p>${alerta.description}</p>`+   
                        '</span>' +
                    `<div>`,
                background: '#EBEFF2',
                backdrop: 'rgba(0,0,0,0.7)',
                customClass: `${styles.finalizado}`,
                focusConfirm: false,
                confirmButtonColor: '#FFF',
                confirmButtonText:'FECHAR',           
            })
        }
    }

    return (
        <AlertInfoContext.Provider value={{ 
            isNotAnswered,
            showNotAnswered,
            feedbacks,
            getFeedbacks,
            alerts,
            setAlerts,
            handleClickAlert,
            getCategorias,
            qtdAlerts,
            setQtdAlerts,
            atualizaQtdAlerts
         }}>
            {children}
        </AlertInfoContext.Provider>
    )
}