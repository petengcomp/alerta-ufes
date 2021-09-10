import { useContext } from 'react';
import { TopbarContext } from '../../contexts/TopbarContexts';
import styles from '../../styles/components/Topbar.module.css';

export function Topbar(){
    const { 
        LogoutProfile,
    } = useContext(TopbarContext)

    

    return(
        <div className={styles.topbarContainer}>
            <img 
                width="30px" 
                src="icons/log-out.svg" 
                alt="Logout" 
                onClick={LogoutProfile}
            />
        </div>
    )

}