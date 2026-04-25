import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Activity, ArrowLeft, RotateCcw,
    AlertTriangle, CheckCircle, Brain
} from "lucide-react";
import { getRecommendations } from "@/api/predict";

export default function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const [advice, setAdvice] = useState("");
    const [aLoading, setALoading] = useState(false);

    const { result, inputs } = location.state || {};

    useEffect(() => {
        if (!result) {
            navigate("/predict");
            return;
        }
        fetchAdvice();
    }, []);

    const fetchAdvice = async () => {
        setALoading(true);
        try {
            const { data } = await getRecommendations({ inputs, result });
            setAdvice(data.advice);
        } catch {
            setAdvice("Unable to fetch AI recommendations. Please try again.");
        }
        setALoading(false);
    };

    if (!result) return null;

    const isHigh = result.prediction === 1;
    const probPct = (result.probability * 100).toFixed(1);

    const inputLabels = {
        Pregnancies: { label: "Pregnancies", unit: "count" },
        Glucose: { label: "Glucose", unit: "mg/dL" },
        BloodPressure: { label: "Blood Pressure", unit: "mm Hg" },
        SkinThickness: { label: "Skin Thickness", unit: "mm" },
        Insulin: { label: "Insulin", unit: "μU/ml" },
        BMI: { label: "BMI", unit: "kg/m²" },
        DiabetesPedigreeFunction: { label: "Diabetes Pedigree", unit: "score" },
        Age: { label: "Age", unit: "years" },
    };

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 flex items-center justify-between flex-wrap gap-4"
                >
                    <div>
                        <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium mb-3">
                            <Activity className="w-4 h-4" />
                            PREDICTION RESULTS
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Your Risk Assessment
                        </h1>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/predict")}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        New Prediction
                    </Button>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">

                    {/* Risk Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`rounded-2xl p-8 border text-center ${isHigh
                                ? "bg-red-500/10 border-red-500/30"
                                : "bg-emerald-500/10 border-emerald-500/30"
                            }`}
                    >
                        <div className="flex justify-center mb-4">
                            {isHigh
                                ? <AlertTriangle className="w-16 h-16 text-red-400" />
                                : <CheckCircle className="w-16 h-16 text-emerald-400" />
                            }
                        </div>
                        <h2 className={`text-2xl font-bold mb-2 ${isHigh ? "text-red-400" : "text-emerald-400"
                            }`}>
                            {result.risk_level} Risk
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">{result.confidence}</p>

                        {/* Probability */}
                        <div className={`text-6xl font-bold mb-2 ${isHigh ? "text-red-400" : "text-emerald-400"
                            }`}>
                            {probPct}%
                        </div>
                        <p className="text-slate-400 text-sm mb-6">Prediction Probability</p>

                        {/* Progress bar */}
                        <div className="bg-slate-700 rounded-full h-3 overflow-hidden mb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${probPct}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full rounded-full ${isHigh
                                        ? "bg-gradient-to-r from-red-500 to-red-400"
                                        : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                    }`}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                            <span>0% — No Risk</span>
                            <span>50% threshold</span>
                            <span>100% — High Risk</span>
                        </div>
                    </motion.div>

                    {/* Feature Importance */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                    >
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-emerald-500" />
                            Feature Importance
                        </h3>
                        <div className="space-y-4">
                            {result.feature_importance
                                ?.sort((a, b) => b.importance - a.importance)
                                .map((f, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-slate-400 text-xs">{f.feature}</span>
                                            <span className="text-emerald-400 text-xs font-mono">
                                                {(f.importance * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${f.importance * 100 / 0.45}%` }}
                                                transition={{ duration: 0.8, delay: 0.3 + i * 0.05 }}
                                                className={`h-full rounded-full ${i === 0 ? "bg-emerald-500" : "bg-emerald-500/50"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                </div>

                {/* Input Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6"
                >
                    <h3 className="text-white font-semibold mb-6">Your Input Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {inputs && Object.entries(inputs).map(([key, val]) => (
                            <div key={key} className="bg-slate-900/50 rounded-xl p-4 text-center">
                                <div className="text-emerald-400 font-bold text-xl font-mono">
                                    {key === "BMI"
                                        ? Number(val).toFixed(1)
                                        : key === "DiabetesPedigreeFunction"
                                            ? Number(val).toFixed(2)
                                            : Math.round(val)}
                                </div>
                                <div className="text-slate-400 text-xs mt-1">
                                    {inputLabels[key]?.label}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {inputLabels[key]?.unit}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* AI Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6"
                >
                    <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-emerald-500" />
                        AI Health Recommendations
                    </h3>
                    <p className="text-slate-500 text-xs mb-6">
                        Personalized health guidance based on your specific metrics
                    </p>

                    {aLoading ? (
                        <div className="flex items-center gap-3 text-slate-400 py-4">
                            <div className="w-5 h-5 border-2 border-slate-600 border-t-emerald-500 rounded-full animate-spin flex-shrink-0" />
                            <span className="text-sm">Generating personalized recommendations...</span>
                        </div>
                    ) : (
                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                            {advice}
                        </div>
                    )}

                    <div className="mt-6 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                        <p className="text-amber-400 text-xs">
                            ⚠ For educational purposes only. Always consult a qualified healthcare professional for medical advice.
                        </p>
                    </div>
                </motion.div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => navigate("/predict")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-base rounded-xl flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        New Prediction
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => navigate("/history")}
                        className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-base rounded-xl"
                    >
                        View History
                    </Button>
                </div>

            </div>
        </div>
    );
}