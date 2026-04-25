const Prediction = require("../models/Prediction");

// @route   GET /api/history
const getHistory = async (req, res) => {
    try {
        const predictions = await Prediction.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(20);
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/history/:id
const getPrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findById(req.params.id);
        if (!prediction)
            return res.status(404).json({ message: "Prediction not found" });
        if (prediction.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        res.json(prediction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/history/:id
const deletePrediction = async (req, res) => {
    try {
        const prediction = await Prediction.findById(req.params.id);
        if (!prediction)
            return res.status(404).json({ message: "Prediction not found" });
        if (prediction.user.toString() !== req.user._id.toString())
            return res.status(401).json({ message: "Not authorized" });
        await prediction.deleteOne();
        res.json({ message: "Prediction deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHistory, getPrediction, deletePrediction };