const express = require('express');
const router = express.Router();

const {
  createRoom,
  getRoom,
  getRooms,
  deleteRoom,
  updateRoom,
  getUserRooms,
} = require('../controllers/roomsController');

// const requireAuth = require("../middleware/requireAuth");

// router.use(requireAuth);

// Get all rooms
router.get('/', getRooms);

router.get('/my-rooms', getUserRooms);

// Get a specific room
router.get('/:id', getRoom);

// POST a new room
router.post('/add', createRoom);

// Delete a room
router.delete('/remove/:id', deleteRoom);

// Update a room
router.patch('/edit/:id', updateRoom);

module.exports = router;
