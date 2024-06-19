import React , {useState, useEffect} from "react";

function CustomSearch({childToApp}) {

  const ymapsVar = window.ymaps;
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault()
    setInputValue(event.target.suggest.value);
  }

  const [pointsListArrays, setPointsListArr] = useState([]);

  useEffect(() => {

    if (inputValue) {
      const resultCoordinates = ymapsVar.geocode(inputValue);
      
      resultCoordinates
      .then(
        res => {
          // const geoObject = res.geoObjects.get(0);
          // console.log(res.geoObjects.properties);
          // debugger
          setPointsListArr(pointsListArrays.concat(["<p>Наименование объекта-"+res.geoObjects.get(0).properties._data.text+"</p>"]));          
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
        <div dangerouslySetInnerHTML={{ __html: pointsListArrays }} />
      </form>
  );
}

export default CustomSearch;
