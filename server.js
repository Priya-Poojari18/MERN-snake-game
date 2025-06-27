 const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB database connected'));

// Routers
const userRouter = require('./routes/userRouter');
const scoreRouter = require('./routes/scoreRouter');
app.use('/user', userRouter);
app.use('/score', scoreRouter);

// Serve static files
app.use(express.static('public'));

// Fallback route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => console.log(`Server is running on port ${port}`));
