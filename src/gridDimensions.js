import { ref, get, set } from 'firebase/database';
import firebase from './firebase'; 

// Define a function to fetch grid dimensions from the database
const fetchGridDimensions = async () => {
  const gridDimensionsRef = ref(firebase.database(), 'gridDimensions');
  try {
    const snapshot = await get(gridDimensionsRef);
    const gridDimensions = snapshot.val();
    return gridDimensions;
  } catch (error) {
    console.error('Error fetching grid dimensions:', error);
    throw error;
  }
};

const updateGridDimensions = async (newRows, newCols) => {
  const gridDimensionsRef = ref(firebase.database(), 'gridDimensions');
  
  // Validation checks
  if (isNaN(newRows) || isNaN(newCols) || newRows <= 0 || newCols <= 0) {
    console.error("Invalid grid dimensions:", { rows: newRows, cols: newCols });
    throw new Error("Invalid grid dimensions.");
  }

  const updatedGridDimensions = { rows: parseInt(newRows, 10), cols: parseInt(newCols, 10) }; // Ensure the values are numbers
  try {
    await set(gridDimensionsRef, updatedGridDimensions);
    console.log('Grid dimensions updated successfully:', updatedGridDimensions);
  } catch (error) {
    console.error('Error updating grid dimensions:', error);
    throw error;
  }
};

export {
  fetchGridDimensions,
  updateGridDimensions
};
