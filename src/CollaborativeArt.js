import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';
import Tile from './Tile'; // Import your Tile component
import firebase from './firebase';
import { redDuckColours, duckColours } from './imageStore';

const CollaborativeArt = () => {
  const socket = io('http://localhost:5000');
  const [prevClickDate, setPrevClickDate] = useState(null);
  
  const canvasRef = useRef(null);
  const gridSize = { rows: 10, cols: 10 };

  const initialGrid = Array.from({ length: gridSize.rows }, () =>
    Array.from({ length: gridSize.cols }, () => ({ color: 'blue' }))
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

    // Clean up event listeners when component unmounts
    return () => {
      canvas.off();
      socket.off('draw');
      socket.off('updateTileColor');
      socket.off('wipeTiles'); // Make sure to remove this event listener
    };
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  const handleTileClick = (row, col) => {
    const newGrid = [...grid];

    const today = new Date().toDateString();

    if (prevClickDate !== today) {
      newGrid[row][col].color = 'green';
      setGrid(newGrid);

      // Update the color data in the Firebase Realtime Database
      const drawingRef = firebase.database().ref('drawing');
      drawingRef.child(`${row}-${col}`).set({ color: 'green' });

      // Emit the updated tile color to other users
      socket.emit('updateTileColor', { row, col, color: 'green' });

      // Store the current date as the previous click date
      setPrevClickDate(today);
    } else {
      console.log('No clicks left today.')
    }
  };

  const handleWipe = () => {
    const newGrid = Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => ({ color: 'blue' }))
    );
    setGrid(newGrid);

    // Update tile colors in the Firebase Realtime Database
    const drawingRef = firebase.database().ref('drawing');
    newGrid.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        drawingRef.child(`${rowIndex}-${colIndex}`).set({ color: 'blue' });
      });
    });

    // Emit the wiped tile colors to other users
    socket.emit('wipeTiles', newGrid);
  };

  // Render the grid of tiles
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((tile, colIndex) => (
          <Tile
            key={colIndex}
            color={tile.color}
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
      <button onClick={() => updateInitialGridWithImage(duckColours)}>Set Duck Image</button>
      <button onClick={() => updateInitialGridWithImage(redDuckColours)}>Set Red Duck Image</button>
      <div className="grid-container">{renderGrid()}</div>
    </div>
  );
};

export default CollaborativeArt;
