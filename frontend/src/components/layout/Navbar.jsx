import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useScroll } from "@/components/ui/use-scroll";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { Activity } from "lucide-react";

const links = [
    { label: "Home", href: "/" },
    { label: "Predict", href: "/predict" },
    { label: "History", href: "/history" },
    { label: "About", href: "/about" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const scrolled = useScroll(10);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
        setOpen(false);
    };

    return (
        <header className={cn(
            "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
            scrolled && "bg-slate-900/95 backdrop-blur-lg border-slate-800"
        )}>
            <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white text-lg">
                        Diabetes<span className="text-emerald-500">Care</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                location.pathname === link.href
                                    ? "text-emerald-500 bg-emerald-500/10"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop auth */}
                <div className="hidden md:flex items-center gap-2">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-400">
                                Hi, <span className="text-emerald-500 font-medium">{user.name}</span>
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate("/login")}
                                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Sign In
                            </Button>
                            <Button
                                size="sm"
                                onClick={() => navigate("/register")}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden border-slate-700"
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>

            {/* Mobile menu */}
            {open && typeof window !== "undefined" && createPortal(
                <div className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-slate-900/98 backdrop-blur-lg border-t border-slate-800 md:hidden flex flex-col p-4 gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.label}
                            to={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                                location.pathname === link.href
                                    ? "text-emerald-500 bg-emerald-500/10"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="mt-auto flex flex-col gap-2">
                        {user ? (
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full border-slate-700 text-slate-300"
                            >
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={() => { navigate("/login"); setOpen(false); }}
                                    className="w-full border-slate-700 text-slate-300"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => { navigate("/register"); setOpen(false); }}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                                >
                                    Get Started
                                </Button>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </header>
    );
}