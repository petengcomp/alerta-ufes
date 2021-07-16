import styles from '../../../styles/components/Campi/Campus.module.css';
import Swal from 'sweetalert2'
import api from '../../../services/api';
import { useEffect, useState } from 'react';

export function Campus(props){

    const [qtdAttendants, setQtdAttendants] = useState(0)

    useEffect(async()=>{
        try{
            let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
            const response = await api.get(`v1/admin/campi/responsers/${props.id}`,{
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            })
            await setQtdAttendants(response.data.responsers.length)
        }catch(err){
            console.log(err.message)
        }
    })
    
    async function editCampus(){
        let formValues = [];
        await Swal.fire({  
            html:
                `<div>`+
                    '<strong>EDITAR CAMPUS</strong>'+
                    '<div>'+
                        '<label for="nome">NOME</label>'+
                        `<input id="swal-input1" type="text" placeholder="" value="${props.name}" />` +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">LATITUDE</label>'+
                        `<input id="swal-input2" type="text" placeholder="" value=${props.lat} />` +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">LONGITUDE</label>'+
                        `<input id="swal-input3" type="text" placeholder="" value=${props.long} />` +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">RAIO DE ALCANCE (metros)</label>'+
                        `<input id="swal-input4" type="text" placeholder="" value=${props.radius} />` +
                    '</div>'+
                `<div>`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            customClass: `${styles.editCampus}`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonColor: '#345580',
            cancelButtonColor: '#FFF',
            confirmButtonText:'SALVAR',
            cancelButtonText:'CANCELAR',
            preConfirm: () => {
                return [
                    formValues[0] = document.getElementById('swal-input1').value,
                    formValues[1] = document.getElementById('swal-input2').value,
                    formValues[2] = document.getElementById('swal-input3').value,
                    formValues[3] = document.getElementById('swal-input4').value  
                ]
            }
        }).then(async (value) => {
            if (value.isConfirmed) {
                if(!formValues[0] || !formValues[1] || !formValues[2] || !formValues[3]){
                    Swal.fire('Preencha todos os campos!', '', 'error')
                }else{
                    let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                    try{
                        await api.put(`v1/admin/campi/${props.id}`, {
                            name: formValues[0],
                            latitude: parseFloat(formValues[1]),
                            longitude: parseFloat(formValues[2]),
                            radius: parseFloat(formValues[3])
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${tokenValue}`
                            }
                        })
                        Swal.fire('Campus Atualizado!', '', 'success')
                    }catch(err){
                        console.log(err.message)
                        Swal.fire('Ocorreu um erro, tente novamente mais tarde!', '', 'error')
                    } 
                    props.callbackParent(true)
                } 
            }
        }) 
    }
    
    function deleteCampus(){
        Swal.fire({
            title: `EXCLUIR CAMPUS ${(props.name).toUpperCase()}`,
            text: `Você está prestes à excluir o campus ${props.name} e todas as informações dele, está certo disso?`,
            showCancelButton: true,
            customClass: `${styles.alert}`,
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
                    await api.delete(`v1/admin/campi/${props.id}`,{
                        headers: {
                            'Authorization': `Bearer ${tokenValue}`
                        }
                    })
                    props.callbackParent(true)
                    Swal.fire('Campus Deletado!', '', 'success')
                }catch(err){
                    console.log(err.message)
                    Swal.fire('Ocorreu um erro!', '', 'error')
                }
            }
        })    
    }

    return(
        <div className={styles.campiregisteredActionArea}>
            <h4>Campus {props.name}</h4>
            <h4>{qtdAttendants}</h4>
            <div className={styles.campiregisteredActionAreaButtons}>
                <button className={styles.campiregisteredButtonEdit} onClick={editCampus}>EDITAR</button>
                <button className={styles.campiregisteredButtonDelete} onClick={deleteCampus}>EXCLUIR</button>
                <button className={styles.campiregisteredButtonAttendant} onClick={()=>props.callbackParentAttendants(true)}>ATENDENTES</button>
            </div>
        </div>
    )
}