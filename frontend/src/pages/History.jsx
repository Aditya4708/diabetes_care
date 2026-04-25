import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getHistory, deletePrediction } from "@/api/history";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Activity, Trash2, AlertTriangle,
    CheckCircle, Clock, BarChart2
} from "lucide-react";

export default function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const { data } = await getHistory();
            setHistory(data);
        } catch {
            setError("Failed to load history. Please try again.");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setDeleting(id);
        try {
            await deletePrediction(id);
            setHistory(history.filter((h) => h._id !== id));
        } catch {
            setError("Failed to delete prediction.");
        }
        setDeleting(null);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
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
                        <Clock className="w-4 h-4" />
                        PREDICTION HISTORY
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Your History
                            </h1>
                            <p className="text-slate-400">
                                View and manage all your previous risk assessments.
                            </p>
                        </div>
                        <Button
                            onClick={() => navigate("/predict")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-5 rounded-xl flex items-center gap-2"
                        >
                            <Activity className="w-4 h-4" />
                            New Prediction
                        </Button>
                    </div>
                </motion.div>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
                        <p className="text-slate-400 text-sm">Loading your history...</p>
                    </div>
                ) : history.length === 0 ? (
                    /* Empty state */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BarChart2 className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-white font-semibold text-xl mb-2">
                            No predictions yet
                        </h3>
                        <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
                            Run your first diabetes risk assessment to see your history here.
                        </p>
                        <Button
                            onClick={() => navigate("/predict")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-5 rounded-xl"
                        >
                            Start First Prediction
                        </Button>
                    </motion.div>
                ) : (
                    /* History list */
                    <div className="space-y-4">
                        {/* Summary bar */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-bold text-white mb-1">
                                    {history.length}
                                </div>
                                <div className="text-slate-400 text-xs">Total Predictions</div>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-bold text-red-400 mb-1">
                                    {history.filter((h) => h.result.prediction === 1).length}
                                </div>
                                <div className="text-slate-400 text-xs">High Risk</div>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">
                                    {history.filter((h) => h.result.prediction === 0).length}
                                </div>
                                <div className="text-slate-400 text-xs">Low Risk</div>
                            </div>
                        </div>

                        {history.map((item, i) => {
                            const isHigh = item.result.prediction === 1;
                            return (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/20 transition-colors duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        {/* Left */}
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isHigh ? "bg-red-500/10" : "bg-emerald-500/10"
                                                }`}>
                                                {isHigh
                                                    ? <AlertTriangle className="w-6 h-6 text-red-400" />
                                                    : <CheckCircle className="w-6 h-6 text-emerald-400" />
                                                }
                                            </div>
                                            <div>
                                                <div className={`font-semibold text-lg ${isHigh ? "text-red-400" : "text-emerald-400"
                                                    }`}>
                                                    {item.result.risk_level} Risk
                                                </div>
                                                <div className="text-slate-400 text-sm">
                                                    {(item.result.probability * 100).toFixed(1)}% probability
                                                </div>
                                                <div className="text-slate-600 text-xs mt-1">
                                                    {formatDate(item.createdAt)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metrics preview */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { k: "Glucose", v: item.inputs.Glucose, u: "mg/dL" },
                                                { k: "BMI", v: item.inputs.BMI, u: "kg/m²" },
                                                { k: "Age", v: item.inputs.Age, u: "yrs" },
                                                { k: "Blood Pressure", v: item.inputs.BloodPressure, u: "mmHg" },
                                            ].map((m) => (
                                                <div
                                                    key={m.k}
                                                    className="bg-slate-900/50 rounded-lg px-3 py-2 text-center"
                                                >
                                                    <div className="text-white text-sm font-mono font-medium">
                                                        {typeof m.v === "number" && !Number.isInteger(m.v)
                                                            ? m.v.toFixed(1)
                                                            : m.v}
                                                    </div>
                                                    <div className="text-slate-500 text-xs">{m.k}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    navigate("/results", {
                                                        state: {
                                                            result: item.result,
                                                            inputs: item.inputs,
                                                        },
                                                    })
                                                }
                                                className="border-slate-700 text-slate-300 hover:bg-slate-700 text-xs"
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(item._id)}
                                                disabled={deleting === item._id}
                                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs"
                                            >
                                                {deleting === item._id ? (
                                                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-4 bg-slate-700 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isHigh
                                                    ? "bg-gradient-to-r from-red-500 to-red-400"
                                                    : "bg-gradient-to-r from-emerald-500 to-emerald-400"
                                                }`}
                                            style={{ width: `${(item.result.probability * 100).toFixed(1)}%` }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}