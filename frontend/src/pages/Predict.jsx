import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predict as predictApi } from "@/api/predict";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Activity, RotateCcw, Zap } from "lucide-react";

const fields = [
    { key: "Pregnancies", label: "Pregnancies", unit: "count", min: 0, max: 17, step: 1, desc: "Number of times pregnant" },
    { key: "Glucose", label: "Glucose", unit: "mg/dL", min: 44, max: 199, step: 1, desc: "Plasma glucose (2hr OGTT)" },
    { key: "BloodPressure", label: "Blood Pressure", unit: "mm Hg", min: 24, max: 122, step: 1, desc: "Diastolic blood pressure" },
    { key: "SkinThickness", label: "Skin Thickness", unit: "mm", min: 7, max: 99, step: 1, desc: "Triceps skinfold thickness" },
    { key: "Insulin", label: "Insulin", unit: "μU/ml", min: 14, max: 846, step: 1, desc: "2-Hour serum insulin" },
    { key: "BMI", label: "BMI", unit: "kg/m²", min: 18, max: 67, step: 0.1, desc: "Body mass index" },
    { key: "DiabetesPedigreeFunction", label: "Diabetes Pedigree", unit: "score", min: 0.07, max: 2.42, step: 0.01, desc: "Family history score" },
    { key: "Age", label: "Age", unit: "years", min: 21, max: 81, step: 1, desc: "Patient age (21+)" },
];

const defaults = {
    Pregnancies: 2, Glucose: 120, BloodPressure: 70,
    SkinThickness: 25, Insulin: 85, BMI: 28.5,
    DiabetesPedigreeFunction: 0.45, Age: 35,
};

function fmt(key, val) {
    if (key === "BMI") return Number(val).toFixed(1);
    if (key === "DiabetesPedigreeFunction") return Number(val).toFixed(2);
    return Math.round(val);
}

export default function Predict() {
    const [values, setValues] = useState(defaults);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handle = async () => {
        setError("");
        setLoading(true);
        try {
            const { data } = await predictApi(values);
            navigate("/results", { state: { result: data, inputs: values } });
        } catch (err) {
            setError(err.response?.data?.message || "Prediction failed. Make sure all services are running.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium mb-3">
                        <Activity className="w-4 h-4" />
                        RISK ASSESSMENT ENGINE
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Diabetes Risk Predictor
                    </h1>
                    <p className="text-slate-400">
                        Adjust all 8 sliders to match your health metrics, then run the prediction.
                    </p>
                </motion.div>

                {/* Sliders Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {fields.map((f, i) => (
                        <motion.div
                            key={f.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors duration-300"
                        >
                            {/* Label + Value */}
                            <div className="flex justify-between items-baseline mb-4">
                                <div>
                                    <p className="text-white font-medium text-sm">{f.label}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{f.desc}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-emerald-400 font-bold text-xl font-mono">
                                        {fmt(f.key, values[f.key])}
                                    </span>
                                    <span className="text-slate-500 text-xs ml-1">{f.unit}</span>
                                </div>
                            </div>

                            {/* Slider */}
                            <input
                                type="range"
                                min={f.min}
                                max={f.max}
                                step={f.step}
                                value={values[f.key]}
                                onChange={(e) =>
                                    setValues({ ...values, [f.key]: Number(e.target.value) })
                                }
                                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-emerald-500
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-emerald-500/30
                  [&::-webkit-slider-thumb]:transition-transform
                  [&::-webkit-slider-thumb]:hover:scale-125"
                            />

                            {/* Min / Max */}
                            <div className="flex justify-between mt-2">
                                <span className="text-slate-600 text-xs">{f.min}</span>
                                <span className="text-slate-600 text-xs">{f.max}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={handle}
                        disabled={loading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Zap className="w-5 h-5" />
                                Run Prediction
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setValues(defaults)}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-base rounded-xl flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset Defaults
                    </Button>
                </div>

                {/* Info */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    Results are based on the PIMA Indian Diabetes Dataset model. For educational purposes only.
                </p>
            </div>
        </div>
    );
}