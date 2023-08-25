import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';
import Tile from './Tile';
import firebase from '../firebase';
import mightImage from '../img/might.png';


const CollaborativeArt = () => {
  const socket = io('http://localhost:5000');
  const [prevClickDate, setPrevClickDate] = useState(null);
  
  const canvasRef = useRef(null);
  const gridSize = { rows: 50, cols:50 };

  const initialGrid = Array.from({ length: gridSize.rows }, () =>
  Array.from({ length: gridSize.cols }, () => ({
    color: 'green',
    image: mightImage,
    clicked: false,
  }))
);

const [grid, setGrid] = useState(initialGrid);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    socket.on('wipeTiles', () => {
      socket.emit('fetchInitialGrid');
    });

    socket.on('initialGridState', (initialGridData) => {
      const updatedInitialGrid = Array.from({ length: gridSize.rows }, () =>
        Array.from({ length: gridSize.cols }, () => ({ color: 'blue' }))
      );

      for (const key in initialGridData) {
        const [row, col] = key.split('-').map(Number);
        const { color } = initialGridData[key];
        
        updatedInitialGrid[row][col] = { color };
      }

      setGrid(updatedInitialGrid);
    });

    canvas.on('mouse:down', (event) => {
      const { x, y } = event.pointer;
      const drawingData = { x, y, color: 'black' };
      socket.emit('draw', drawingData);
    });

    socket.on('draw', (data) => {
      const { x, y } = data;
      const circle = new fabric.Circle({ radius: 5, fill: 'black', left: x, top: y });
      canvas.add(circle);
    });

    socket.on('updateTileColor', (data) => {
      const { row, col, color } = data;
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[row][col].color = color;
        return newGrid;
      });
    });

    return () => {
      canvas.off();
      socket.off('draw');
      socket.off('updateTileColor');
      socket.off('wipeTiles');
    };
  }, []);

  const handleTileClick = (row, col) => {
    const newGrid = [...grid];
    const today = new Date().toDateString();
    
    if (prevClickDate !== today) {
      newGrid[row][col].color = 'transparent';
      newGrid[row][col].clicked = true;
      setGrid(newGrid);
      
      const drawingRef = firebase.database().ref('drawing');
      drawingRef.child(`${row}-${col}`).set({ color: 'transparent' });
      
      socket.emit('updateTileColor', { row, col, color: 'transparent' });
    } else {
      console.log('No clicks left today.')
    }
  };

  const handleWipe = () => {
    const newGrid = Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => ({ color: 'blue' }))
    );
    setGrid(newGrid);

    const drawingRef = firebase.database().ref('drawing');
    newGrid.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        drawingRef.child(`${rowIndex}-${colIndex}`).set({ color: 'blue' });
      });
    });

    socket.emit('wipeTiles', newGrid);
  };

  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((tile, colIndex) => (
          <Tile
            key={colIndex}
            color={tile.color}
            clicked={tile.clicked} // Pass the clicked state from your grid data
            onClick={() => handleTileClick(rowIndex, colIndex)}
          />
        ))}
      </div>
    ));
  };
    
  const updateInitialGridWithImage = async (imageColours) => {
    console.log('Function call.');

    const drawingRef = firebase.database().ref('drawing');
  
    try {
      for (let row = 0; row < imageColours.length; row++) {
        for (let col = 0; col < imageColours[row].length; col++) {
          const color = imageColours[row][col];
          await drawingRef.child(`${row}-${col}`).set({ color });
        }
      }
  
      console.log('Initial grid updated with image.');
    } catch (error) {
      console.error('Error updating initial grid with image:', error);
    }
  };

  return (
    <div>
      <h2>Collaborative Art</h2>
      <button onClick={handleWipe}>Wipe</button>
      <div className="grid-image-container" style={{ backgroundImage: `url(${mightImage})` }}>
        <div className="grid-image">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row" style={{ '--cols': gridSize.cols, '--rows': gridSize.rows }}>
              {row.map((tile, colIndex) => (
                <Tile
                  key={colIndex}
                  color={tile.color}
                  image={mightImage}
                  clicked={tile.clicked}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborativeArt;
