import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom/client";
// import CustomMap from "./CustomMap";
import CustomSearch from "./CustomSearch";
import App from "./App";
import "./index.css";

 let myMap;

  let init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    });
    const suggestView1 = new ymaps.SuggestView('suggest');   

  }

  ymaps.ready(init);

  const CustomMap = () => {

    const width = 600
    const height = 400
    const dimensions = {
      width: `${width}px`,
      height: `${height}px`
    }
  
    return (
      <>      
        <div id="map" style={dimensions}></div>
      </>
    );
  }

  const Parent = () => {
    
    const [adressCoordinates, setAdressCoordinates] = useState('');
    const [cordArr, setCordValue] = useState([]);    
  
    const childToParent = (childdata) => {
      setAdressCoordinates(childdata);      
    }

    useEffect(() => {
      if (adressCoordinates) {
        setCordValue([...cordArr, adressCoordinates]);        
      }
    }, [adressCoordinates])

    if (typeof adressCoordinates[0] !== "undefined"){
        myMap.geoObjects.removeAll();
        // Создание геообъекта с типом точка (метка).
        var myPlacemark = new ymaps.Placemark([adressCoordinates[0], adressCoordinates[1]]);
        
        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark);                          

          console.log(cordArr.length);
          if (cordArr.length >= 2){

            ymaps.route(cordArr, {
              multiRoute: false
            }).done(function (route) {
                route.options.set("mapStateAutoApply", true);
                myMap.geoObjects.add(route);
            }, function (err) {
                throw err;
            }, this);

          }
    }

    return (
      <div className="App">
        {/* {adressCoordinates} */}
        <div>
          <CustomSearch childToParent={childToParent}/>
          <CustomMap/>
        </div>
      </div>
    );
  }  

  export default Parent;

ReactDOM.createRoot(document.getElementById("root")).render(  
    <Parent/>
);
