const Room = require('../models/roomModel.js');
const mongoose = require('mongoose');

// Get all rooms
const getRooms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    let sort = req.query.sort || 'roomId';
    const sortBy = req.query.sortBy || 'asc';

    // let statusIds = req.query.status_ids || "All";
    // let categoryIds = req.query.category_ids || "All";

    // const categoryOptions = [
    //   { id: "work", label: "Work" },
    //   { id: "personal", label: "Personal" },
    //   { id: "shopping", label: "Shopping" },
    //   { id: "home", label: "Home" },
    //   { id: "other", label: "Other" },
    // ];

    // const statusOptions = [
    //   { id: "todo", label: "To Do" },
    //   { id: "inprogress", label: "In Progress" },
    //   { id: "completed", label: "Completed" },
    // ];

    // const getCategory = (categoryIds) => {
    //   if (categoryIds === "All") {
    //     return categoryOptions.map((category) => category.label);
    //   } else {
    //     const categories = categoryIds.split(",").map((id) => {
    //       return categoryOptions.find((category) => category.id === id).label;
    //     });
    //   }
    // };

    // const getStatus = (statusIds) => {
    //   if (statusIds === "All") {
    //     return statusOptions.map((status) => status.label);
    //   } else {
    //     const statuses = statusIds.split(",").map((id) => {
    //       return statusOptions.find((status) => status.id === id).label;
    //     });
    //   }
    // };

    // const user_id = req.user._id;

    const rooms = await Room.find();
    // const rooms = await Room.find({
    // userId: user_id,
    // title: { $regex: search, $options: "i" },
    // });
    // .where("category")
    // .in(getCategory(categoryIds))
    // .where("status")
    // .in(getStatus(statusIds))
    // .sort({ [sort]: sortBy })
    // .skip(page * limit)
    // .limit(limit);

    const total = await Room.countDocuments({
      // category: { $in: [...getCategory(categoryIds)] },
      // status: { $in: [...getStatus(statusIds)] },
      // userId: user_id,
      // title: { $regex: search, $options: "i" },
    });

    const response = {
      error: null,
      total,
      page: page + 1,
      limit,
      rooms,
      // categories: categoryOptions,
      // statuses: statusOptions,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' + err });
  }
};

// Get a single room
const getRoom = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such room found');
  }
  const room = await Room.findById(id);

  if (!room) {
    return res.status(404).send('No such room found');
  }
  res.status(200).json(room);
};

// Create new room
const createRoom = async (req, res) => {
  const {
    name,
    description,
    sqft,
    capacity,
    location,
    address,
    amenities,
    availability,
    price_per_hour,
    user_id,
    image,
  } = req.body;

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
    const room = await Room.create({
      name,
      description,
      sqft,
      capacity,
      location,
      address,
      amenities,
      availability,
      price_per_hour,
      user_id,
      image,
    });

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a room
const deleteRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such room found');
  }

  const room = await Room.findOneAndDelete({ _id: id });

  if (!room) {
    return res.status(404).send('No such room found');
  }

  res.status(200).json(room);
};

// update a room
const updateRoom = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No such room found');
  }

  const room = await Room.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(room);
};

const getUserRooms = async (req, res) => {
  const userId = req.query.userId;

  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    let sort = req.query.sort || 'roomId';
    const sortBy = req.query.sortBy || 'asc';

    const rooms = await Room.find({ user_id: userId });

    const total = await Room.countDocuments({});

    const response = {
      error: null,
      total,
      page: page + 1,
      limit,
      rooms,
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
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom,
  getUserRooms,
};
