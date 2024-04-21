import React , {useState, useEffect} from "react";

function CustomSearch({childToApp}) {

  const ymapsVar = window.ymaps;
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault()
    // +++DONE+++ FIXME: store input's value in the component's state
    setInputValue(event.target.suggest.value);    
  }

  useEffect(() => {

    if (inputValue) {
      const resultCoordinates = ymapsVar.geocode(inputValue);
      
      resultCoordinates
      .then(
         // +++DONE+++ FIXME: use separated callbacks properties for positive and negative cases
        res => {
          childToApp(res.geoObjects.get(0).geometry.getCoordinates());
        }        
      )
      .catch(err => childToApp(`Произошла ошибка: ${err}`))
    }

  }, [inputValue])

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
      </form>
  );
}

export default CustomSearch;
