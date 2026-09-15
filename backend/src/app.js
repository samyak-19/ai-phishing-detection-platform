const express = require("express");
const healthRoutes = require("./routes/health.routes");

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});