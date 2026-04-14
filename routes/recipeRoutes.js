const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const validateRecipe = require("../middleware/validateRecipe");
const validateRecipeId = require("../middleware/validateRecipeId");


// Import controller functions (you will create these next)
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");

// Example routes
router.get("/", requireAuth, getAllRecipes);
router.get("/:id", requireAuth, validateRecipeId, getRecipe);
router.post("/", requireAuth, validateRecipe, createRecipe);
router.put("/:id", requireAuth, validateRecipeId, updateRecipe);
router.delete("/:id", requireAuth, validateRecipeId, deleteRecipe);

module.exports = router;