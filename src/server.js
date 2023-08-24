const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK with service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://collaborative-art-app-default-rtdb.firebaseio.com'
});

// Define a route for /some-endpoint
app.get('/some-endpoint', (req, res) => {
  res.json({ message: 'Hello from /some-endpoint' });
});

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

const gridSize = { rows: 10, cols: 10 };

const initialGridRef = admin.database().ref('drawing');

io.on('connection', (socket) => {
    console.log('A user connected');

    // Fetch the initial grid state from the Firebase database
    initialGridRef.once('value', (snapshot) => {
      const initialGrid = snapshot.val() || getDefaultInitialGrid();
      console.log("get inital grid: ", initialGrid);
      socket.emit('initialGridState', initialGrid);
    });

    // Listen for the 'draw' event from clients
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
      row.push({ color: 'blue' }); // Default color is blue
    }
    initialGrid.push(row);
  }
  return initialGrid;
}
