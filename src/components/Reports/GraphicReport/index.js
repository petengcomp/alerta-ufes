import styles from '../../../styles/components/Report/GraphicReport.module.css';
import {Bar} from 'react-chartjs-2';
import api from '../../../services/api';
import { useState, useEffect } from 'react';


export function GraphicReport(){
    const [categories, setCategories] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [data, setData] = useState({});

   
    async function getAlerts() {
        let token;
        let id;
        if (typeof window !== "undefined") {
            id = localStorage.getItem("ALERTAUFESuserCampusId");
            token = localStorage.getItem("ALERTAUFESuserToken");
            
        }
        try {
            const response = await api.get(`v1/campi/alerts/${id}`, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }});
            let aux = [];

            response.data.alerts.map((alert)=>{
                if(alert.category !== null && aux.findIndex((category) => {return category.name === alert.category.name}) === -1){
                    aux.push({name: alert.category.name, count: 1});
                }else{
                    aux.map((category, index)=>{
                        if(alert.category !== null){
                            if (category.name === alert.category.name){
                                category.count ++;
                            }
                        }
                    })
                }
            });
            console.log(aux);
            setCategories(aux);
            setAlerts(response.data.alerts);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        getAlerts();
        getData();
    }, []);


    function getData(){
        let names = [];
        let counters = [];
        categories.map(category=>{
            names.push(category.name);
            counters.push(category.count);
        })
        setData({
            labels: names,
            datasets: [{
                label: '# de Alertas/Categoria',
            data: counters,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
            }
            ]
        })
    }

    useEffect(()=>{
        getData();
    },[categories]);

    return(
       <div className={styles.card}>
           <h3>Alertas no Campus</h3>
           <Bar 
           data={data} 
           width={400} 
           height={200} options={{
            maintainAspectRatio: false
            }}
            />
       </div>
    )

}