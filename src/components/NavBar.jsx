import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/Logo.svg"; // Light mode logo (should have dark text)
import darkmodelogo from "../assets/logodarkmode.svg"; // Dark mode logo (should have white/light text)
import DefaultProfile from "../assets/FB_IMG_16265830618836469 1.png";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo Switching */}
        <div className="cursor-pointer" onClick={handleLogoClick}>
          {/* Light Mode Logo - Visible only in Light Mode */}
          <img
            src={logo}
            alt="Fony Logo"
            className="h-9 md:h-10 block dark:hidden"
          />

          {/* Dark Mode Logo - Visible only in Dark Mode */}
          <img
            src={darkmodelogo}
            alt="Fony Logo"
            className="h-9 md:h-10 hidden dark:block"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-2 rounded-2xl font-medium transition ${
              location.pathname === "/dashboard"
                ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/completed")}
            className={`px-6 py-2 rounded-2xl font-medium transition ${
              location.pathname === "/completed"
                ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
                : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src={user?.profilePicture || DefaultProfile}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-gray-300 dark:border-gray-600"
                onError={(e) => (e.target.src = DefaultProfile)}
              />
              <IoIosArrowDown
                className={`transition text-gray-600 dark:text-gray-400 ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-3 z-50">
                <ProfileDropDown setOpen={setIsOpen} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t px-4 py-3 flex gap-2 bg-white dark:bg-gray-900">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium transition ${
            location.pathname === "/dashboard"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => navigate("/completed")}
          className={`flex-1 py-2 rounded-2xl text-sm font-medium transition ${
            location.pathname === "/completed"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          }`}
        >
          Completed
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
