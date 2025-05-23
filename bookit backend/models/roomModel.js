const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    // roomId: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    // },
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sqft: {
      type: Number,
      required: false,
    },
    capacity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    amenities: {
      type: String,
      required: false,
    },
    availability: {
      type: String,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
