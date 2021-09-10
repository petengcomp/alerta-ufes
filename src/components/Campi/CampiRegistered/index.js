import { useContext } from 'react';
import styles from '../../../styles/components/Campi/CampiRegistered.module.css';

import { ListCampi } from '../ListCampi';
import { ListAttendants } from '../ListAttendants';

import { CampiContext } from '../../../contexts/CampiContexts';

export function CampiRegistered(){
    const { 
        attendantsSelected,
    } = useContext(CampiContext)

    return(
        <div className={styles.campiregisteredContainer}>
            {
                !attendantsSelected
                ? <ListCampi />
                : <ListAttendants />
            }               
        </div>
    )
}