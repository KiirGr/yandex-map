import React from "react";

const CustomSearch = ({childToApp}) => {

  const ymapsVar = window.ymaps;
  
  const handleSubmit = (event) => {
    event.preventDefault()

    // FIXME: store input's value in the component's state
    const myGeocoder = ymapsVar.geocode(event.target.suggest.value);
    myGeocoder
      .then(
         // +++DONE+++ FIXME: use separated callbacks properties for positive and negative cases
        res => {
          childToApp(res.geoObjects.get(0).geometry.getCoordinates());
        }        
      )
      .catch(err => childToApp(`Произошла ошибка: ${err}`))
  }

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
      </form>
  );
}

export default CustomSearch;
