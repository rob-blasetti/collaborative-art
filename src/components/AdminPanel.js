import React, { useState, useEffect } from 'react';
import { fetchGridDimensions, updateGridDimensions } from '../gridDimensions';
import firebase from '../firebase';
import io from 'socket.io-client';

const AdminPanel = ({ isAdmin }) => {
  const serverAddress = 'http://localhost:5000';
  const socket = io(serverAddress);
  const [newRows, setNewRows] = useState('');
  const [newCols, setNewCols] = useState('');

  const [gridDimensions, setGridDimensions] = useState(null);

  const handleWipe = () => {
    const initialTileColour = 'blue';
    const gridSize = { rows: newRows, cols: newCols };
    const newGrid = Array.from({ length: gridSize.rows }, () =>
      Array.from({ length: gridSize.cols }, () => ({ color: initialTileColour }))
    );
    // Set new grid dimensions and update the grid
    updateGridDimensions(newRows, newCols)
      .then(() => {        
        const drawingRef = firebase.database().ref('drawing');
        newGrid.forEach((row, rowIndex) => {
          row.forEach((tile, colIndex) => {
            drawingRef.child(`${rowIndex}-${colIndex}`).set({ color: initialTileColour });
          });
        });
        
        socket.emit('wipeTiles', newGrid);
      })
      .catch(error => {
        console.error('Error updating grid dimensions:', error);
      });
  };

  const handleGridDimensionsChange = (rows, cols) => {
    updateGridDimensions(rows, cols)
      .then(() => {
        // Fetch updated grid dimensions
        fetchGridDimensions()
          .then(updatedGridDimensions => {
            setGridDimensions(updatedGridDimensions);
          })
          .catch(error => {
            console.error('Error fetching updated grid dimensions:', error);
          });
      })
      .catch(error => {
        console.error('Error updating grid dimensions:', error);
      });
  };

  useEffect(() => {
    // Fetch initial grid dimensions
    fetchGridDimensions()
      .then(initialGridDimensions => {
        setGridDimensions(initialGridDimensions);
      })
      .catch(error => {
        console.error('Error fetching initial grid dimensions:', error);
      });
  }, []);

  if (isAdmin) {
    return (
      <div className="admin-panel">
        <h3>Admin Panel</h3>
        <button onClick={handleWipe}>Wipe</button>
        <div>
          <label>
            New Rows:
            <input
              type="number"
              value={newRows}
              onChange={e => setNewRows(e.target.value)}
            />
          </label>
          <label>
            New Columns:
            <input
              type="number"
              value={newCols}
              onChange={e => setNewCols(e.target.value)}
            />
          </label>
          <button onClick={() => handleGridDimensionsChange(newRows, newCols)}>Update Grid Dimensions</button>
        </div>
        <div>
          {gridDimensions && (
            <p>
              Current Grid Dimensions: {gridDimensions.rows} rows x {gridDimensions.cols} columns
            </p>
          )}
        </div>
      </div>
    );
  } else {
    return null; // Don't render anything if the user is not an admin
  }
};

export default AdminPanel;
