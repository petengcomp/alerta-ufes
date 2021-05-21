import { useContext } from 'react';
import { SystemContext } from '../../../contexts/SystemContexts';
import styles from '../../../styles/components/System/Categories.module.css';

export function Categories(){

    const { 
        categorias,
        showEditCategories,
        showDeleteCategories,
    } = useContext(SystemContext)


    return(
        <div className={styles.categoriesContainer}>
            <h1>Categorias</h1>
            <div className={styles.categoriesTop}>
                <div className={styles.categoriesSearch}>
                    <label>Categoria</label>
                    <input defaultValue="PERSEGUIÇÃO"></input>
                    <select id="categorias" name="categorias">
                        {(categorias).map((categoria, index) =>
                            <option key={index} value={categoria.name}>{categoria.name}</option>
                        )}
                    </select>
                </div>
                <button className={styles.categoriesButton}>Adicionar</button>
            </div>
            <div className={styles.categoriesActionBox}>
                <div className={styles.categoriesActionBoxTitle}>
                    <h3>Nome</h3>
                    <h3>Ações</h3>
                </div>
                <div className={styles.categoriesActionContainer}>
                    {(categorias).map((categoria, index) =>
                        <div className={styles.categoriesActionArea} key={index}>
                            <h4>{categoria.name}</h4>
                            <div className={styles.categoriesActionAreaButtons}>
                                <button className={styles.categoriesButtonEdit} onClick={showEditCategories}>EDITAR</button>
                                <button className={styles.categoriesButtonDelete} onClick={() => showDeleteCategories(index)}>EXCLUIR</button>
                            </div>
                        </div>  
                    )}
                    
                </div>
                
            </div>
        </div>
    )

}