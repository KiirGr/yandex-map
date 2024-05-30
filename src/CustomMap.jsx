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

    // TODO: remove all points from the map

    if (points.length === 1) {
      const placemark = new window.ymaps.Placemark(points[0]);

      myMap.current.geoObjects.add(placemark)
      // TODO: center map here
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
    // TODO: center map here
  }

  useEffect(() => {
    window.ymaps.ready(initMap);
  }, [])
  useEffect(() => {
    drawMapPoints()
  }, [points])

  return (
    <div id="map" style={dimensions}/>
  );
}

export default CustomMap;