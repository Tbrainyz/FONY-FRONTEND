import React from "react";
import logo from "../assets/Logo.svg";

const LandingNavBar = () => {
  return (
    <nav className="w-full py-6 px-6 md:px-12 lg:px-24 flex items-center justify-between border-b">
      <img src={logo} alt="Logo" className="h-9 md:h-10" />

      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:text-[#77C2FF] transition">Home</a>
        <a href="#" className="hover:text-[#77C2FF] transition">How to Get Started</a>
        <a href="#" className="hover:text-[#77C2FF] transition">Testimonial</a>
      </div>

      <div className="md:hidden">
        {/* You can add a mobile menu button here if needed */}
      </div>
    </nav>
  );
};

export default LandingNavBar;