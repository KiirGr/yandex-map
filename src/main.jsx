import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import CustomSearch from "./CustomSearch";
import "./index.css";
import "./App.css";

const ymapsVar = window.ymaps;

 // FIXME: move to `CustomMap` component, use with `useRef` hook and add points from properties (`points` prop)
 let myMap;

  // FIXME: move `init` logic to <CustomMap /> component, subscribe to `ymaps.ready` event in the component using `useEffect` hook
  // use `useRef` to memoize element to render map in
  const init = () => {
    myMap = new ymapsVar.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    });
    const suggestView = new ymapsVar.SuggestView('suggest');

    return suggestView;
  }

  ymapsVar.ready(init);

  // +++DONE+++ TODO: pass `width` and `height` as props to <CustomMap /> component
  function CustomMap({size}) {    
    const dimensions = {
      width: `${size.width}`,
      height: `${size.height}`
    }

    // +++DONE+++ FIXME: useless fragment here, leave just `div` because it doesn't have any sibling element
    return (
        <div id="map" style={dimensions}/>
    );
  }

  // +++DONE+++ FIXME: rename to <App /> because it's not obvious what Parent means and which kind of children it has
  function App() {
    
    const [adressCoordinates, setAdressCoordinates] = useState('');
    const [cordArr, setCordValue] = useState([]);    

    // +++DONE+++ FIXME: rename event handler to `on<eventName>` format or `handle<eventName>` format
    const handleTransferCoordinates = (childdata) => {
      setAdressCoordinates(childdata);      
    }

    useEffect(() => {
      if (adressCoordinates) {
        setCordValue([...cordArr, adressCoordinates]);        
      }
    }, [adressCoordinates])

    // FIXME: should be in the `CustomMap` component
    if (typeof adressCoordinates[0] !== "undefined"){
        myMap.geoObjects.removeAll();
        // Создание геообъекта с типом точка (метка).
        // +++DONE+++ FIXME: use `let` instead of `var`
        const myPlacemark = new ymapsVar.Placemark([adressCoordinates[0], adressCoordinates[1]]);
        
        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark);

          if (cordArr.length >= 2){

            ymapsVar.route(cordArr, {
              multiRoute: false
            }).done((route) => {
                route.options.set("mapStateAutoApply", true);
                myMap.geoObjects.add(route);
            }, (err) => {
                // +++DONE+++ FIXME: don't throw an error, render error message instead (e.g. just paragraph with the error text)
                // err.message or write your own message
                const errorMsg = `Произошла ошибка: ${err}`;
                alert(errorMsg);
            }, this);

          }
    }

    // FIXME: organize data flow like here https://codesandbox.io/p/sandbox/cyrill-reach-session-11-04-2024-cmjd32?file=%2Fsrc%2FApp.js%3A47%2C1
    // 1. map points should be store in the `App` component
    // 2. `Map` component should render the passed points through props
    // 3. `Search` component should trigger callback and the callback should change `App` component's state
    return (
      <div className="App">
        {/* {adressCoordinates} */}
        <div>
          <CustomSearch childToApp={handleTransferCoordinates}/>
          <CustomMap size={{ width: '600px',  height: '400px'}}/>
        </div>
      </div>
    );
  }  

  // +++DONE+++ FIXME: we don't need to export anything from `main.jsx` entry point because we render application here, nothing more

ReactDOM.createRoot(document.getElementById("root")).render(  
    <App/>
);
