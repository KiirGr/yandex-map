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
    myMap.current.geoObjects.removeAll();
    points.length=0;    
  }

  const [deletePoint, setDeletedPoint] = useState('');
  const deletePointSubmit = (event) => {
    event.preventDefault();
    setDeletedPoint(event.target.pointNumber.value);
  }

  const deleteMapPoints = async () => {

    if (points.length === 0) {
      return;
    }

    setDeletedPoint('');

    if (deletePoint) {

      const addressList = document.getElementById('address_list');
      const addressToKill = addressList.childNodes[deletePoint];
      addressToKill.parentNode.removeChild( addressToKill );


      if (points.length === 1) {
        myMap.current.geoObjects.removeAll();
        points.length=0;
        return;
      } else if (points.length === 2) {

        myMap.current.geoObjects.removeAll();
        points.splice(deletePoint, 1);
        
        const placemark = new window.ymaps.Placemark(points[0]);
        myMap.current.geoObjects.add(placemark);
        myMap.current.setCenter(points[0]);
        return;

      }

      points.splice(deletePoint, 1);

      myMap.current.geoObjects.removeAll();

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

  }  
  useEffect(() => {
    window.ymaps.ready(initMap);
  }, [])
  useEffect(() => {
    drawMapPoints()
  }, [points])
  useEffect(() => {
    deleteMapPoints()
  }, [deletePoint, points])

  return (
    <div id="map" style={dimensions}>
      <form onSubmit={deletePointSubmit}>
        <input type="text" id="pointNumber" />
        <button type="submit">Удалить точку</button>
      </form>
      <button type="button" onClick={clearMap}>Очистить карту</button>
    </div>
  );
}

export default CustomMap;