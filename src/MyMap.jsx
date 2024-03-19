import React from "react";
import "./MyMap.css";
import { YMaps, Map, Placemark, SearchControl } from '@pbe/react-yandex-maps';

function MyMap() {

  return (
    <>
      <YMaps
        query={{
          ns: "use-load-option",
          load: "package.full",
          apikey: "cc8aa25b-4c6d-489d-afc0-2216e6f4d025",          
        }}
      >
        
        <Map 
          defaultState={{
            center: [55.75, 37.57],
            zoom: 13,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          width="500px"
          height="500px"
        >
          <Placemark defaultGeometry={[55.751574, 37.573856]} />
          <SearchControl />
        </Map>
      </YMaps>
    </>
  );
}

export default MyMap;
