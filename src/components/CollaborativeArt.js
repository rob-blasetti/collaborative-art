import React, { useEffect, useState, useRef } from 'react';
import { fabric } from 'fabric';
import io from 'socket.io-client';
import { Tile } from '../components';
import firebase from '../firebase';
import mightImage from '../img/might.png';
import { fetchGridDimensions } from '../gridDimensions';


const CollaborativeArt = () => {
  const socket = io('http://localhost:5000');
  const [prevClickDate, setPrevClickDate] = useState(null);
  
  const canvasRef = useRef(null);
  const gridSize = { rows: 50, cols:50 };
  const [gridDimensions, setGridDimensions] = useState({ rows: 50, cols: 50 }); // default values
  
  
  const initialGrid = Array.from({ length: gridDimensions.rows }, () =>
  Array.from({ length: gridDimensions.cols }, () => ({
    color: 'green',
    image: mightImage,
    clicked: false,
  }))
  );
  
  const [grid, setGrid] = useState(initialGrid);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    
    // Fetch grid dimensions from Firebase on component mount
    fetchGridDimensions().then(fetchedGridDimensions => {
      setGridDimensions(fetchedGridDimensions);
      
      const drawingRef = firebase.database().ref('drawing');
      drawingRef.on('value', (snapshot) => {
        const drawingData = snapshot.val();
    
        const updatedGrid = Array.from({ length: fetchedGridDimensions.rows }, () =>
            Array.from({ length: fetchedGridDimensions.cols }, () => ({ color: 'green', image: mightImage, clicked: false }))
        );
    
        for (const key in drawingData) {
            const [row, col] = key.split('-').map(Number);
            const { color } = drawingData[key];
    
            // Check if the row and col exist in updatedGrid
            if (updatedGrid[row] && updatedGrid[row][col]) {
                updatedGrid[row][col].color = color;
            } else {
                console.warn(`No grid element found for row: ${row}, col: ${col}`);
            }
        }
    
        setGrid(updatedGrid);
        setLoading(false);
    });

      return () => {
          drawingRef.off();
      };
  });
}, []);
  
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);
  

    socket.on('wipeTiles', () => {
      socket.emit('fetchInitialGrid');
    });

    socket.on('initialGridState', (initialGridData) => {
      const updatedInitialGrid = Array.from({ length: gridSize.rows }, () =>
        Array.from({ length: gridSize.cols }, () => ({ color: 'green' }))
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

    const user = firebase.auth().currentUser;

    if (user) {
      const newGrid = [...grid];
      const today = new Date().toDateString();
      
      if (prevClickDate !== today) {
        setPrevClickDate(today);

        newGrid[row][col].color = 'transparent';
        newGrid[row][col].clicked = true;
        setGrid(newGrid);
        
        const drawingRef = firebase.database().ref('drawing');
        drawingRef.child(`${row}-${col}`).set({ color: 'transparent' });
        
        socket.emit('updateTileColor', { row, col, color: 'transparent' });

        const metadata = JSON.parse(user.displayName);
        metadata.isActive = true;

        user.updateProfile({
          displayName: JSON.stringify(metadata)
        });
        console.log(user);

      } else {
        console.log('No clicks left today.')
      }
    } else {
      console.log('User not authenticated. Please log in to click tiles.');
    }
  };
  
  if (loading) { return <div>Loading...</div>; }

  return (
    <div>
      <h2>Collaborative Art</h2>
      <div className="parent-container">
        <div className="grid-image-container" style={{ backgroundImage: `url(${mightImage})` }}>
          <div className="grid-image">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="row" style={{ '--cols': grid[0].length, '--rows': grid.length }}>
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
    </div>
  );
};

export default CollaborativeArt;
