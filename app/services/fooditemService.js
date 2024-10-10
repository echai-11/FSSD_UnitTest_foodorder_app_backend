const fooditemRepository = require("../database/repositories/fooditemRepository");
const expressAsyncHandler = require("express-async-handler");

const createFooditem = expressAsyncHandler(async (req, res) => {
  try {
    const { name, description, image, categoryId, cuisineId, isVeg } = req.body;
    const result = await fooditemRepository.createFooditem(name, description, image, categoryId, cuisineId, isVeg);

    if (result) {
      res.status(201).json({
        message: "Fooditem created successfully",
      });
    } else {
      res.status(400);
      throw new Error(`Fooditem creation failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating fooditem",
      error: err.message,
    });
  }
});

const editFooditem = expressAsyncHandler(async (req, res) => {
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.editFooditem(fooditemId, req.body);

    if (result) {
      res.status(200).json({
        message: "Fooditem is successfully edited",
      });
    } else {
      res.status(400);
      throw new Error(`Fooditem editing failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error editing fooditem details",
      error: err.message,
    });
  }
});

const deleteFooditem = expressAsyncHandler(async (req, res) => {
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.deleteFooditem(fooditemId);

    if (result) {
      res.status(200).json({
        message: "Fooditem is successfully deleted",
      });
    } else {
      res.status(400);
      throw new Error(`Fooditem deletion failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting fooditem",
      error: err.message,
    });
  }
});

const getFooditem = expressAsyncHandler(async (req, res) => {
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.getFooditem(fooditemId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Sucessfully fetched fooditem details.",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the fooditem based on the fooditem id: ${fooditemId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching fooditem details",
      error: err.message,
    });
  }
});

const getAllFooditems = expressAsyncHandler(async (req, res) => {
  try {
    const result = await fooditemRepository.getAllFooditems();
    res.status(200).json({
      data: result,
      message: "Successfully fetched all fooditems.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching fooditems",
      error: err.message,
    });
  }
});

module.exports = {
  createFooditem,
  editFooditem,
  deleteFooditem,
  getFooditem,
  getAllFooditems,
};
