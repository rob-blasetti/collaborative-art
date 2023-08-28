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

// Define a function to update grid dimensions in the database
const updateGridDimensions = async (newRows, newCols) => {
  const gridDimensionsRef = ref(firebase.database(), 'gridDimensions');
  const updatedGridDimensions = { rows: newRows, cols: newCols };
  try {
    await set(gridDimensionsRef, updatedGridDimensions);
    console.log('Grid dimensions updated successfully');
  } catch (error) {
    console.error('Error updating grid dimensions:', error);
    throw error;
  }
};

export {
  fetchGridDimensions,
  updateGridDimensions
};
