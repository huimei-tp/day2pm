const express = require("express");
const router = express.Router();

const foodController =
  require("../controllers/foodController");

router.get("/", foodController.getFoods);

router.post("/", foodController.createFood);

router.put("/:id",
  foodController.updateFood);

router.put("/:id/status",
  foodController.updateFoodStatus);

module.exports = router;