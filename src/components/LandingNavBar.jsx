import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import darkmodelogo from "../assets/logodarkmode.svg";
import { AuthContext } from "../context/AuthContext";

const LandingNavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogoClick = () => {
    user ? navigate("/dashboard") : navigate("/");
  };

  return (
    <nav className="sticky top-4 z-50 px-4 md:px-10">
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 
        rounded-2xl backdrop-blur-xl bg-white/70 
        border border-white/30 
        shadow-lg"
      >
        {/* LOGO */}
      <div
                className="cursor-pointer hover:scale-105 transition-transform"
              
              >
                <img src={logo} className="h-9 md:h-10  " />
           
              </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a
            href="#how-it-works"
            className="relative group text-gray-700 "
          >
            How it Works
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#77C2FF] transition-all group-hover:w-full" />
          </a>

          <a
            href="#testimonials"
            className="relative group text-gray-700 "
          >
            Testimonials
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#77C2FF] transition-all group-hover:w-full" />
          </a>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2.5 rounded-full 
              bg-gradient-to-r from-[#77C2FF] to-blue-500 
              text-white font-semibold text-sm 
              shadow-lg hover:shadow-xl hover:scale-105 
              active:scale-95 transition-all"
            >
              Go to Dashboard →
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 rounded-full 
                border border-gray-300 
                text-gray-800 
                hover:bg-gray-100 
                transition-all"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-6 py-2.5 rounded-full 
                bg-gradient-to-r from-[#77C2FF] to-blue-500 
                text-white font-semibold 
                shadow-lg hover:shadow-xl hover:scale-105 
                active:scale-95 transition-all"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;
