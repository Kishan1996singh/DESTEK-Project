const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./route/userRoutes');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Static route for serving uploaded images
app.use('/uploads', express.static('uploads'));

// Set up routes
app.use('/api', userRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
