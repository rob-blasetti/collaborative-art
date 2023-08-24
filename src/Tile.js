import React from 'react';

const Tile = ({ color, onClick }) => {
  return (
    <div
      className="tile"
      style={{ 
        width: '30px', 
        height: '30px', 
        display: 'inline-block',
        border: '1px solid black', 
        backgroundColor: color 
      }}
      onClick={onClick}
    ></div>
  );
};

export default Tile;