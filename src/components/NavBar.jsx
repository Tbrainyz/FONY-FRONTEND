import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/Logo.svg";
import darkmodelogo from "../assets/logodarkmode.svg";
import DefaultProfile from "../assets/FB_IMG_16265830618836469 1.png";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from "./ProfileDropDown";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ACTIVE INDICATOR (🔥 MAGIC)
  useEffect(() => {
    const activeBtn = navRef.current?.querySelector(".active-nav");
    if (activeBtn) {
      const { offsetLeft, offsetWidth } = activeBtn;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [location.pathname]);

  const handleLogoClick = () => navigate("/");

  const navBtn = (path, label) => (
    <button
      onClick={() => navigate(path)}
      className={`relative z-10 px-5 py-2 text-sm font-medium rounded-xl transition-all
      ${
        location.pathname === path
          ? "active-nav text-black dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={handleLogoClick}
        >
          <img src={logo} className="h-9 md:h-10 block dark:hidden" />
          <img src={darkmodelogo} className="h-9 md:h-10 hidden dark:block" />
        </div>

        {/* DESKTOP NAV */}
        <div
          ref={navRef}
          className="hidden md:flex relative items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl"
        >
          {/* 🔥 ACTIVE INDICATOR */}
          <span
            className="absolute top-1 bottom-1 bg-[#77C2FF] dark:bg-blue-500 rounded-xl transition-all duration-300 ease-in-out"
            style={indicatorStyle}
          />

          {navBtn("/dashboard", "Dashboard")}
          {navBtn("/completed", "Completed")}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/authdash")}
              className="relative z-10 px-5 py-2 text-sm font-medium rounded-xl 
              bg-gradient-to-r from-orange-400 to-orange-500 text-black 
              hover:scale-[1.03] transition-all shadow-sm"
            >
              Admin
            </button>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <ThemeToggle />

          {/* PROFILE */}
          <div ref={dropdownRef} className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-xl 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <img
                src={user?.profilePicture || DefaultProfile}
                className="w-9 h-9 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow"
                onError={(e) => (e.target.src = DefaultProfile)}
              />

              <IoIosArrowDown
                className={`transition-transform duration-200 text-gray-600 dark:text-gray-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* DROPDOWN */}
            {isOpen && (
              <div className="absolute right-0 mt-3 z-50 animate-[fadeIn_.2s_ease]">
                <div className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-2">
                  <ProfileDropDown setOpen={setIsOpen} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex gap-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur">

        <button
          onClick={() => navigate("/dashboard")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
            location.pathname === "/dashboard"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/completed")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition ${
            location.pathname === "/completed"
              ? "bg-[#77C2FF] text-black dark:bg-blue-500 dark:text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
        >
          Completed
        </button>

        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/authdash")}
            className="flex-1 py-2 rounded-xl text-sm font-medium
            bg-gradient-to-r from-orange-400 to-orange-500 text-black"
          >
            Admin
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
