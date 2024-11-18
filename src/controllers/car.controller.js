import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Car } from "../models/cars.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Create a new car
const createCar = asyncHandler(async (req, res) => {
  const { title, description, tags, brand, car_type } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const uploadedImages = [];

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const uploaded = await uploadOnCloudinary(req.files[i].path);
      if (uploaded) uploadedImages.push(uploaded.url);
    }
  }

  const carData = {
    title,
    description,
    tags,
    brand,
    car_type,
    owner: req.user._id,
  };

  // Add images to carData
  for (let i = 0; i < uploadedImages.length; i++) {
    carData[`image${i + 1}`] = uploadedImages[i];
  }

  const car = await Car.create(carData);

  return res.status(201).json(new ApiResponse(201, car, "Car created successfully"));
});

// Get all cars for the logged-in user
const getCarsByUser = asyncHandler(async (req, res) => {
  const cars = await Car.find({ owner: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, cars, "User Cars fetched successfully"));
});
// Get all cars
const getAllCars = asyncHandler(async (req, res) => {
  const cars = await Car.find();
  return res
    .status(200)
    .json(new ApiResponse(200, cars, "All Cars fetched successfully"));
});

// Search cars globally by title, description, or tags
const searchCars = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) {
    throw new ApiError(400, "Keyword is required for search");
  }

  const cars = await Car.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
    ],
  });

  return res
    .status(200)
    .json(new ApiResponse(200, cars, "Search results fetched successfully"));
});

// Get a particular car by ID
const getCarById = asyncHandler(async (req, res) => {
  const { carId } = req.params;

  if (!carId) {
    throw new ApiError(400, "Car ID is required");
  }

  const car = await Car.findById(carId);

  if (!car) {
    throw new ApiError(404, "Car not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, car, "Car details fetched successfully"));
});

// Update a car
const updateCar = asyncHandler(async (req, res) => {
  const { carId } = req.params;
  const updates = req.body;

  if (!carId) {
    throw new ApiError(400, "Car ID is required");
  }

  const car = await Car.findOne({ _id: carId, owner: req.user._id });

  if (!car) {
    throw new ApiError(404, "Car not found or unauthorized");
  }

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const uploaded = await uploadOnCloudinary(req.files[i].path);
      if (uploaded) updates[`image${i + 1}`] = uploaded.url;
    }
  }

  Object.keys(updates).forEach((key) => {
    car[key] = updates[key];
  });

  await car.save();

  return res.status(200).json(new ApiResponse(200, car, "Car updated successfully"));
});

// Delete a car
const deleteCar = asyncHandler(async (req, res) => {
  const { carId } = req.params;

  if (!carId) {
    throw new ApiError(400, "Car ID is required");
  }

  const car = await Car.findOneAndDelete({ _id: carId });

  if (!car) {
    throw new ApiError(404, "Car not found or unauthorized");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Car deleted successfully"));
});

export {
  createCar,
  getCarsByUser,
  getAllCars,
  searchCars,
  getCarById,
  updateCar,
  deleteCar,
};
