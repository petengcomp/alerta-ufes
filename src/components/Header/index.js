import styles from '../../styles/components/Header.module.css';

export function Header(props){
    return(
        <div className={styles.headerContainer}>
            <div className={styles.headerSubContainer}>
                <div style={{flexDirection: "column"}}>
                    <h1 className={styles.headerTitle}>{props.title}</h1>
                    <h4 className={styles.headerDescription}>{props.description}</h4>    
                </div>
                {props.child !== undefined && props.child}
            </div>
        </div>
    )

}