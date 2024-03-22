import React from "react";

const CustomMap = () => {

  const width = 600
  const height = 400
  const dimensions = {
    width: `${width}px`,
    height: `${height}px`
  }

  return (
    <>      
      <div id="map" style={dimensions}></div>
    </>
  );
}

export default CustomMap;
