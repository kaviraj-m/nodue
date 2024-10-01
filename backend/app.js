const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes"); // Import routes correctly

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Sync Sequelize models
sequelize
  .sync()
  .then(() => console.log("Sequelize models synced"))
  .catch((err) => console.error("Error syncing Sequelize models:", err));

// Use routes
app.use("/api/v1", userRoutes); // Ensure this is using the routes correctly

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).send("Route not found");
});

// General error handling
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

module.exports = app;
