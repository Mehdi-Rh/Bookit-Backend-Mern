require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log('req.path', req.path);
  console.log('req.method', req.method);
  next();
});

// connect to mongodb
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT;
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(port, () => console.log('Connecting to db & listening to port ', port));
  })
  .catch((err) => console.log('MongDB connection error: ', err));

// // routes
app.get('/', (req, res) => {
  res.json({ message: 'WELCOME' });
});
const roomsRoutes = require('./routes/roomRoute');
app.use('/api/rooms', roomsRoutes);

const usersRoutes = require('./routes/userRoute');
app.use('/api/user', usersRoutes);

const bookinRoutes = require('./routes/bookingRoute');
app.use('/api/bookings', bookinRoutes);
