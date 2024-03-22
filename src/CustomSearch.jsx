import React, {useState, useRef, useEffect} from "react";

const CustomSearch = ({childToParent}) => {
  const [adressForm, setAdressform] = useState('')
  const [adressCoordinates, setAdresscoordinates] = useState('')   

  
  const handleSubmit = (event) => {
    event.preventDefault()
    setAdressform(event.target.suggest.value)
    
    const myGeocoder = ymaps.geocode(event.target.suggest.value);
    myGeocoder.then(
        (res) => {
          setAdresscoordinates(res.geoObjects.get(0).geometry.getCoordinates());
          console.log(adressCoordinates);
          childToParent(res.geoObjects.get(0).geometry.getCoordinates());
        },

        (err) => {
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
