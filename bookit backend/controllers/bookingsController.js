const Booking = require('../models/bookingModel.js');
const mongoose = require('mongoose');

// Get a single booking
const getBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such booking found');
  }
  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).send('No such booking found');
  }
  res.status(200).json(booking);
};

// Create new booking
const createBooking = async (req, res) => {
  const { user_id, room_id, check_in, check_out } = req.body;

  let emptyFields = [];

  // if (!title) {
  //   emptyFields.push("title");
  // }
  // if (!description) {
  //   emptyFields.push("description");
  // }
  // if (!category) {
  //   emptyFields.push("category");
  // }
  // if (!dueDate) {
  //   emptyFields.push("dueDate");
  // }
  // if (!status) {
  //   emptyFields.push("status");
  // }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
  }

  // add to the database
  try {
    const booking = await Booking.create({
      user_id,
      room_id,
      check_in,
      check_out,
    });

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such booking found');
  }

  const booking = await Booking.findOneAndDelete({ _id: id });

  if (!booking) {
    return res.status(404).send('No such booking found');
  }

  res.status(200).json(booking);
};

// update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such booking found');
  }

  const booking = await Booking.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(booking);
};

const getUserBookings = async (req, res) => {
  const userId = req.query.userId;

  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    let sort = req.query.sort || 'bookingId';
    const sortBy = req.query.sortBy || 'asc';

    const bookings = await Booking.find({ user_id: userId });

    const total = await Booking.countDocuments({});

    const response = {
      error: null,
      total,
      page: page + 1,
      limit,
      bookings,
      // categories: categoryOptions,
      // statuses: statusOptions,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' + err });
  }
};

module.exports = {
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
  getUserBookings,
};
