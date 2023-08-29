import { ref, get, set } from 'firebase/database';
import firebase from './firebase'; 

// Function to fetch grid dimensions from the database
const fetchGridDimensions = async () => {
  const gridDimensionsRef = ref(firebase.database(), 'gridDimensions');
  try {
    const snapshot = await get(gridDimensionsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.warn("No grid dimensions found in the database.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching grid dimensions:', error);
    throw error;
  }
};

// Function to update grid dimensions in the database
const updateGridDimensions = async (newRows, newCols) => {
  const gridDimensionsRef = ref(firebase.database(), 'gridDimensions');
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
