import { useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import styles from '../../styles/components/Map/Map.module.css'
import Swal from 'sweetalert2';

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import api from '../../services/api';

import { AlertInfoContext } from '../../contexts/AlertInfoContexts';

import socketio from '../../services/socketio';

const Map = () => {
    const { 
        getFeedbacks,
        alerts,
        setAlerts,
        handleClickAlert,
        getCategorias,
        atualizaQtdAlerts,    
    } = useContext(AlertInfoContext)

    async function loadAlerts(){
        let campusId = localStorage.getItem('ALERTAUFESuserCampusId');
        let tokenValue = localStorage.getItem('ALERTAUFESuserToken');
        
        try {
            const response = await api.get(`v1/campi/alerts/${campusId}`, {
                headers: {
                    'Authorization': `Bearer ${tokenValue}`
                }
            });
            
            atualizaQtdAlerts()
            setAlerts(response.data.alerts);
            
        }
        catch (err) {
            console.log(err.response.data);
        }
    }

    function newAlert(){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'warning',
            title: 'Um novo novo alerta emitido'
          })
        loadAlerts() 
    }

    useEffect(() => {
        loadAlerts()     
        getFeedbacks()
        getCategorias()
        socketio.on('newAlert', () => newAlert());
        socketio.on('updateAlert', () => loadAlerts());
    }, []);

    var pinRed = L.icon({
        iconUrl: 'icons/pin-red.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -37],
    });
    
    var pinYellow = L.icon({
        iconUrl: 'icons/pin-yellow.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -37],
    });

    var pinBlue = L.icon({
        iconUrl: 'icons/pin-blue.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -37],
    });

return (
    <MapContainer center={[-20.274735, -40.303924]} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       
        {(alerts).map((alert, index)=>{return (
            <div key={index}>
                <Marker 
                    position={[alert.latitude, alert.longitude]} 
                    icon={
                        alert.status == "não respondido" ?
                        pinRed : alert.status == "respondido" ?
                        pinYellow : pinBlue
                    }
                >
                    <Popup>
                        <div className={styles.popup} onClick={() => handleClickAlert(alert)}>
                            {alert.status}
                            <img src="icons/zoom-in.svg" alt="detalhes alerta" />
                        </div>
                    </Popup>
                </Marker>
            </div>                 
        )})}
    </MapContainer>
  )
}

export default Map