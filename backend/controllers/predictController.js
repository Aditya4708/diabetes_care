const axios = require("axios");
const Prediction = require("../models/Prediction");

// @route   POST /api/predict
const predict = async (req, res) => {
    try {
        const {
            Pregnancies, Glucose, BloodPressure,
            SkinThickness, Insulin, BMI,
            DiabetesPedigreeFunction, Age,
        } = req.body;

        // Validate all fields present
        if (
            Pregnancies === undefined || Glucose === undefined ||
            BloodPressure === undefined || SkinThickness === undefined ||
            Insulin === undefined || BMI === undefined ||
            DiabetesPedigreeFunction === undefined || Age === undefined
        ) {
            return res.status(400).json({ message: "All 8 health metrics are required" });
        }

        // Call Python ML service
        const mlResponse = await axios.post(
            `${process.env.ML_SERVICE_URL}/predict`,
            { Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age }
        );

        const mlResult = mlResponse.data;

        // Save prediction to MongoDB
        const prediction = await Prediction.create({
            user: req.user._id,
            inputs: { Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin, BMI, DiabetesPedigreeFunction, Age },
            result: mlResult,
        });

        res.status(201).json({
            _id: prediction._id,
            inputs: prediction.inputs,
            result: mlResult,
            createdAt: prediction.createdAt,
        });
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            return res.status(503).json({ message: "ML service is not running. Start it with: uvicorn app:app --reload --port 8000" });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = { predict };