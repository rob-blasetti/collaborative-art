const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const serviceAccount = require('./serviceAccountKey.json');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
app.use(cors({ origin: 'http://localhost:3000' }));

const PORT = process.env.PORT || 5000;
const DB_URL = 'https://collaborative-art-app-default-rtdb.firebaseio.com';
const DEFAULT_TILE_COLOUR = 'blue';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DB_URL
});

const auth = admin.auth();

server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

const gridSize = { rows: 10, cols: 10 };
const initialGridRef = admin.database().ref('drawing');

app.get('/activeUsersCount', async (req, res) => {
  try {
    const count = await countActiveUsers();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch active users count' });
  }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    initialGridRef.once('value', (snapshot) => {
      const initialGrid = snapshot.val() || getDefaultInitialGrid();
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

async function countActiveUsers() {
  try {
      // Get a list of all users.
      const users = await auth.listUsers();

      // Initialize a counter to track the number of users that are active.
      let activeUserCount = 0;

      // Iterate through the list of users.
      users.users.forEach(user => {
          // Parse the displayName to get user metadata
          const userData = JSON.parse(user.displayName || '{}');
          
          // Get the value of the `isActive` property.
          const isActive = userData.isActive;

          // If the user is active, increment the counter.
          if (isActive) {
              activeUserCount++;
          }
      });

      // Print the number of active users.
      console.log(activeUserCount);
      return activeUserCount;
  } catch (error) {
      console.error('Error counting active users:', error);
  }
}

module.exports = { countActiveUsers };
