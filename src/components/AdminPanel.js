import React, { useState, useEffect } from 'react';
import { fetchGridDimensions, updateGridDimensions } from '../gridDimensions';
import firebase from '../firebase';
import io from 'socket.io-client';
import '../style/AdminPanel.css';

const AdminPanel = ({ isAdmin }) => {
  const serverAddress = 'http://localhost:5000';
  const socket = io(serverAddress);
  const [newRows, setNewRows] = useState('');
  const [newCols, setNewCols] = useState('');

  const [gridDimensions, setGridDimensions] = useState(null);

  const handleWipe = async () => {
    const defaultColor = 'green';

    // Fetch the current grid dimensions
    const fetchedGridDimensions = await fetchGridDimensions();

    const rows = fetchedGridDimensions.rows || 50;  // default to 50 if not valid
    const cols = fetchedGridDimensions.cols || 50;  // default to 50 if not valid
    
    const newGrid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ color: defaultColor }))
    );

    const drawingRef = firebase.database().ref('drawing');

    // Construct the data to set in Firebase
    const dataToUpdate = {};
    newGrid.forEach((row, rowIndex) => {
        row.forEach((tile, colIndex) => {
            dataToUpdate[`${rowIndex}-${colIndex}`] = { color: defaultColor };
        });
    });

    // Set the entire 'drawing' reference at once
    try {
        await updateGridDimensions(rows, cols);
        await drawingRef.set(dataToUpdate);
        console.log("Database updated successfully after wipe.");

        window.location.reload();
    } catch (error) {
        console.error("Error updating database after wipe:", error);
    }

    socket.emit('wipeTiles', newGrid);
};

const handleClear = async () => {
  const defaultColor = 'transparent';

  // Fetch the current grid dimensions
  const fetchedGridDimensions = await fetchGridDimensions();

  const rows = fetchedGridDimensions.rows || 50;  // default to 50 if not valid
  const cols = fetchedGridDimensions.cols || 50;  // default to 50 if not valid
  
  const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ color: defaultColor }))
  );

  const drawingRef = firebase.database().ref('drawing');

  // Construct the data to set in Firebase
  const dataToUpdate = {};
  newGrid.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
          dataToUpdate[`${rowIndex}-${colIndex}`] = { color: defaultColor };
      });
  });

  // Set the entire 'drawing' reference at once
  try {
      await updateGridDimensions(rows, cols);
      await drawingRef.set(dataToUpdate);
      console.log("Database updated successfully after wipe.");

      window.location.reload();
  } catch (error) {
      console.error("Error updating database after wipe:", error);
  }

  socket.emit('wipeTiles', newGrid);
};

const handleGridDimensionsChange = (rows, cols) => {
  const defaultColor = 'green';

  // Create a new grid with tiles set to the default color
  const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ color: defaultColor }))
  );

  const drawingRef = firebase.database().ref('drawing');

  // Construct the data to set in Firebase
  const dataToUpdate = {};
  newGrid.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
          dataToUpdate[`${rowIndex}-${colIndex}`] = { color: defaultColor };
      });
  });

  updateGridDimensions(rows, cols)
      .then(() => {
          // Set the entire 'drawing' reference at once
          return drawingRef.set(dataToUpdate);
      })
      .then(() => {
          // Fetch updated grid dimensions
          return fetchGridDimensions();
      })
      .then(updatedGridDimensions => {
          setGridDimensions(updatedGridDimensions);
          window.location.reload();
      })
      .catch(error => {
          console.error('Error updating grid dimensions or updating tiles:', error);
      });
};

  useEffect(() => {
    if (gridDimensions) {
        setNewRows(gridDimensions.rows.toString());
        setNewCols(gridDimensions.cols.toString());
    }
  }, [gridDimensions]);

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
        <div className="input-container">
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
        </div>
        <div className="buttons-container">
            <button onClick={() => handleGridDimensionsChange(newRows, newCols)}>Update Grid Dimensions</button>
            <button onClick={handleWipe}>Wipe</button>
            <button onClick={handleClear}>Clear</button>
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
