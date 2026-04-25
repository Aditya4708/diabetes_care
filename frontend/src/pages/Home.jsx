import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { SparklesCore } from "@/components/ui/sparkles";
import { motion } from "framer-motion";
import { Activity, Shield, Zap, Brain, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
    { value: "537M+", label: "People with diabetes globally" },
    { value: "76-80%", label: "Model accuracy" },
    { value: "768", label: "Training records" },
    { value: "8", label: "Health metrics analyzed" },
];

const features = [
    {
        icon: Zap,
        title: "Instant Prediction",
        desc: "Get your diabetes risk assessment in seconds using our trained Logistic Regression model.",
    },
    {
        icon: Brain,
        title: "AI Recommendations",
        desc: "Claude AI analyzes your results and provides personalized health recommendations.",
    },
    {
        icon: Shield,
        title: "Clinically Backed",
        desc: "Trained on the PIMA Indian Diabetes Dataset from the National Institute of Diabetes.",
    },
    {
        icon: Activity,
        title: "Track History",
        desc: "Save and monitor all your previous predictions over time in your personal dashboard.",
    },
];

const steps = [
    { n: "01", title: "Create Account", desc: "Sign up for free and access your personal health dashboard." },
    { n: "02", title: "Enter Metrics", desc: "Input your 8 health parameters using our simple slider form." },
    { n: "03", title: "Get Risk Score", desc: "Receive instant color-coded results with probability score." },
    { n: "04", title: "AI Advice", desc: "Get personalized recommendations powered by Claude AI." },
];

export default function Home() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-900">

            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
                {/* Sparkles background */}
                <div className="absolute inset-0 w-full h-full">
                    <SparklesCore
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.2}
                        particleDensity={60}
                        className="w-full h-full"
                        particleColor="#10b981"
                        speed={1.5}
                    />
                </div>

                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(16,185,129,0.06),transparent)]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-center max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-8">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-emerald-400 text-sm font-medium tracking-wide">
                            ML-POWERED HEALTH SCREENING
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                        Predict Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                            Diabetes Risk
                        </span>
                        <br />with AI Precision
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                        Enter 8 simple health metrics. Our machine learning model analyzes your risk instantly,
                        then Claude AI provides personalized health recommendations just for you.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate(user ? "/predict" : "/register")}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:scale-105"
                        >
                            Start Risk Assessment
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/about")}
                            className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-base rounded-xl"
                        >
                            How It Works
                        </Button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-6 mt-12">
                        {["Free to use", "No equipment needed", "Results in seconds", "AI-powered advice"].map((t) => (
                            <div key={t} className="flex items-center gap-2 text-slate-400 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                {t}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500/30 transition-colors duration-300"
                        >
                            <div className="text-3xl font-bold text-emerald-500 mb-2">{s.value}</div>
                            <div className="text-slate-400 text-sm">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Choose <span className="text-emerald-500">DiabetesCare?</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Built with modern AI and machine learning to give you accurate, actionable health insights.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                                <f.icon className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Four simple steps to get your personalized diabetes risk assessment.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 relative"
                        >
                            <div className="text-5xl font-bold text-slate-700 mb-4">{s.n}</div>
                            <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                            {i < steps.length - 1 && (
                                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500/40 z-10" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-3xl p-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Check Your Risk?
                    </h2>
                    <p className="text-slate-400 mb-8">
                        Takes less than 2 minutes. Completely free. No equipment needed.
                    </p>
                    <Button
                        onClick={() => navigate(user ? "/predict" : "/register")}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-6 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/25"
                    >
                        {user ? "Go to Predictor" : "Get Started Free"}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    {!user && (
                        <p className="text-slate-500 text-sm mt-4">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-emerald-500 cursor-pointer hover:underline"
                            >
                                Sign in
                            </span>
                        </p>
                    )}
                </motion.div>
            </section>
        </div>
    );
}