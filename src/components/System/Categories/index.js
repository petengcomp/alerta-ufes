import { useEffect, useState } from 'react';
import styles from '../../../styles/components/System/Categories.module.css';
import Swal from 'sweetalert2'
import api from '../../../services/api';

export function Categories(){
    const[inputValue, setInputValue] = useState('');
    const[updateCategory, setUpdateCategory] = useState(false)
    const[categorias, setCategorias] = useState([]);
    const[idCampus, setIdCampus] = useState('')
    const[token, setToken] = useState('')
    const[searchCategory, setSearchCategory] = useState('')

    useEffect(async () => {
        let campusId = localStorage.getItem('ALERTAUFESuserCampusId');
        setIdCampus(campusId);
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        setToken(tokenValue);


        try {
            const response = await api.get(`v1/campi/categories/${campusId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            // console.log(response.data)
            setCategorias(response.data.categories)
        }
        catch (err) {
            console.log(err);
        }
    }, [updateCategory]);

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

    function editCategorieAlert(name, id){
        Swal.fire({
            title: 'EDITAR CATEGORIA',
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
                try {
                    const response = await api.put(`v1/categories/${id}`, { name: result.value, campus_id: idCampus }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if(response){
                        setUpdateCategory(!updateCategory);
                        success();
                    }
                }
                catch (err) {
                    console.log(err.response.data);
                    erro();
                }
            }
        }) 
    }

    function deleteCategoryAlert(id){
        Swal.fire({
            title: 'EXCLUIR CATEGORIA',
            text: 'Você está prestes à excluir uma categoria, está certo disso?',
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
                try {
                    const response = await api.delete(`v1/categories/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if(response){
                        setUpdateCategory(!updateCategory);
                        success();
                    }
                }
                catch (err) {
                    console.log(err);
                    erro();
                }
            }
        })      
    }

    async function addNewCategory(){
        if(inputValue !== ''){
            try {
                const response = await api.post(`v1/categories`, { name: inputValue, campus_id: idCampus }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if(response){
                    setUpdateCategory(!updateCategory);
                    setInputValue('')
                    success();
                }
            }
            catch (err) {
                console.log(err);
                erro();
            }
        }
    }

    function filterItems(query) {
        return categorias.filter(function(categoria) {
            return (categoria.name).toLowerCase().indexOf(query.toLowerCase()) > -1;
        })
    }

    const CategoriasCampus = (props) => {
        return (
            (props.values).map((categoria, index) =>
                <div className={styles.categoriesActionArea} key={index}>
                    <h4>{categoria.name}</h4>
                    <div className={styles.categoriesActionAreaButtons}>
                        <button className={styles.categoriesButtonEdit} onClick={() => editCategorieAlert(categoria.name, categoria.id)}>EDITAR</button>
                        <button className={styles.categoriesButtonDelete} onClick={() => deleteCategoryAlert(categoria.id)}>EXCLUIR</button>
                    </div>
                </div>  
            )
        )
    }


    return(
        <div className={styles.categoriesContainer}>
            <h1>Categorias</h1>
            <div className={styles.categoriesTop}>
                <div className={styles.categoriesSearch}>
                    <label>Categoria</label>
                    <input 
                        placeholder="Ex: PERSEGUIÇÃO" 
                        value={inputValue} 
                        onChange={ e => setInputValue(e.target.value)} 
                    />
                    <input 
                        placeholder="Buscar categoria" 
                        onChange={async (e) => {
                            const { value } = e.currentTarget
                            setSearchCategory(filterItems(value))
                        }}
                    />
                </div>
                <button className={styles.categoriesButton} onClick={addNewCategory}>Adicionar</button>
            </div>
            <div className={styles.categoriesActionBox}>
                <div className={styles.categoriesActionBoxTitle}>
                    <h3>Nome</h3>
                    <h3>Ações</h3>
                </div>
                <div className={styles.categoriesActionContainer}>
                    <CategoriasCampus values={searchCategory === '' ? categorias : searchCategory} />
                </div>
            </div>
        </div>
    )

}