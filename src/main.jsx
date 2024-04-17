import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom/client";
// import CustomMap from "./CustomMap";
import CustomSearch from "./CustomSearch";
import App from "./App";
import "./index.css";

 // FIXME: move to `CustomMap` component, use with `useRef` hook and add points from properties (`points` prop)
 let myMap;

  // FIXME: move `init` logic to <CustomMap /> component, subscribe to `ymaps.ready` event in the component using `useEffect` hook
  // use `useRef` to memoize element to render map in
  let init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    });
    const suggestView1 = new ymaps.SuggestView('suggest');   

  }

  ymaps.ready(init);

  // TODO: pass `width` and `height` as props to <CustomMap /> component
  const CustomMap = () => {

    const width = 600
    const height = 400
    const dimensions = {
      width: `${width}px`,
      height: `${height}px`
    }

    // FIXME: useless fragment here, leave just `div` because it doesn't have any sibling element
    return (
      <>
        <div id="map" style={dimensions}></div>
      </>
    );
  }

  // FIXME: rename to <App /> because it's not obvious what Parent means and which kind of children it has
  const Parent = () => {
    
    const [adressCoordinates, setAdressCoordinates] = useState('');
    const [cordArr, setCordValue] = useState([]);    

    // FIXME: rename event handler to `on<eventName>` format or `handle<eventName>` format
    const childToParent = (childdata) => {
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
        // FIXME: use `let` instead of `var`
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
                // FIXME: don't throw an error, render error message instead (e.g. just paragraph with the error text)
                // err.message or write your own message
                throw err;
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
          <CustomSearch childToParent={childToParent}/>
          <CustomMap/>
        </div>
      </div>
    );
  }  

  // FIXME: we don't need to export anything from `main.jsx` entry point because we render application here, nothing more
  export default Parent;

ReactDOM.createRoot(document.getElementById("root")).render(  
    <Parent/>
);
