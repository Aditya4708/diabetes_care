import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Activity, Brain, Database,
    Server, Code, ArrowRight, Users
} from "lucide-react";

const techStack = [
    {
        icon: Code,
        layer: "Frontend",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        items: ["React 19 + Vite", "Tailwind CSS", "Framer Motion", "React Router v7", "shadcn/ui"],
    },
    {
        icon: Server,
        layer: "Backend",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        items: ["Node.js + Express 5", "MongoDB + Mongoose", "JWT Authentication", "bcryptjs", "Axios"],
    },
    {
        icon: Brain,
        layer: "ML Service",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        items: ["Python 3.13 + FastAPI", "scikit-learn 1.3", "Logistic Regression", "Pandas + NumPy", "Joblib"],
    },
    {
        icon: Database,
        layer: "Data & AI",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        items: ["PIMA Indian Dataset", "768 Patient Records", "Claude AI API", "MongoDB Atlas", "NIDDK Source"],
    },
];

const metrics = [
    { label: "Accuracy", value: "70.78%", target: ">70%" },
    { label: "Precision", value: "60%", target: ">60%" },
    { label: "Recall", value: "50%", target: ">50%" },
    { label: "F1 Score", value: "54.5%", target: ">50%" },
    { label: "ROC-AUC", value: "0.813", target: ">0.80" },
];

const dataset = [
    { label: "Source", value: "NIDDK" },
    { label: "Total Records", value: "768" },
    { label: "Positive", value: "268 (34.9%)" },
    { label: "Negative", value: "500 (65.1%)" },
    { label: "Demographics", value: "Female, 21+" },
    { label: "Features", value: "8 Health Metrics" },
];

const team = [
    { name: "Aditya Nambiar", role: "ML Engineer & Full Stack Developer" },
    { name: "Risa Rebello", role: "Frontend Developer & UI Designer" },
    { name: "Amrita Pati", role: "Data Analyst & Backend Developer" },
];

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-6">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-400 text-sm font-medium">PROJECT DOCUMENTATION</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        How DiabetesCare Works
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A full-stack AI application using Logistic Regression trained on the PIMA Indian
                        Diabetes Dataset, combined with Claude AI for personalized health recommendations.
                    </p>
                </motion.div>

                {/* Dataset */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Database className="w-5 h-5 text-emerald-500" />
                        Dataset Information
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {dataset.map((d, i) => (
                            <div key={i} className="bg-slate-900/50 rounded-xl p-4">
                                <div className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                                    {d.label}
                                </div>
                                <div className="text-white font-semibold">{d.value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Model Performance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Model Performance
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-slate-900/50 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-400 mb-1">
                                    {m.value}
                                </div>
                                <div className="text-slate-400 text-sm mb-1">{m.label}</div>
                                <div className="text-xs text-slate-600">Target: {m.target}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6"
                >
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Code className="w-5 h-5 text-emerald-500" />
                        Technology Stack
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {techStack.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-slate-800/50 border ${t.border} rounded-2xl p-5`}
                            >
                                <div className={`w-10 h-10 ${t.bg} rounded-xl flex items-center justify-center mb-4`}>
                                    <t.icon className={`w-5 h-5 ${t.color}`} />
                                </div>
                                <h3 className={`font-semibold mb-3 ${t.color}`}>{t.layer}</h3>
                                <ul className="space-y-2">
                                    {t.items.map((item, j) => (
                                        <li key={j} className="text-slate-400 text-sm flex items-center gap-2">
                                            <span className="w-1 h-1 bg-slate-600 rounded-full flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* How prediction works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6"
                >
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-emerald-500" />
                        How Prediction Works
                    </h2>
                    <div className="grid md:grid-cols-5 gap-4 items-start">
                        {[
                            { step: "1", title: "User Input", desc: "8 health metrics entered via sliders" },
                            { step: "2", title: "Node Backend", desc: "Validates & forwards to Python ML service" },
                            { step: "3", title: "ML Prediction", desc: "Logistic Regression returns risk + probability" },
                            { step: "4", title: "Saved to DB", desc: "Result stored in MongoDB Atlas" },
                            { step: "5", title: "AI Advice", desc: "Claude AI generates recommendations" },
                        ].map((s, i) => (
                            <div key={i} className="flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-emerald-400 font-bold text-sm">{s.step}</span>
                                </div>
                                <div className="text-white font-medium text-sm">{s.title}</div>
                                <div className="text-slate-500 text-xs">{s.desc}</div>
                                {i < 4 && (
                                    <ArrowRight className="hidden md:block w-4 h-4 text-slate-700 rotate-90 md:rotate-0" />
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Team */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-10"
                >
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-500" />
                        Project Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {team.map((m, i) => (
                            <div
                                key={i}
                                className="bg-slate-900/50 rounded-xl p-4 flex items-center gap-3"
                            >
                                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-lg">
                                    {m.name[0]}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-medium">{m.name}</div>
                                    <div className="text-slate-500 text-xs mt-1">{m.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row justify-between text-xs text-slate-500 pt-4 border-t border-slate-700 gap-2">
                        <span>Course: Artificial Intelligence Laboratory</span>
                        <span>Institution: [Your Institution]</span>
                        <span>Date: March 2026</span>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        onClick={() => navigate("/predict")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
                    >
                        Try the Predictor
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>

            </div>
        </div>
    );
}