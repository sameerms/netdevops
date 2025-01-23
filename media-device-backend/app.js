const express = require('express');
const cors = require('cors');
const devicesRouter = require('./routes/devices');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Routes
app.use('/api/devices', devicesRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running at http://localhost:${PORT}`);
});
