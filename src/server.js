const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const PORT = process.env.PORT || 5000;
const DB_URL = 'https://collaborative-art-app-default-rtdb.firebaseio.com';
const DEFAULT_TILE_COLOUR = 'blue';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DB_URL
});

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

const gridSize = { rows: 10, cols: 10 };
const initialGridRef = admin.database().ref('drawing');

io.on('connection', (socket) => {
    console.log('A user connected');

    initialGridRef.once('value', (snapshot) => {
      const initialGrid = snapshot.val() || getDefaultInitialGrid();
      console.log("get inital grid: ", initialGrid);
      socket.emit('initialGridState', initialGrid);
    });

    socket.on('updateTileColor', (data) => {
      socket.broadcast.emit('updateTileColor', data);
    });

    socket.on('wipeTiles', (newGrid) => {
      io.emit('refresh');
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

function getDefaultInitialGrid() {
  const initialGrid = [];
  for (let i = 0; i < gridSize.rows; i++) {
    const row = [];
    for (let j = 0; j < gridSize.cols; j++) {
      row.push({ color: DEFAULT_TILE_COLOUR });
    }
    initialGrid.push(row);
  }
  return initialGrid;
}

exports.setCustomClaims = functions.auth.user().onCreate((user) => {
  // Extract additional user data from the signup request
  const { firstName, bahaiID } = user.customClaims;

  // Set custom claims for the user
  return admin.auth().setCustomUserClaims(user.uid, {
    firstName: firstName,
    bahaiID: bahaiID,
    activeUser: false, // Assuming this starts as false
  });
});

exports.getUserCustomClaims = functions.https.onCall(async (data, context) => {
  try {
    const uid = data.uid;
    const user = await admin.auth().getUser(uid);
    const customClaims = user.customClaims;

    // You can now access the custom claims associated with the user
    console.log('Custom Claims:', customClaims);

    return customClaims;
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError('internal', 'Error getting user custom claims');
  }
});

// Example function to set custom claims
async function setCustomClaims(uid, customClaims) {
  await admin.auth().setCustomUserClaims(uid, customClaims);
}