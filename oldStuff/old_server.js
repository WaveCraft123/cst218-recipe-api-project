const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load environment variables from .env
require("dotenv").config();

const User = require("./models/User");
const Recipe = require("./models/Recipe");
const { requireAuth } = require("./middleware/auth");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Assignment 16 starter is running" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "An account with that email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    return res.status(201).json({
      message: "User registered successfully",
      data: { userId: user._id, email: user.email }
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful", 
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Protected "who am I" route
app.get("/profile", requireAuth, (req, res) => {
  try {
    return res.status(200).json({
      message:"You are authenticated", 
      userId: req.userId,
      email: req.email
      });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Mount Recipe routes
app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
