import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom/client";
import MyMap from "./MyMap";
import CustomMap from "./CustomMap";
import CustomSearch from "./CustomSearch";
import App from "./App";
import "./index.css";

ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    });
    var suggestView1 = new ymaps.SuggestView('suggest');

    // var myGeocoder = ymaps.geocode("Москва");

    // myGeocoder.then(
    //     function (res) {
    //         alert('Координаты объекта :' + res.geoObjects.get(0).geometry.getCoordinates());
    //     },

    //     function (err) {
    //         alert('Ошибка');
    //     }
    // );
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomSearch/>
    <CustomMap />
  </React.StrictMode>,
);
