const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");

// Import controller functions (you will create these next)
const {
  loginUser,
  registerUser,
  getProfile
} = require("../controllers/authController");

// Example routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/profile", requireAuth, getProfile);

module.exports = router;