import React, {useState, useRef, useEffect} from "react";

function CustomSearch({childToParent}) {
  const [adressForm, setAdressform] = useState('')
  const [adressCoordinates, setAdresscoordinates] = useState('')   

  
  function handleSubmit(event) {
    event.preventDefault()
    setAdressform(event.target.suggest.value)
    
    const myGeocoder = ymaps.geocode(event.target.suggest.value);
    myGeocoder.then(
        function (res) {
          setAdresscoordinates(res.geoObjects.get(0).geometry.getCoordinates());
          console.log(adressCoordinates);
          childToParent(res.geoObjects.get(0).geometry.getCoordinates());
        },

        function (err) {
          setAdresscoordinates('Не найдено');
        }
    );    
  }

  return (
    <>      
      <p>Я засабмитил: {adressForm} </p>
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
}

export default CustomSearch;
