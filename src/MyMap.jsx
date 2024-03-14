import React from "react";
import "./MyMap.css";
import { YMaps, Map } from '@pbe/react-yandex-maps';

function MyMap() {

  return (
    <>      
      <YMaps
        query={{
          apikey: "cc8aa25b-4c6d-489d-afc0-2216e6f4d025"
        }}
      >
        <div>My awesome application with maps!</div>
        <Map 
          defaultState={{
            center: [55.75, 37.57],
            zoom: 13
          }}
          width="500px"
          height="500px"
        />
      </YMaps>
    </>
  );
}

export default MyMap;
