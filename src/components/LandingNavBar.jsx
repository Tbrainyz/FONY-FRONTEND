import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import { AuthContext } from "../context/AuthContext";

const LandingNavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogoClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="w-full py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between border-b bg-white">
      {/* Logo */}
      <img 
        src={logo} 
        alt="Logo" 
        className="h-9 md:h-10 cursor-pointer" 
        onClick={handleLogoClick}
      />

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#how-it-works" className="hover:text-[#77C2FF] transition">How it Works</a>
        <a href="#testimonials" className="hover:text-[#77C2FF] transition">Testimonials</a>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user ? (
          // Logged In
          <button
            onClick={() => navigate("/dashboard")}
            className="px-7 py-2.5 bg-[#77C2FF] hover:bg-[#5eb8ff] rounded-[48px] border-2 border-b-4 border-black font-semibold text-sm transition-all active:translate-y-0.5"
          >
            Go to Dashboard
          </button>
        ) : (
          // Not Logged In
          <div className="hidden md:flex lg:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-2.5 border-2 border-b-4 border-black rounded-[48px] font-semibold hover:bg-gray-50 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-7 py-2.5 bg-[#77C2FF] rounded-[48px] border-2 border-b-4 border-black font-semibold shadow-2xl active:translate-y-0.5 transition-all"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default LandingNavBar;