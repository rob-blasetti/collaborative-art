// Import necessary Firebase Realtime Database SDK functions
const { getDatabase, ref, get, set } = require('firebase/database');

// Define a function to fetch grid dimensions from the database
const fetchGridDimensions = async () => {
  const database = getDatabase();
  const gridDimensionsRef = ref(database, 'gridDimensions');
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
  const database = getDatabase();
  const gridDimensionsRef = ref(database, 'gridDimensions');
  const updatedGridDimensions = { rows: newRows, cols: newCols };
  try {
    await set(gridDimensionsRef, updatedGridDimensions);
    console.log('Grid dimensions updated successfully');
  } catch (error) {
    console.error('Error updating grid dimensions:', error);
    throw error;
  }
};

module.exports = {
  fetchGridDimensions,
  updateGridDimensions
};
