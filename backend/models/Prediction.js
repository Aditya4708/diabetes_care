const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        inputs: {
            Pregnancies: { type: Number, required: true },
            Glucose: { type: Number, required: true },
            BloodPressure: { type: Number, required: true },
            SkinThickness: { type: Number, required: true },
            Insulin: { type: Number, required: true },
            BMI: { type: Number, required: true },
            DiabetesPedigreeFunction: { type: Number, required: true },
            Age: { type: Number, required: true },
        },
        result: {
            prediction: { type: Number, required: true },
            probability: { type: Number, required: true },
            risk_level: { type: String, required: true },
            confidence: { type: String, required: true },
            feature_importance: { type: Array, required: true },
        },
        aiRecommendations: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);