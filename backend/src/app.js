require("dotenv").config();

const express = require("express");
const healthRoutes = require("./routes/health.routes");
const pool = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", healthRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Phishing Detection API is running",
  });
});

app.get("/api/db-health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      success: true,
      message: "Database connection is healthy",
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});