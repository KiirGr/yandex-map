import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import CustomSearch from "./CustomSearch";
import CustomMap from "./CustomMap";
import "./index.css";
import "./App.css";

function App() {
  const [adressCoordinates, setAdressCoordinates] = useState([]);
  const [cordArr, setCordValue] = useState([]);

  const handleTransferCoordinates = (childdata) => {
    setAdressCoordinates(adressCoordinates.concat([childdata]));
  }

  useEffect(() => {
    if (adressCoordinates) {
      setCordValue([...cordArr, adressCoordinates]);
    }
  }, [adressCoordinates])

  // FIXME: organize data flow like here https://codesandbox.io/p/sandbox/cyrill-reach-session-11-04-2024-cmjd32?file=%2Fsrc%2FApp.js%3A47%2C1
  // 1. map points should be store in the `App` component
  // 2. `Map` component should render the passed points through props
  // 3. `Search` component should trigger callback and the callback should change `App` component's state
  return (
    <div className="App">
      {/* {adressCoordinates} */}
      <div>
        <CustomSearch childToApp={handleTransferCoordinates}/>
        <CustomMap points={adressCoordinates} size={{ width: '600px',  height: '400px'}}/>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(  
    <App/>
);
