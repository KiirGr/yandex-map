import React, { useRef, useEffect } from "react";

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

    // TODO: remove all points from the map +++DONE+++
    myMap.current.geoObjects.removeAll();

    if (points.length === 1) {
      const placemark = new window.ymaps.Placemark(points[0]);

     myMap.current.geoObjects.add(placemark);
      // TODO: center map here +++DONE+++
      myMap.current.setCenter(points[0]);
      return;
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
    // TODO: center map here - +++ It works already +++    
  }

  const pointsList = async () => {
    points.forEach(element => {

      const ymapsVar1 = window.ymaps;
      const resultCoordinates = ymapsVar1.geocode([element[0],element[1]],{kind: 'street'});

      resultCoordinates
      .then(
        res => {
          const nearest = res.geoObjects.get(0);    
          const name = nearest.properties.get('name');
          console.log("широта-"+element[0]+" долгота-"+element[1]+" наименование объекта-"+name);
        }        
      )
      .catch(err => `Произошла ошибка: ${err}`)
    });    
    
  }

  const clearMap = () => {
    myMap.current.geoObjects.removeAll();
    points.length=0;
  }

  useEffect(() => {
    window.ymaps.ready(initMap);
  }, [])
  useEffect(() => {
    drawMapPoints()
  }, [points])
  useEffect(() => {
    pointsList()
  }, [points])

  return (
    <div id="map" style={dimensions}>
      <button type="button" onClick={clearMap}>Очистить карту</button>
    </div>    
  );
}

export default CustomMap;