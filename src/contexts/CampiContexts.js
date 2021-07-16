import { createContext, useState } from "react";
import api from "../services/api";

export const CampiContext = createContext();

export function CampiProvider({children}) {
    const [attendantsSelected, setAttendantsSelected] = useState(false);
    const [page, setPage] = useState(0);
    const [nRows, setNRows] = useState(5);
    const [limitedCampus, setlimitedCampus] = useState([]);
    const [campus, setCampus] = useState([]); 
    const [campusAttendant, setCampusAttendant] = useState([])

    function setAttendants(campi){
        setAttendantsSelected(true)
        setCampusAttendant(campi)
    }

    async function loadCampus(){
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        try{
            const response = await api.get("v1/admin/campi",{
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            })

            setCampus(response.data.campi);
            setlimitedCampus(response.data.campi.slice(nRows*page, nRows*(page+1)));
        }catch(err){
            console.log(err.response.data)
        }
    }

    return (
        <CampiContext.Provider value={{ 
            attendantsSelected,
            setAttendantsSelected,
            setAttendants,
            page,
            setPage,
            nRows,
            setNRows,
            limitedCampus,
            setlimitedCampus,
            loadCampus,
            campus,
            setCampus,
            campusAttendant
         }}>
            {children}
        </CampiContext.Provider>
    )
}