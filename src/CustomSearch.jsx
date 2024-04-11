import React, {useState, useRef, useEffect} from "react";

const CustomSearch = ({childToParent}) => {
  
  const handleSubmit = (event) => {
    event.preventDefault()

    // FIXME: store input's value in the component's state
    const myGeocoder = ymaps.geocode(event.target.suggest.value);
    myGeocoder.then(
         // FIXME: use separated callbacks properties for positive and negative cases
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
