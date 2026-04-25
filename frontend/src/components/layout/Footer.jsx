import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const footerLinks = [
    {
        label: "Product",
        links: [
            { title: "Home", href: "/" },
            { title: "Predict", href: "/predict" },
            { title: "History", href: "/history" },
            { title: "About", href: "/about" },
        ],
    },
    {
        label: "Resources",
        links: [
            { title: "PIMA Dataset", href: "#" },
            { title: "Scikit-learn", href: "https://scikit-learn.org" },
            { title: "How It Works", href: "/about" },
            { title: "API Docs", href: "#" },
        ],
    },
    {
        label: "Social",
        links: [
            { title: "GitHub", href: "#" },
            { title: "LinkedIn", href: "#" },
            { title: "Instagram", href: "#" },
            { title: "Twitter", href: "#" },
        ],
    },
];

function AnimatedContainer({ className, delay = 0.1, children }) {
    const shouldReduceMotion = useReducedMotion();
    if (shouldReduceMotion) return children;
    return (
        <motion.div
            initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
            whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Footer() {
    return (
        <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-slate-800 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(16,185,129,0.08),transparent)] px-6 py-12 lg:py-16">
            <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur bg-emerald-500/30" />

            <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
                {/* Brand */}
                <AnimatedContainer className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">
                            Diabetes<span className="text-emerald-500">Care</span>
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                        AI-powered diabetes risk assessment using machine learning and the PIMA Indian Diabetes Dataset.
                    </p>
                    <p className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} DiabetesCare. AI Lab Mini Project.
                    </p>
                </AnimatedContainer>

                {/* Links */}
                <div className="mt-10 grid grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
                                {section.label}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.title}>
                                        <Link
                                            to={link.href}
                                            className="text-slate-400 hover:text-emerald-500 text-sm inline-flex items-center gap-1 transition-colors duration-200"
                                        >
                                            {link.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedContainer>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-12 w-full border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 text-xs">
                    Built with React, Node.js, Python & scikit-learn
                </p>
                <p className="text-slate-500 text-xs">
                    Dataset: PIMA Indian Diabetes Dataset — NIDDK
                </p>
            </div>
        </footer>
    );
}