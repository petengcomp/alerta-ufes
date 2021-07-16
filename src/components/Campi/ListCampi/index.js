import { useContext, useEffect, useState } from 'react';
import { Campus } from "../Campus"
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'
import Swal from 'sweetalert2'
import api from '../../../services/api';

import styles from '../../../styles/components/Campi/ListCampi.module.css'

import { CampiContext } from '../../../contexts/CampiContexts';

import { Loading } from '../../Loading';

export function ListCampi(){
    const { 
        setAttendants,
        page,
        setPage,
        nRows,
        setNRows,
        limitedCampus,
        setlimitedCampus,
        loadCampus,
        campus,
    } = useContext(CampiContext);

    const [loading, setLoading] = useState(true);
    const [qtdAtendentes, setQtdAtendentes] = useState(0);

    async function registerCampus(){
        let formValues = [];
        await Swal.fire({  
            html:
                `<div>`+
                    '<strong>CADASTRAR CAMPUS</strong>'+
                    '<div>'+
                        '<label for="nome">NOME</label>'+
                        `<input id="swal-input1" type="text" placeholder=""/>` +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">LATITUDE</label>'+
                        '<input id="swal-input2" type="text" placeholder=""/>' +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">LONGITUDE</label>'+
                        '<input id="swal-input3" type="text" placeholder=""/>' +
                    '</div>'+
                    '<div>'+
                        '<label for="nome">RAIO DE ALCANCE (metros)</label>'+
                        '<input id="swal-input4" type="text" placeholder=""/>' +
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
                formValues[0] = document.getElementById('swal-input1').value,
                formValues[1] = document.getElementById('swal-input2').value,
                formValues[2] = document.getElementById('swal-input3').value,
                formValues[3] = document.getElementById('swal-input4').value     
            }
        }).then( async (value) => {
            if (value.isConfirmed) {
                if(!formValues[0] || !formValues[1] || !formValues[2] || !formValues[3]){
                    Swal.fire('Preencha todos os campos!', '', 'error')
                }else{
                    try{
                        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
                        await api.post("v1/admin/campi", {
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
                        Swal.fire('Campus Cadastrado!', '', 'success')
                    }catch(err){
                        console.log(err.message)
                        Swal.fire('Ocorreu um erro, tente novamente mais tarde!', '', 'error')
                    } 
                    loadCampus();
                } 
            }
        })  
    }

    async function changePage(num){
        if(num === -1 && page === 0){
            return;
        }
        if(num === 1 && (page+1)*nRows >= campus.length){
            return;
        };
        const newPage = page+num;
        setPage(newPage);
        setlimitedCampus(campus.slice(nRows*newPage, nRows*(newPage+1)))        
    }

    function changeNRows(event){
        let value = event.target.value;
        setNRows(value);
        setlimitedCampus(campus.slice(value*page, value*(page+1)));
    }

    useEffect(async() => {
        setLoading(true)
        await loadCampus();
        setLoading(false)
    }, [])

    return(
        <>
            <div className={styles.campiregisteredTop}>
                <h1>Campi Cadastrados</h1>
                <button onClick={registerCampus} className={styles.campiregisteredButton}>CADASTRAR CAMPUS</button>
            </div>
            {
                loading
                ? <div className={styles.loading}><Loading /></div>
                : (
                    <>
                        {
                            campus.length === 0
                            ?   <img className={styles.emptyImg} src="images/Empty.svg" alt="imagem sem campus" />
                            :   <div className={styles.campiregisteredActionBox}>
                                    <div className={styles.campiregisteredActionBoxTitle}>
                                        <h3>Nome</h3>
                                        <h3>Quantidade de atendentes</h3>
                                        <h3>Ações</h3>
                                    </div>
                                    <div className={styles.campiregisteredActionContainer}>
                                        {(limitedCampus).map((campi, index)=>{return (
                                            <Campus 
                                                key={index} 
                                                name={campi.name} 
                                                lat={campi.latitude}
                                                long={campi.longitude}
                                                radius={campi.radius}
                                                id={campi.id}
                                                callbackParent={(bool) => loadCampus()}
                                                callbackParentAttendants={(bool) => setAttendants(campi)}
                                            /> 
                                            
                                        )})}
                                        
                                        <div className={styles.tableFooter}>
                                            <div>
                                                <p>Linhas por página:</p>
                                                <select onChange={(e)=>
                                                    changeNRows(e)
                                                } defaultValue={5}>
                                                    <option value={5}>5</option>
                                                    <option value={10}>10</option>
                                                    <option value={20}>20</option>
                                                    <option value={50}>50</option>
                                                    <option value={100}>100</option>
                                                </select>
                                            </div>
                                            <div >
                                                <p>
                                                    {`${(1+(page*nRows))}-${((page+1)*nRows)>campus.length?campus.length:(page+1)*nRows} de ${campus.length} alertas`}
                                                </p>
                                                <div className={styles.footerButton} onClick={()=>changePage(-1)}>
                                                    <MdChevronLeft  size={32}/>
                                                </div>
                                                <div className={styles.footerButton} onClick={()=>changePage(1)}>
                                                    <MdChevronRight size={32}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                        }   
                    </>
                )
            }
            
        </>
    )
}