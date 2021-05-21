import { useContext } from 'react';
import { SystemContext } from '../../../contexts/SystemContexts';
import styles from '../../../styles/components/System/Categories.module.css';

export function Categories(){

    const { 
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
                        <option value="categoria 1">categoria 1</option>
                        <option value="categoria 2">categoria 2</option>
                        <option value="categoria 3">categoria 3</option>
                        <option value="categoria 4">categoria 4</option>
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
                    <div className={styles.categoriesActionArea}>
                        <h4>Categoria 1</h4>
                        <div className={styles.categoriesActionAreaButtons}>
                            <button className={styles.categoriesButtonEdit} onClick={showEditCategories}>EDITAR</button>
                            <button className={styles.categoriesButtonDelete} onClick={showDeleteCategories}>EXCLUIR</button>
                        </div>
                    </div>
                    <div className={styles.categoriesActionArea}>
                        <h4>Categoria 2</h4>
                        <div className={styles.categoriesActionAreaButtons}>
                            <button className={styles.categoriesButtonEdit} onClick={showEditCategories}>EDITAR</button>
                            <button className={styles.categoriesButtonDelete} onClick={showDeleteCategories}>EXCLUIR</button>
                        </div>
                    </div>
                    <div className={styles.categoriesActionArea}>
                        <h4>Categoria 3</h4>
                        <div className={styles.categoriesActionAreaButtons}>
                            <button className={styles.categoriesButtonEdit} onClick={showEditCategories}>EDITAR</button>
                            <button className={styles.categoriesButtonDelete} onClick={showDeleteCategories}>EXCLUIR</button>
                        </div>
                    </div>
                    <div className={styles.categoriesActionArea}>
                        <h4>Categoria 4</h4>
                        <div className={styles.categoriesActionAreaButtons}>
                            <button className={styles.categoriesButtonEdit} onClick={showEditCategories}>EDITAR</button>
                            <button className={styles.categoriesButtonDelete} onClick={showDeleteCategories}>EXCLUIR</button>
                        </div>
                    </div>    
                </div>
                
            </div>
        </div>
    )

}