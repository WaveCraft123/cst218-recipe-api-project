const express = require("express");
const mongoose = require("mongoose");

// Load environment variables from .env
require("dotenv").config();

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());

const logger = require("./middleware/logger");
app.use(logger);

const PORT = process.env.PORT || 3000;

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "The Air Fryer Project is running" });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mount Authentication routes
app.use("/", authRoutes);

// Mount Recipe routes
app.use("/recipes", recipeRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
