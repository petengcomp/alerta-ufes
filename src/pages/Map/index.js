import React from "react";
import dynamic from "next/dynamic";

import styles from '../../styles/pages/Map.module.css';
import globalStyles from '../../styles/pages/Global.module.css';

export default function Map() {
  const MapWithNoSSR = dynamic(() => import("../../components/Map/Map"), {
    ssr: false
  })

  return (
    <div className={globalStyles.container}>
      <div className={styles.mapContainer}>
        <div id="map" style={{ height: '100%', width: '100%'}}>
          <MapWithNoSSR />
        </div>
      </div>
    </div>
  )
}
  