import React, { useRef, useEffect, useState } from "react";

function CustomMap({ size, points = [] }) {
  const myMap = useRef(null);
  const initMap = () => {
    myMap.current = new window.ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 13
    });
    const suggestView = new window.ymaps.SuggestView('suggest');

    return suggestView;
  }
  const dimensions = {
    width: `${size.width}`,
    height: `${size.height}`
  }
  const drawMapPoints = async () => {
    if (points.length === 0) {
      return;
    }

    myMap.current.geoObjects.removeAll();

    if (points.length === 1) {
      const placemark = new window.ymaps.Placemark(points[0]);

     myMap.current.geoObjects.add(placemark);
      myMap.current.setCenter(points[0]);
      return;
    }

    if (points.length === 3) {

      points.slice(1, 1)

      window.ymaps.route(points, {
        multiRoute: false
      }).done((route) => {
        route.options.set("mapStateAutoApply", true);
        myMap.current.geoObjects.add(route);
      }, (err) => {
        // err.message or write your own message
        const errorMsg = `Произошла ошибка: ${err}`;
  
        alert(errorMsg);
      }, this);

    }


    window.ymaps.route(points, {
      multiRoute: false
    }).done((route) => {
      route.options.set("mapStateAutoApply", true);
      myMap.current.geoObjects.add(route);
    }, (err) => {
      // err.message or write your own message
      const errorMsg = `Произошла ошибка: ${err}`;

      alert(errorMsg);
    }, this);
  }  

  const clearMap = () => {
    // myMap.current.geoObjects.removeAll();
    // points.length=0;    
    // debugger    
    
    // const myGeoObjects = new window.ymaps.GeoObjectCollection();
    // myGeoObjects.add(new window.ymaps.Placemark([13.38, 52.81]));
    // myMap.current.geoObjects.add(myGeoObjects);
    // myMap.current.setBounds(myGeoObjects.getBounds());
    // myGeoObjects.splice(1, 1);
    // debugger
  }  

  useEffect(() => {
    window.ymaps.ready(initMap);
  }, [])
  useEffect(() => {
    drawMapPoints()
  }, [points])

  return (
    <div id="map" style={dimensions}>
      <button type="button" onClick={clearMap}>Очистить карту</button>
      {/* <span>
        {pointsListArrays}
      </span> */}
    </div>
  );
}

export default CustomMap;