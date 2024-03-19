import React, {useState, useRef, useEffect} from "react";

function CustomSearch() {
  const [adressForm, setAdressform] = React.useState('')
  const [adressCoordinates, setAdresscoordinates] = React.useState('') 

  function handleSubmit(event) {
    event.preventDefault()
    setAdressform(event.target.suggest.value)
    
    var myGeocoder = ymaps.geocode(event.target.suggest.value);
    myGeocoder.then(
        function (res) {
          setAdresscoordinates(res.geoObjects.get(0).geometry.getCoordinates());
        },

        function (err) {
          setAdresscoordinates('Не найдено');
        }
    );
  }  

  return (
    <>      
      <p>Я засабмитил: {adressForm} </p>
      <p>Координаты обьекта: {adressCoordinates} </p>
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
}

export default CustomSearch;
