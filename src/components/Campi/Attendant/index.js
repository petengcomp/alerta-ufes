import styles from '../../../styles/components/Campi/Attendant.module.css'
import Swal from 'sweetalert2'

import api from '../../../services/api';
import { useContext } from 'react';

import { CampiContext } from '../../../contexts/CampiContexts';

export function Attendant(props){

    const { 
        campus
    } = useContext(CampiContext)

    async function editAttendant(){
        let formValues;
        await Swal.fire({  
            html:
                `<div>`+
                    `<strong>EDITAR ATENDENTE</strong>`+
                    '<div id="form">'+
                        '<label>CAMPUS</label>'+      
                        '<select id="select">'+
                            `${(campus).map((campus, index) => {return(
                                `<option key={${index}} value={${campus.id}}>${campus.name}${props.idCampus === campus.id? ' (ATUAL)':''}</option>`
                            )})} `+    
                        '</select>'+  
                    '<div>'+    
                `<div>`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            customClass: `${styles.editAttendant}`,
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
                let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                try{
                    await api.put(`v1/admin/responsers/${props.id}`, {
                        login: props.name,
                        campus_id: formValues
                    },
                        {
                            headers: {
                                'Authorization': `Bearer ${tokenValue}`
                            }
                        }
                    )
                    Swal.fire('Atendente Editado!', '', 'success')
                    props.callbackParent(true)
                }catch(err){
                    console.log(err.message)
                    Swal.fire(`${err.message}`, '', 'error')
                }
            }
        }) 
    }

    function deleteAttendant(){
        Swal.fire({
            title: `EXCLUIR ATENDENTE ${(props.name).toUpperCase()}`,
            text: `Você está prestes à excluir o atendente ${props.name} e todas as informações dele, está certo disso?`,
            showCancelButton: true,
            customClass: `${styles.alertDelete}`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            confirmButtonColor: '#D9042B',
            cancelButtonColor: '#FFF',
            cancelButtonText: 'CANCELAR',
            confirmButtonText: 'EXCLUIR',
          }).then( async (result) => {
            if (result.isConfirmed) {
                let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                try{
                    await api.delete(`v1/admin/responsers/${props.id}`,{
                        headers: {
                            'Authorization': `Bearer ${tokenValue}`
                        }
                    })
                    props.callbackParent(true)
                    Swal.fire('Atendente Deletado!', '', 'success')
                }catch(err){
                    console.log(err.message)
                    Swal.fire(`${err.response.message}`, '', 'error')
                }
            }
        })
    }

    return(
        <div className={styles.attendantActionArea}>
            <h4>{props.name}</h4>
            <div className={styles.attendantActionAreaButtons}>
                <button onClick={() => editAttendant()} className={styles.attendantButtonEdit}>EDITAR</button>
                <button onClick={() => deleteAttendant()} className={styles.attendantButtonDelete}>EXCLUIR</button>
            </div>
        </div>
    )
}