import styles from '../../styles/pages/Map.module.css';
import globalStyles from '../../styles/pages/Global.module.css';
import { RecentAlert } from '../../components/Map/RecentAlert';
import { SubtitleAlert } from '../../components/Map/SubtitileAlert';
import { TopbarContext } from '../../contexts/TopbarContexts';
import { useContext } from 'react';
import { NotAnswered } from '../../components/Map/NotAnswered';
import { AlertInfoContext } from '../../contexts/AlertInfoContexts';


export default function Map() {
  const { 
    isActiveNotification,
    isActiveProfile,
  } = useContext(TopbarContext)

  const { 
    isNotAnswered,
  } = useContext(AlertInfoContext)

    return (
      <div className={globalStyles.container}>
        <div className={styles.mapContainer}>
          {isActiveNotification &&
          <>
            <RecentAlert />
            <SubtitleAlert />
          </>
          }
          {isNotAnswered && <NotAnswered />}
          

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14970.596826259594!2d-40.305981!3d-20.2733782!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7c50a8cb2f88472c!2sPET%20Engenharia%20da%20Computa%C3%A7%C3%A3o%20UFES!5e0!3m2!1spt-BR!2sbr!4v1587417017850!5m2!1spt-BR!2sbr"
            title="Mapa"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
          />
        </div>

      </div>
    )
  }
  