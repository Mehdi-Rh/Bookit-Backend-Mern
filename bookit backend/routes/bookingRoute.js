const express = require('express');
const router = express.Router();

const {
  createBooking,
  getBooking,
  deleteBooking,
  updateBooking,
  getUserBookings,
} = require('../controllers/bookingsController');

// Get all bookings

router.get('/my-bookings', getUserBookings);

// Get a specific booking
router.get('/:id', getBooking);

// POST a new booking
router.post('/add', createBooking);

// Delete a booking
router.delete('/remove/:id', deleteBooking);

// Update a booking
router.patch('/edit/:id', updateBooking);

module.exports = router;
