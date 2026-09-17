const express = require("express");
const { scanUrl } = require("../controllers/scanner/urlScanner.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/url", authMiddleware, scanUrl);

module.exports = router;