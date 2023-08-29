import React from 'react';

const Tile = ({ color, image, clicked, className, onClick }) => {
  const tileStyle = {
    backgroundColor: color,
    backgroundSize: 'cover',
  };

  return <div className={className} style={tileStyle} onClick={onClick}></div>;
};

export default Tile; 