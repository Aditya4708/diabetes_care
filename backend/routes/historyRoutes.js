const express = require("express");
const router = express.Router();
const { getHistory, getPrediction, deletePrediction } = require("../controllers/historyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getHistory);
router.get("/:id", protect, getPrediction);
router.delete("/:id", protect, deletePrediction);

module.exports = router;