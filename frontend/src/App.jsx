import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PrivateRoute from "@/components/ui/PrivateRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Predict from "@/pages/Predict";
import Results from "@/pages/Results";
import History from "@/pages/History";
import About from "@/pages/About";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-900 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/predict" element={
                <PrivateRoute><Predict /></PrivateRoute>
              } />
              <Route path="/results" element={
                <PrivateRoute><Results /></PrivateRoute>
              } />
              <Route path="/history" element={
                <PrivateRoute><History /></PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}