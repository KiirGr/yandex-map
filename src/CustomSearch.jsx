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
          setPointsListArr(pointsListArrays.concat([{name: "Наименование объекта-"+res.geoObjects.get(0).properties._data.text}]));          
          childToApp(res.geoObjects.get(0).geometry.getCoordinates());
        }        
      )
      .catch(err => childToApp(`Произошла ошибка: ${err}`))
    }

  }, [inputValue])

  const rows = pointsListArrays.map(function(item, index) {
    return <p key={index}>{item.name}</p>;
  });

  return (
      <form onSubmit={handleSubmit}>
        <input type="text" id="suggest" />
        <button type="submit">Отправить</button>
        {/* <div id="address_list" dangerouslySetInnerHTML={{ __html: pointsListArrays }} /> */}
        <div id="address_list">{rows}</div>
      </form>
  );
}

export default CustomSearch;
