import { useContext, useEffect, useState, useRef  } from "react"
import { MdChevronLeft } from 'react-icons/md'

import styles from '../../../styles/components/Campi/ListAttendants.module.css'

import api from "../../../services/api";

import { CampiContext } from '../../../contexts/CampiContexts';
import { Attendant } from "../Attendant";
import { Loading } from "../../Loading";
import Swal from "sweetalert2";

export function ListAttendants(){
    const { 
        setAttendantsSelected,
        campusAttendant
    } = useContext(CampiContext)

    const [login, setLogin] = useState('');
    const [loading, setLoading] = useState(true)
    const [attendants, setAttendants] = useState([])

    async function loadAttendants(){
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        try{
            const response = await api.get(`v1/admin/campi/responsers/${campusAttendant.id}`,{
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            })
            
            setAttendants(response.data.responsers)
            
        }catch(err){
            console.log(err.response.data)
        }
        setLoading(false)
    }

    async function createUsers(){
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        try{
            await api.post('v1/admin/responsers', {
                login: login,
                campus_id: campusAttendant.id
            },
            {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            }
            )

            loadAttendants();
            Swal.fire('Atendente criado!', '', 'success')
        }catch(err){
            console.log(err.response.data.message._message)
            Swal.fire(`${err.response.data.message._message}`, '', 'error')
        }
    }

    useEffect(() => {
        setLoading(true)
        loadAttendants();
    }, [])

    return(
        <div className={!loading ? styles.containerAttendants : styles.containerAttendantsLoading} >
            {
                !loading ?(
                    <>
                        <div className={styles.back} onClick={()=>setAttendantsSelected(false)}>
                                <MdChevronLeft size={32}/>
                                <h3>Voltar</h3>
                        </div>
                        <div className={styles.attendantsHeader}>              
                            <h1>Atendentes do campus {campusAttendant.name}</h1>
                        </div>
                        <div className={styles.actionsAttendants}>
                            <div>
                                <label>LOGIN DO ATENDENTE</label>
                                <input onChange={(e) => {setLogin(e.target.value)}} type="text"/>
                            </div>
                            <button disabled={login.length === 0} onClick={()=>createUsers()} className={styles.attendantsButton}>ADICIONAR</button>
                        </div>
                        
                        {
                            attendants.length != 0?(
                                <>
                                    <div className={styles.attendantsActionBoxTitle}>
                                        <h3>Nome</h3>
                                        <h3>Ações</h3>
                                    </div>
                                    <div className={styles.attendantsActionContainer}>
                                        {(attendants).map((attendant, index) => {return(
                                            <Attendant 
                                                key={index} 
                                                name={attendant.login}
                                                id={attendant.id}
                                                idCampus={campusAttendant.id}
                                                callbackParent={(bool) => loadAttendants()}
                                            />
                                        )})}
                                    </div>                    
                                </>
                            ):(   
                                <div className={styles.emptyContainer}>
                                    <img src="images/EmptyAttendants.svg" alt="Atendentes nao cadastrados" />
                                </div>
                            )
                        }
                    </>
                ):(
                    <Loading />
                )   
            }
        </div>
    )
}