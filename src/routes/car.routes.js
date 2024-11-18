import { Router } from "express";
import {
  createCar,
  getCarsByUser,
  searchCars,
  getCarById,
  updateCar,
  deleteCar,
  getAllCars,
} from "../controllers/car.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(
  verifyJWT,
  upload.array("images", 10), 
  createCar
);

router.route("/my-cars").get(verifyJWT, getCarsByUser);
router.route("/all-cars").get(verifyJWT, getAllCars);


router.route("/search").get(searchCars);

router.route("/:carId").get(getCarById);

router.route("/:carId").patch(
  verifyJWT,
  upload.array("images", 10),
  updateCar
);

router.route("/:carId").delete(deleteCar);

export default router;
