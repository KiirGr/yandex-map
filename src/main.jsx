import React, {useState, useRef, useEffect} from "react";
import ReactDOM from "react-dom/client";
import CustomMap from "./CustomMap";
import CustomSearch from "./CustomSearch";
import App from "./App";
import "./index.css";

  const init = () => {
    const myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 13
    });
    const suggestView1 = new ymaps.SuggestView('suggest');    
     
  }

  ymaps.ready(init);

  const Parent = (myMap) => {

    const [adressCoordinates, setAdressCoordinates] = useState('')

    const childToParent = (childdata) => {
      setAdressCoordinates(childdata);
    }

    console.log(" долгота: "+adressCoordinates[0]+" широта: "+adressCoordinates[1]);    

    return (
      <div className="App">
       {adressCoordinates}
        <div>
          <CustomSearch childToParent={childToParent}/>
        </div>
      </div>
    );
  }  

  export default Parent;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Parent/>
    <CustomMap />    
  </React.StrictMode>,
);
