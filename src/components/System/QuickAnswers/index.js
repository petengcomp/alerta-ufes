import { useEffect, useState } from 'react';
import styles from '../../../styles/components/System/QuickAnswers.module.css';
import Swal from 'sweetalert2'
import api from '../../../services/api';

export function QuickAnswers(){
    const[inputValue, setInputValue] = useState('')
    const [updateAnswer, setUpdateAnswer] = useState(false)
    const[answers, setAnswers] = useState([]);
    const[idCampus, setIdCampus] = useState('')
    const[token, setToken] = useState('')
    const[searchAnswer, setSearchAnswer] = useState('')

    useEffect(async () => {
        let campusId = localStorage.getItem('ALERTAUFESuserCampusId');
        setIdCampus(campusId);
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        setToken(tokenValue);


        try {
            const response = await api.get(`v1/campi/feedbacks/${campusId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            setAnswers(response.data.feedbacks)
        }
        catch (err) {
            console.log(err.response.data);
        }
    }, [updateAnswer]);

    function success() {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Feito com sucesso',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function erro() {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Deu um problema, tente novamente',
            showConfirmButton: false,
            timer: 1500
        })
    }


    function editAnswerAlert(name, id){
        Swal.fire({
            title: 'EDITAR RESPOSTA RÁPIDA',
            input: 'text',
            inputValue: `${name}`,
            showCancelButton: true,
            customClass: `${styles.alert}`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            confirmButtonColor: '#345580',
            cancelButtonColor: '#5e5c5c',
            cancelButtonText: 'CANCELAR',
            confirmButtonText: 'SALVAR',
          }).then( async (result) => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    try {
                        const response = await api.put(`v1/feedbacks/${id}`, { name: result.value, campus_id: idCampus }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if(response){
                            setUpdateAnswer(!updateAnswer);
                            success();
                        }
                    }
                    catch (err) {
                        console.log(err.response.data);
                        erro();
                    }
                }
            }
        }) 
    }

    function deleteAnswerAlert(id){
        Swal.fire({
            title: 'EXCLUIR RESPOSTA RÁPIDA',
            text: 'Você está prestes à excluir uma answer, está certo disso?',
            showCancelButton: true,
            customClass: `${styles.alert}`,
            background: '#EBEFF2',
            backdrop: 'rgba(0,0,0,0.7)',
            confirmButtonColor: '#D9042B',
            cancelButtonColor: '#5e5c5c',
            cancelButtonText: 'CANCELAR',
            confirmButtonText: 'EXCLUIR',
          }).then( async (result) => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    try {
                        const response = await api.delete(`v1/feedbacks/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        if(response){
                            setUpdateAnswer(!updateAnswer);
                            success();
                        }
                    }
                    catch (err) {
                        console.log(err.response.data);
                        erro();
                    }
                }
            }
        })      
    }

    async function addNewAnswer(){
        if(inputValue !== ''){
            try {
                const response = await api.post(`v1/feedbacks`, { name: inputValue, campus_id: idCampus }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response){
                    setUpdateAnswer(!updateAnswer);
                    setInputValue('');
                    success();
                }
            }
            catch (err) {
                console.log(err.response.data);
                erro();
            }
        }
    }

    function filterItems(query) {
        return answers.filter(function(answer) {
            return (answer.name).toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    const Feedbacks = (props) => {
        return (
            (props.values).map((answer, index) =>
                <div className={styles.quickanswersActionArea} key={index}>
                    <h4>{answer.name}</h4>
                    <div className={styles.quickanswersActionAreaButtons}>
                        <button className={styles.quickanswersButtonEdit} onClick={() => editAnswerAlert(answer.name, answer.id)}>EDITAR</button>
                        <button className={styles.quickanswersButtonDelete} onClick={() => deleteAnswerAlert(answer.id)}>EXCLUIR</button>
                    </div>
                </div>  
            )
        )
    }



    return(
        <div className={styles.quickanswersContainer}>
            <h1>Respostas Rápidas</h1>
            <div className={styles.quickanswersTop}>
                <div className={styles.quickanswersSearch}>
                    <label>Resposta</label>
                    <input 
                        placeholder="Ex: RESPOSTA X" 
                        value={inputValue} 
                        onChange={ e => setInputValue(e.target.value)} 
                    />
                    <input 
                        placeholder="Buscar resposta rápida" 
                        onChange={async (e) => {
                            const { value } = e.currentTarget
                            setSearchAnswer(filterItems(value))
                        }}
                    />
                </div>
                <button className={styles.quickanswersButton} onClick={addNewAnswer}>Adicionar</button>
            </div>
            <div className={styles.quickanswersActionBox}>
                <div className={styles.quickanswersActionBoxTitle}>
                    <h3>Nome</h3>
                    <h3>Ações</h3>
                </div>
                <div className={styles.quickanswersActionContainer}>
                    <Feedbacks values={searchAnswer === '' ? answers : searchAnswer} />
                </div>
            </div>
        </div>
    )

}