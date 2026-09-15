const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "AI Phishing Detection API is healthy",
  });
});

module.exports = router;