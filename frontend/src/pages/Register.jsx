import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { register as registerApi } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Activity, Eye, EyeOff, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function Register() {
    const [form, setForm] = useState({
        name: "", email: "", password: "", confirm: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name || !form.email || !form.password || !form.confirm) {
            setError("All fields are required.");
            return;
        }
        if (form.password !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (form.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        try {
            const { data } = await registerApi({
                name: form.name,
                email: form.email,
                password: form.password,
            });
            login(data);
            navigate("/predict");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-20">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-white text-xl">
                            Diabetes<span className="text-emerald-500">Care</span>
                        </span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Create your account</h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Join DiabetesCare and start monitoring your health
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                    <form onSubmit={handle} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-slate-300 text-sm font-medium block mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={form.confirm}
                                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                className="w-full bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4" />
                                    Create Account
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-emerald-500 hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
                <p className="text-center text-slate-600 text-xs mt-4">
                    Demo only — no real medical data is stored
                </p>
            </motion.div>
        </div>
    );
}