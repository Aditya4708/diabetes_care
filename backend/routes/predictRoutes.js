const express = require("express");
const router = express.Router();
const { predict } = require("../controllers/predictController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, predict);

module.exports = router;