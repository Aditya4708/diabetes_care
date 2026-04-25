const axios = require("axios");

const getRecommendations = async (req, res) => {
    try {
        const { inputs, result } = req.body;

        if (!inputs || !result) {
            return res.status(400).json({ message: "Inputs and result are required" });
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "user",
                        content: `Patient health metrics:
- Pregnancies: ${inputs.Pregnancies}
- Glucose: ${inputs.Glucose} mg/dL
- Blood Pressure: ${inputs.BloodPressure} mm Hg
- Skin Thickness: ${inputs.SkinThickness} mm
- Insulin: ${inputs.Insulin} μU/ml
- BMI: ${inputs.BMI} kg/m²
- Diabetes Pedigree: ${inputs.DiabetesPedigreeFunction}
- Age: ${inputs.Age} years

ML prediction: ${result.risk_level} risk (${(result.probability * 100).toFixed(1)}% probability)

Give 4 specific, actionable health recommendations based on these exact values. Numbered list. Under 250 words. No disclaimer.`,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "DiabetesCare",
                },
            }
        );

        const advice = response.data.choices[0].message.content;
        res.json({ advice });
    } catch (error) {
        console.error("OpenRouter error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to get AI recommendations" });
    }
};

module.exports = { getRecommendations };