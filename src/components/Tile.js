import React from 'react';
// import './Tile.css'; // Import your custom stylesheet for Tile component

const Tile = ({ color, image, clicked, onClick }) => {
  const tileStyle = {
    backgroundColor: clicked ? 'transparent' : color,
    backgroundSize: 'cover',
  };

  return <div className="tile" style={tileStyle} onClick={onClick}></div>;
};

export default Tile;
