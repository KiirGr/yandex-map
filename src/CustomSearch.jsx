import React, {useState, useRef, useEffect} from "react";

const CustomSearch = ({childToParent}) => {
  
  const handleSubmit = (event) => {
    event.preventDefault()
    
    const myGeocoder = ymaps.geocode(event.target.suggest.value);
    myGeocoder.then(
        (res) => {
          childToParent(res.geoObjects.get(0).geometry.getCoordinates());
        },

        (err) => {
          childToParent('Не найдено');
        }
    );    
  }

  return (
    <>      
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
      </form>
    </>
  );
}

export default CustomSearch;
